import mailjet from 'node-mailjet';

const mailjetClient = mailjet.apiConnect(
  process.env.SERVER_EMAIL_MAILJET_API_KEY!,
  process.env.SERVER_EMAIL_MAILJET_SECRET_KEY!
);

export async function sendEmail(email: string, password: string, name: string) {
  try {
    const request = mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_FROM_EMAIL!,
            Name: process.env.MAILJET_FROM_NAME!,
          },
          To: [{ Email: email, Name: 'New User' }],
          Subject: 'Welcome to SKILLFLOW',
          TextPart: `Welcome ${name}! Here is your temporary password: ${password}`,
          HTMLPart: `<h3>Welcome to SKILLFLOW</h3>
          <p>We're excited to have you on board ${name}!</p>
          <p>Your temporary password: <strong>${password}</strong></p>
          <br>
          <p>For security reasons, please <a href="https://skillflow.online/login" style="color: #007bff; text-decoration: none;"><strong>sign in now</strong></a> and update your password.</p>
          <br>
          <p>If you need any assistance, feel free to reach out.</p>
          <p>– The SKILLFLOW Team</p>`,
          
        },
      ],
    });

    await request;
    console.log('✅ Email sent successfully');
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw new Error('Email sending failed');
  }
}
