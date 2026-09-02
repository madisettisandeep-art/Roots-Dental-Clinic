import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const items = await prisma.galleryItem.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    const beforeAfter = await prisma.beforeAfter.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, items, beforeAfter });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, category, imageUrl, caption } = body;

    const item = await prisma.galleryItem.create({
      data: {
        title,
        category: category || 'CLINIC',
        imageUrl,
        caption,
      },
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
  }
}
