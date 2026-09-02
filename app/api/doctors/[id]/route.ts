import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    const updated = await prisma.doctor.update({
      where: { id },
      data: {
        name: body.name,
        qualifications: body.qualifications,
        specialization: body.specialization,
        experience: body.experience,
        bio: body.bio,
        imageUrl: body.imageUrl,
        availableDays: body.availableDays,
        active: body.active !== undefined ? Boolean(body.active) : undefined,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'DOCTOR_UPDATE',
        entity: 'Doctor',
        entityId: id,
        adminEmail: session.email,
        details: `Updated doctor profile: ${updated.name}`,
      },
    });

    return NextResponse.json({ success: true, doctor: updated });
  } catch (error) {
    console.error('Error updating doctor:', error);
    return NextResponse.json({ error: 'Failed to update doctor' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    await prisma.doctor.delete({ where: { id } });

    return NextResponse.json({ success: true, message: 'Doctor deleted' });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    return NextResponse.json({ error: 'Failed to delete doctor' }, { status: 500 });
  }
}
