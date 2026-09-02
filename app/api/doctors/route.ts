import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json({ success: true, doctors });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, qualifications, specialization, experience, bio, imageUrl, availableDays } = body;

    const doctor = await prisma.doctor.create({
      data: {
        name,
        qualifications,
        specialization,
        experience,
        bio,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
        availableDays: availableDays || 'Mon,Tue,Wed,Thu,Fri,Sat',
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'DOCTOR_CREATE',
        entity: 'Doctor',
        entityId: doctor.id,
        adminEmail: session.email,
        details: `Added doctor: ${doctor.name}`,
      },
    });

    return NextResponse.json({ success: true, doctor });
  } catch (error) {
    console.error('Error creating doctor:', error);
    return NextResponse.json({ error: 'Failed to create doctor' }, { status: 500 });
  }
}
