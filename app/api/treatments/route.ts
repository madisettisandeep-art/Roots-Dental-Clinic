import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const treatments = await prisma.treatment.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json({ success: true, treatments });
  } catch (error) {
    console.error('Error fetching treatments:', error);
    return NextResponse.json({ error: 'Failed to fetch treatments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      slug,
      name,
      category,
      summary,
      description,
      indications,
      procedureSteps,
      benefits,
      recoveryInfo,
      faqs,
      iconName,
      imageUrl,
      featured,
    } = body;

    const treatment = await prisma.treatment.create({
      data: {
        slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
        name,
        category,
        summary,
        description,
        indications: typeof indications === 'string' ? indications : JSON.stringify(indications || []),
        procedureSteps: typeof procedureSteps === 'string' ? procedureSteps : JSON.stringify(procedureSteps || []),
        benefits: typeof benefits === 'string' ? benefits : JSON.stringify(benefits || []),
        recoveryInfo,
        faqs: typeof faqs === 'string' ? faqs : JSON.stringify(faqs || []),
        iconName: iconName || 'Sparkles',
        imageUrl,
        featured: Boolean(featured),
      },
    });

    await prisma.auditLog.create({
      data: {
        action: 'TREATMENT_CREATE',
        entity: 'Treatment',
        entityId: treatment.id,
        adminEmail: session.email,
        details: `Created treatment: ${treatment.name}`,
      },
    });

    return NextResponse.json({ success: true, treatment });
  } catch (error) {
    console.error('Error creating treatment:', error);
    return NextResponse.json({ error: 'Failed to create treatment' }, { status: 500 });
  }
}
