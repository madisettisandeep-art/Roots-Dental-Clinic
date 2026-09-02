import { cleanPhoneForUrl } from './utils';

export function getWhatsAppLink(options: {
  phone?: string;
  treatmentName?: string;
  appointmentId?: string;
  patientName?: string;
  isEmergency?: boolean;
  customMessage?: string;
}): string {
  const phone = cleanPhoneForUrl(
    options.phone || process.env.NEXT_PUBLIC_CLINIC_WHATSAPP || '919876543210'
  );

  let message = '';

  if (options.customMessage) {
    message = options.customMessage;
  } else if (options.isEmergency) {
    message = '🚨 Hello Roots Dental Clinic, I have an urgent dental emergency and need immediate consultation.';
  } else if (options.appointmentId) {
    message = `Hello Roots Dental Clinic, I would like to confirm/enquire about my appointment request ID: ${options.appointmentId}${options.patientName ? ` (Patient: ${options.patientName})` : ''}.`;
  } else if (options.treatmentName) {
    message = `Hello Roots Dental Clinic, I am interested in *${options.treatmentName}*. I would like to know more and book a consultation.`;
  } else {
    message = 'Hello Roots Super Speciality Dental Clinic, I would like to book a dental appointment.';
  }

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}
