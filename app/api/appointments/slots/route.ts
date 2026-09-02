import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const ALL_SLOTS_WEEKDAY = [
  '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM',
  '12:30 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM'
];

const ALL_SLOTS_SUNDAY = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM'
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date'); // YYYY-MM-DD
    const doctorId = searchParams.get('doctorId');

    if (!date) {
      return NextResponse.json({ error: 'Date is required' }, { status: 400 });
    }

    // Timezone-safe day of week calculation (invariant to server UTC timezone)
    const [year, month, day] = date.split('-').map(Number);
    const dateUtc = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = dayNames[dateUtc.getUTCDay()];

    // Check holiday
    let holiday = null;
    try {
      holiday = await prisma.holiday.findFirst({
        where: { date },
      });
    } catch {}

    if (holiday) {
      return NextResponse.json({
        available: false,
        reason: `Clinic closed for holiday: ${holiday.reason}`,
        slots: [],
      });
    }

    // Check opening hour record
    let hourRecord = null;
    try {
      hourRecord = await prisma.openingHour.findFirst({
        where: { dayOfWeek },
      });
    } catch {}

    if (hourRecord?.isClosed) {
      return NextResponse.json({
        available: false,
        reason: `Clinic is closed on ${dayOfWeek}s.`,
        slots: [],
      });
    }

    // Base slot pool
    const baseSlots = dayOfWeek === 'Sunday' ? ALL_SLOTS_SUNDAY : ALL_SLOTS_WEEKDAY;

    // Check existing bookings for that date
    let bookings: Array<{ timeSlot: string }> = [];
    try {
      bookings = await prisma.appointment.findMany({
        where: {
          appointmentDate: date,
          ...(doctorId ? { doctorId } : {}),
          status: { in: ['PENDING', 'CONFIRMED'] },
        },
        select: { timeSlot: true },
      });
    } catch {}

    const bookedSlotsSet = new Set(bookings.map((b) => b.timeSlot));

    const slotResults = baseSlots.map((slot) => ({
      time: slot,
      available: !bookedSlotsSet.has(slot),
    }));

    return NextResponse.json({
      available: true,
      dayOfWeek,
      date,
      slots: slotResults,
    });
  } catch (error) {
    console.error('Error fetching slots:', error);
    // Fallback safe slots return so client never crashes
    return NextResponse.json({
      available: true,
      dayOfWeek: 'Weekday',
      date: new Date().toISOString().split('T')[0],
      slots: ALL_SLOTS_WEEKDAY.map((s) => ({ time: s, available: true })),
    });
  }
}
