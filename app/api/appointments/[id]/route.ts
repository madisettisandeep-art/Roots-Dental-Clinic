import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { status, notes, doctorId, appointmentDate, timeSlot } = body;

    const appointment = await prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      return NextResponse.json(
        { error: 'Appointment not found.' },
        { status: 404 }
      );
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (doctorId !== undefined) updateData.doctorId = doctorId;
    if (appointmentDate) updateData.appointmentDate = appointmentDate;
    if (timeSlot) updateData.timeSlot = timeSlot;

    const updated = await prisma.appointment.update({
      where: { id },
      data: updateData,
      include: {
        treatment: true,
        doctor: true,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        action: `APPOINTMENT_${status || 'UPDATE'}`,
        entity: 'Appointment',
        entityId: id,
        adminEmail: session.email,
        details: `Updated appointment ${appointment.appointmentId} to status: ${status || appointment.status}`,
      },
    });

    return NextResponse.json({ success: true, appointment: updated });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to update appointment.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = params;
    const appointment = await prisma.appointment.delete({
      where: { id },
    });

    await prisma.auditLog.create({
      data: {
        action: 'APPOINTMENT_DELETE',
        entity: 'Appointment',
        entityId: id,
        adminEmail: session.email,
        details: `Deleted appointment ${appointment.appointmentId}`,
      },
    });

    return NextResponse.json({ success: true, message: 'Appointment deleted' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json(
      { error: 'Failed to delete appointment.' },
      { status: 500 }
    );
  }
}
