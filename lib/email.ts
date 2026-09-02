import nodemailer from 'nodemailer';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

let cachedTransporter: nodemailer.Transporter | null = null;

export function getEmailTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST || process.env.EMAIL_SERVER_HOST;
  const port = Number(process.env.SMTP_PORT || process.env.EMAIL_SERVER_PORT || 587);
  const user = process.env.SMTP_USER || process.env.EMAIL_SERVER_USER || process.env.GMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_SERVER_PASSWORD || process.env.GMAIL_APP_PASSWORD;

  if (user && pass) {
    // If Gmail is configured
    if (user.includes('@gmail.com') || process.env.GMAIL_USER) {
      cachedTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass },
      });
    } else {
      // Standard SMTP (Zoho, Sendgrid, Resend, Custom SMTP)
      cachedTransporter = nodemailer.createTransport({
        host: host || 'smtp.gmail.com',
        port,
        secure: port === 465,
        auth: { user, pass },
      });
    }
  } else {
    // Fallback: Ethereal test transport or mock logger
    console.warn('⚠️ No SMTP credentials configured (SMTP_USER / SMTP_PASS or GMAIL_USER / GMAIL_APP_PASSWORD). Emails will be logged to server console.');
    cachedTransporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'mock.ethereal.user@ethereal.email',
        pass: 'mockpassword',
      },
    });
  }

  return cachedTransporter;
}

export function generateAppointmentEmailHtml(params: {
  appointmentId: string;
  patientName: string;
  treatmentName: string;
  doctorName?: string;
  date: string;
  timeSlot: string;
}): string {
  const whatsappUrl = `https://wa.me/919848012345?text=${encodeURIComponent(
    `Hello Roots Dental Clinic, I am confirming my appointment (ID: ${params.appointmentId}) for ${params.treatmentName} on ${params.date} at ${params.timeSlot}.`
  )}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmation - Roots Super Speciality Dental Clinic</title>
</head>
<body style="margin: 0; padding: 0; background-color: #070e1b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #070e1b; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #0d1b2e; border: 1px solid #1e3a5f; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 30px; background: linear-gradient(135deg, #0b1f3a 0%, #0077b6 100%); text-align: center; border-bottom: 1px solid #00b4d8;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">
                ROOTS DENTAL CLINIC
              </h1>
              <p style="margin: 6px 0 0 0; font-size: 13px; color: #90e0ef; font-weight: 500; text-transform: uppercase; letter-spacing: 1.5px;">
                Super Speciality Dental Care • Kazipet
              </p>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 35px 30px 25px 30px;">
              <div style="text-align: center; margin-bottom: 25px;">
                <span style="display: inline-block; background-color: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; color: #34d399; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 6px 14px; border-radius: 50px;">
                  ✓ Appointment Confirmed
                </span>
                <h2 style="margin: 15px 0 6px 0; font-size: 20px; font-weight: 700; color: #ffffff;">
                  Hello ${params.patientName},
                </h2>
                <p style="margin: 0; font-size: 14px; color: #94a3b8; line-height: 1.6;">
                  Your appointment request has been scheduled with our dental specialists. Here are your booking details:
                </p>
              </div>

              <!-- Appointment ID Badge -->
              <div style="background-color: #070e1b; border: 1px dashed #00b4d8; border-radius: 14px; padding: 18px; text-align: center; margin-bottom: 25px;">
                <span style="display: block; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">
                  Appointment Reference ID
                </span>
                <span style="font-size: 22px; font-family: monospace; font-weight: 800; color: #48cae4; letter-spacing: 2px;">
                  ${params.appointmentId}
                </span>
              </div>

              <!-- Appointment Details Table -->
              <table role="presentation" width="100%" style="background-color: #091526; border-radius: 14px; border: 1px solid #1e3a5f; padding: 18px; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 8px 12px; font-size: 13px; color: #94a3b8; width: 40%;">Treatment:</td>
                  <td style="padding: 8px 12px; font-size: 13px; color: #ffffff; font-weight: 700;">${params.treatmentName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; font-size: 13px; color: #94a3b8;">Doctor / Specialist:</td>
                  <td style="padding: 8px 12px; font-size: 13px; color: #ffffff; font-weight: 600;">${params.doctorName || 'Assigned Specialist (Chief Dentist)'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; font-size: 13px; color: #94a3b8;">Date:</td>
                  <td style="padding: 8px 12px; font-size: 13px; color: #48cae4; font-weight: 700;">${params.date}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; font-size: 13px; color: #94a3b8;">Time Slot:</td>
                  <td style="padding: 8px 12px; font-size: 13px; color: #48cae4; font-weight: 700;">${params.timeSlot}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 12px; font-size: 13px; color: #94a3b8;">Clinic Location:</td>
                  <td style="padding: 8px 12px; font-size: 13px; color: #ffffff;">Opp. Diesel Colony, Main Road, Kazipet, Telangana 506003</td>
                </tr>
              </table>

              <!-- Action Buttons -->
              <div style="text-align: center; margin-bottom: 25px;">
                <a href="${whatsappUrl}" target="_blank" style="display: inline-block; background-color: #25d366; color: #ffffff; font-size: 13px; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.5px; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);">
                  💬 Chat / Confirm on WhatsApp
                </a>
              </div>

              <!-- Helpful Tips -->
              <div style="background-color: rgba(0, 180, 216, 0.08); border-left: 4px solid #00b4d8; padding: 14px; border-radius: 8px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 12px; color: #90e0ef; line-height: 1.5;">
                  <strong>💡 Visiting Guidelines:</strong> Please arrive 10 minutes prior to your scheduled time slot. If you need to reschedule, reply to this email or message us on WhatsApp.
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 30px; background-color: #070e1b; border-top: 1px solid #1e3a5f; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b;">
                Roots Super Speciality Dental Clinic • Kazipet, Hanamkonda
              </p>
              <p style="margin: 0; font-size: 11px; color: #475569;">
                Need assistance? Call us at <a href="tel:+919848012345" style="color: #00b4d8; text-decoration: none;">+91 98480 12345</a> or email <a href="mailto:contact@rootsdental.com" style="color: #00b4d8; text-decoration: none;">contact@rootsdental.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
