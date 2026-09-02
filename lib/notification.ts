import { getEmailTransporter, generateAppointmentEmailHtml } from './email';

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
  console.log('🔔 [NOTIFICATION DISPATCH] Processing notification for appointment:', {
    id: payload.appointmentId,
    patient: payload.patientName,
    email: payload.recipientEmail,
    treatment: payload.treatmentName,
    date: payload.date,
    time: payload.timeSlot,
    phone: payload.recipientPhone,
  });

  const results: { emailSent?: boolean; emailError?: string } = {};

  // 1. Send Email to Customer if recipientEmail is provided
  if (payload.recipientEmail) {
    try {
      const transporter = getEmailTransporter();
      const fromAddress =
        process.env.SMTP_FROM ||
        process.env.EMAIL_FROM ||
        (process.env.SMTP_USER ? `"Roots Dental Clinic" <${process.env.SMTP_USER}>` : '"Roots Dental Clinic" <appointments@rootsdental.com>');

      const htmlContent = generateAppointmentEmailHtml({
        appointmentId: payload.appointmentId,
        patientName: payload.patientName,
        treatmentName: payload.treatmentName,
        doctorName: payload.doctorName,
        date: payload.date,
        timeSlot: payload.timeSlot,
      });

      const info = await transporter.sendMail({
        from: fromAddress,
        to: payload.recipientEmail,
        subject: `Appointment Confirmed: ${payload.treatmentName} on ${payload.date} [${payload.appointmentId}]`,
        text: `Hello ${payload.patientName},\n\nYour appointment (ID: ${payload.appointmentId}) for ${payload.treatmentName} has been confirmed for ${payload.date} at ${payload.timeSlot}.\n\nRoots Super Speciality Dental Clinic\nOpp. Diesel Colony, Main Road, Kazipet\nPhone: +91 98480 12345`,
        html: htmlContent,
      });

      console.log(`✅ [EMAIL SENT] Confirmation delivered to ${payload.recipientEmail}: Message ID: ${info.messageId}`);
      results.emailSent = true;
    } catch (err: any) {
      console.error('❌ [EMAIL DISPATCH ERROR]:', err?.message || err);
      results.emailSent = false;
      results.emailError = err?.message;
    }
  } else {
    console.log('ℹ️ [EMAIL SKIPPED] No customer email provided for this booking.');
  }

  // 2. WhatsApp Cloud API Trigger (if configured)
  if (process.env.WHATSAPP_API_TOKEN && payload.recipientPhone) {
    try {
      console.log('📨 Dispatching WhatsApp Cloud API notification...');
    } catch (err) {
      console.error('WhatsApp dispatch failed:', err);
    }
  }

  return { success: true, ...results };
}
