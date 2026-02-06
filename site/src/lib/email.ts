import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface LeadNotification {
  name: string;
  email: string;
  phone: string;
  sourceWebsite: string;
  submissionId: string;
}

export async function notifyNewLead(lead: LeadNotification): Promise<void> {
  const to = process.env.NOTIFICATION_EMAIL;
  if (!to || !process.env.SMTP_HOST) {
    console.log('SMTP not configured, skipping email notification');
    return;
  }

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: `New Lead: ${lead.name || 'Unknown'} — ${lead.sourceWebsite || 'CheapestCarInsurance'}`,
    text: [
      `New lead submitted via JotForm`,
      ``,
      `Name:    ${lead.name || '(not provided)'}`,
      `Email:   ${lead.email || '(not provided)'}`,
      `Phone:   ${lead.phone || '(not provided)'}`,
      `Source:  ${lead.sourceWebsite || '(not provided)'}`,
      `ID:      ${lead.submissionId}`,
      `Time:    ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}`,
      ``,
      `View all leads: https://cheapestcarinsurancetulsa.com/admin/leads`,
    ].join('\n'),
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 500px;">
        <h2 style="color: #1e40af; margin-bottom: 16px;">New Lead Received</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; font-weight: 600; color: #374151;">Name</td><td style="padding: 8px;">${lead.name || '(not provided)'}</td></tr>
          <tr style="background: #f9fafb;"><td style="padding: 8px; font-weight: 600; color: #374151;">Email</td><td style="padding: 8px;"><a href="mailto:${lead.email}">${lead.email || '(not provided)'}</a></td></tr>
          <tr><td style="padding: 8px; font-weight: 600; color: #374151;">Phone</td><td style="padding: 8px;"><a href="tel:${lead.phone}">${lead.phone || '(not provided)'}</a></td></tr>
          <tr style="background: #f9fafb;"><td style="padding: 8px; font-weight: 600; color: #374151;">Source</td><td style="padding: 8px;">${lead.sourceWebsite || '(not provided)'}</td></tr>
          <tr><td style="padding: 8px; font-weight: 600; color: #374151;">Submitted</td><td style="padding: 8px;">${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}</td></tr>
        </table>
        <p style="margin-top: 16px;"><a href="https://cheapestcarinsurancetulsa.com/admin/leads" style="background: #1e40af; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; display: inline-block;">View All Leads</a></p>
      </div>
    `,
  });
}
