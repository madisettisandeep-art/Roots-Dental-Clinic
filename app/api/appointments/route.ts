import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { sendAppointmentNotifications } from '@/lib/notification';

export const dynamic = 'force-dynamic';

function generateAppointmentId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let randomStr = '';
  for (let i = 0; i < 4; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const year = new Date().getFullYear();
  return `ROOTS-${year}-${randomStr}`;
}

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized access.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const date = searchParams.get('date');
    const search = searchParams.get('search');

    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }
    if (date) {
      where.appointmentDate = date;
    }
    if (search) {
      where.OR = [
        { patientName: { contains: search } },
        { phone: { contains: search } },
        { appointmentId: { contains: search } },
      ];
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: {
        treatment: true,
        doctor: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve appointments.' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      patientName,
      phone,
      email,
      preferredContact,
      treatmentId,
      doctorId,
      appointmentDate,
      timeSlot,
      message,
      source,
    } = body;

    // Validation
    if (!patientName || !phone || !treatmentId || !appointmentDate || !timeSlot) {
      return NextResponse.json(
        { error: 'Please provide all required booking details (Name, Phone, Treatment, Date, and Time).' },
        { status: 400 }
      );
    }

    // Clean phone
    const cleanedPhone = phone.replace(/[^\d+]/g, '');
    if (cleanedPhone.length < 10) {
      return NextResponse.json(
        { error: 'Please provide a valid 10-digit mobile phone number.' },
        { status: 400 }
      );
    }

    // Check treatment exists
    const treatment = await prisma.treatment.findUnique({
      where: { id: treatmentId },
    });
    if (!treatment) {
      return NextResponse.json(
        { error: 'Selected treatment is invalid or no longer available.' },
        { status: 400 }
      );
    }

    // Check double booking for same doctor / slot
    const existingBooking = await prisma.appointment.findFirst({
      where: {
        appointmentDate,
        timeSlot,
        ...(doctorId ? { doctorId } : {}),
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        {
          error:
            'The selected time slot is already reserved. Please choose another time slot or contact us directly on WhatsApp.',
        },
        { status: 409 }
      );
    }

    // Generate unique appointment ID
    let appointmentId = generateAppointmentId();
    let collision = await prisma.appointment.findUnique({
      where: { appointmentId },
    });
    while (collision) {
      appointmentId = generateAppointmentId();
      collision = await prisma.appointment.findUnique({
        where: { appointmentId },
      });
    }

    // Create appointment
    const newAppointment = await prisma.appointment.create({
      data: {
        appointmentId,
        patientName: patientName.trim(),
        phone: cleanedPhone,
        email: email ? email.trim() : null,
        preferredContact: preferredContact || 'WHATSAPP',
        treatmentId,
        doctorId: doctorId || null,
        appointmentDate,
        timeSlot,
        message: message ? message.trim() : null,
        source: source || 'WEBSITE',
        status: 'PENDING',
      },
      include: {
        treatment: true,
        doctor: true,
      },
    });

    // Dispatch background notifications
    await sendAppointmentNotifications({
      appointmentId: newAppointment.appointmentId,
      patientName: newAppointment.patientName,
      recipientPhone: newAppointment.phone,
      recipientEmail: newAppointment.email || undefined,
      treatmentName: newAppointment.treatment.name,
      doctorName: newAppointment.doctor?.name,
      date: newAppointment.appointmentDate,
      timeSlot: newAppointment.timeSlot,
    });

    return NextResponse.json({
      success: true,
      appointment: newAppointment,
      message: 'Your appointment request has been received successfully!',
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while booking your appointment. Please try again or call us.' },
      { status: 500 }
    );
  }
}
