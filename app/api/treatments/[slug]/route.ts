import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const treatment = await prisma.treatment.findUnique({
      where: { slug },
    });

    if (!treatment) {
      return NextResponse.json({ error: 'Treatment not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, treatment });
  } catch (error) {
    console.error('Error fetching treatment:', error);
    return NextResponse.json({ error: 'Failed to fetch treatment' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = params;
    const body = await request.json();

    const existing = await prisma.treatment.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: 'Treatment not found' }, { status: 404 });
    }

    const updated = await prisma.treatment.update({
      where: { slug },
      data: {
        name: body.name ?? existing.name,
        category: body.category ?? existing.category,
        summary: body.summary ?? existing.summary,
        description: body.description ?? existing.description,
        indications: body.indications ? (typeof body.indications === 'string' ? body.indications : JSON.stringify(body.indications)) : existing.indications,
        procedureSteps: body.procedureSteps ? (typeof body.procedureSteps === 'string' ? body.procedureSteps : JSON.stringify(body.procedureSteps)) : existing.procedureSteps,
        benefits: body.benefits ? (typeof body.benefits === 'string' ? body.benefits : JSON.stringify(body.benefits)) : existing.benefits,
        recoveryInfo: body.recoveryInfo ?? existing.recoveryInfo,
        faqs: body.faqs ? (typeof body.faqs === 'string' ? body.faqs : JSON.stringify(body.faqs)) : existing.faqs,
        iconName: body.iconName ?? existing.iconName,
        imageUrl: body.imageUrl ?? existing.imageUrl,
        featured: body.featured !== undefined ? Boolean(body.featured) : existing.featured,
        active: body.active !== undefined ? Boolean(body.active) : existing.active,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'TREATMENT_UPDATE',
        entity: 'Treatment',
        entityId: updated.id,
        adminEmail: session.email,
        details: `Updated treatment: ${updated.name}`,
      },
    });

    return NextResponse.json({ success: true, treatment: updated });
  } catch (error) {
    console.error('Error updating treatment:', error);
    return NextResponse.json({ error: 'Failed to update treatment' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = params;
    const deleted = await prisma.treatment.delete({
      where: { slug },
    });

    return NextResponse.json({ success: true, message: 'Treatment deleted' });
  } catch (error) {
    console.error('Error deleting treatment:', error);
    return NextResponse.json({ error: 'Failed to delete treatment' }, { status: 500 });
  }
}
