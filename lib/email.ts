import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendApprovalEmail = async (
    toEmail: string,
    newAdminEmail: string,
    requestId: string
) => {
    const secretPath = process.env.SECRET_ADMIN_PATH || 'admin-$ecret-P@nel';
    const approvalLink = `${process.env.NEXT_PUBLIC_APP_URL}/${secretPath}`;

    try {
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'admin@devorg.com',
            to: toEmail,
            subject: 'New Admin Request - Action Required',
            html: `
        <h1>New Admin Request</h1>
        <p>A new admin access request has been received from <strong>${newAdminEmail}</strong>.</p>
        <p>Click the link below to verify and approve this request:</p>
        <a href="${approvalLink}" style="padding: 12px 24px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px;">
          Approve Request
        </a>
        <p>If you did not expect this, please ignore this email.</p>
      `,
        });
        console.log(`Approval email sent to ${toEmail}`);
    } catch (error) {
        console.error('Failed to send approval email:', error);
        throw error;
    }
};
