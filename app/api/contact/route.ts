import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, subject, message } = body;

    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Please provide your name, phone number, and message.' },
        { status: 400 }
      );
    }

    const enquiry = await prisma.contactEnquiry.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : null,
        subject: subject ? subject.trim() : 'General Enquiry',
        message: message.trim(),
        status: 'NEW',
      },
    });

    return NextResponse.json({
      success: true,
      enquiry,
      message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit enquiry. Please call or WhatsApp us directly.' },
      { status: 500 }
    );
  }
}
