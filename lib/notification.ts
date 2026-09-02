export interface NotificationPayload {
  recipientPhone?: string;
  recipientEmail?: string;
  patientName: string;
  appointmentId: string;
  treatmentName: string;
  doctorName?: string;
  date: string;
  timeSlot: string;
}

export async function sendAppointmentNotifications(payload: NotificationPayload) {
  console.log('🔔 [NOTIFICATION DISPATCH] New Appointment Booking:', {
    id: payload.appointmentId,
    patient: payload.patientName,
    treatment: payload.treatmentName,
    date: payload.date,
    time: payload.timeSlot,
    phone: payload.recipientPhone,
  });

  // Pluggable provider architecture:
  // 1. WhatsApp Cloud API / Webhook trigger
  if (process.env.WHATSAPP_API_TOKEN && payload.recipientPhone) {
    try {
      console.log('📨 Dispatching WhatsApp notification template...');
      // In production, invoke meta graph API endpoint
    } catch (err) {
      console.error('WhatsApp dispatch failed:', err);
    }
  }

  // 2. Email confirmation trigger
  if (process.env.EMAIL_SERVER_USER && payload.recipientEmail) {
    try {
      console.log(`📧 Sending confirmation email to ${payload.recipientEmail}...`);
      // In production, invoke SMTP / Resend / Sendgrid
    } catch (err) {
      console.error('Email dispatch failed:', err);
    }
  }

  return { success: true };
}
