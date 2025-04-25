import mailjet from 'node-mailjet';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const mailjetClient = mailjet.apiConnect(
  process.env.SERVER_EMAIL_MAILJET_API_KEY,
  process.env.SERVER_EMAIL_MAILJET_SECRET_KEY
);

async function sendTestEmail() {
  try {
    const response = await mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_FROM_EMAIL,
            Name: process.env.MAILJET_FROM_NAME,
          },
          To: [
            {
              Email: 'theaffiliatemarketingforus@gmail.com', // Change to your email
              Name: 'Test User',
            },
          ],
          Subject: 'Mailjet Test Email',
          TextPart: 'This is a test email from Mailjet setup!',
          HTMLPart: '<h3>This is a <b>test email</b> from Mailjet setup!</h3>',
        },
      ],
    });

    console.log('✅ Email sent:', response.body);
  } catch (error) {
    console.error('❌ Mailjet error:', error);
  }
}

sendTestEmail();
