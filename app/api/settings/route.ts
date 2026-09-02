import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    let settings = await prisma.clinicSetting.findUnique({
      where: { id: 'default' },
    });

    if (!settings) {
      settings = await prisma.clinicSetting.create({
        data: { id: 'default' },
      });
    }

    const openingHours = await prisma.openingHour.findMany({
      orderBy: { sortOrder: 'asc' },
    });

    const holidays = await prisma.holiday.findMany({
      orderBy: { date: 'asc' },
    });

    // Calculate live Open/Closed status based on Asia/Kolkata timezone
    const now = new Date();
    // Convert to IST
    const istTimeStr = now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const istDate = new Date(istTimeStr);
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayName = dayNames[istDate.getDay()];
    const todayHours = openingHours.find((h) => h.dayOfWeek === currentDayName);

    let isOpenNow = false;
    let statusText = 'Closed Now';

    if (settings.isOpenOverride === 'OPEN') {
      isOpenNow = true;
      statusText = 'Open Now (Special Hours)';
    } else if (settings.isOpenOverride === 'CLOSED') {
      isOpenNow = false;
      statusText = 'Closed (Special Notice)';
    } else if (todayHours && !todayHours.isClosed) {
      // Parse open and close times
      const parseTimeToMinutes = (timeStr: string) => {
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };

      const currentMinutes = istDate.getHours() * 60 + istDate.getMinutes();
      const openMinutes = parseTimeToMinutes(todayHours.openTime);
      const closeMinutes = parseTimeToMinutes(todayHours.closeTime);

      if (currentMinutes >= openMinutes && currentMinutes <= closeMinutes) {
        isOpenNow = true;
        statusText = `Open Now • Closes at ${todayHours.closeTime}`;
      } else {
        isOpenNow = false;
        statusText = `Closed Now • Opens at ${todayHours.openTime}`;
      }
    }

    return NextResponse.json({
      success: true,
      settings,
      openingHours,
      holidays,
      isOpenNow,
      statusText,
    });
  } catch (error) {
    console.error('Error fetching clinic settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { settings, openingHours } = body;

    if (settings) {
      await prisma.clinicSetting.upsert({
        where: { id: 'default' },
        update: {
          clinicName: settings.clinicName,
          tagline: settings.tagline,
          phone: settings.phone,
          whatsAppNumber: settings.whatsAppNumber,
          email: settings.email,
          emergencyPhone: settings.emergencyPhone,
          address: settings.address,
          googleMapsUrl: settings.googleMapsUrl,
          embedMapUrl: settings.embedMapUrl,
          noticeBanner: settings.noticeBanner,
          isOpenOverride: settings.isOpenOverride,
        },
        create: {
          id: 'default',
          ...settings,
        },
      });
    }

    if (openingHours && Array.isArray(openingHours)) {
      for (const h of openingHours) {
        if (h.id) {
          await prisma.openingHour.update({
            where: { id: h.id },
            data: {
              openTime: h.openTime,
              closeTime: h.closeTime,
              isClosed: Boolean(h.isClosed),
            },
          });
        }
      }
    }

    await prisma.auditLog.create({
      data: {
        action: 'SETTINGS_UPDATE',
        entity: 'ClinicSetting',
        entityId: 'default',
        adminEmail: session.email,
        details: 'Updated clinic configuration and operating hours',
      },
    });

    return NextResponse.json({ success: true, message: 'Settings saved successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
