import mailjet from 'node-mailjet';

import dotenv from 'dotenv';

dotenv.config();

export function sendWelcomeEmail(email, password) {
  return new Promise((resolve, reject) => {
    try {
      const mailjetClient = mailjet.apiConnect(
        process.env.SERVER_EMAIL_MAILJET_API_KEY,
        process.env.SERVER_EMAIL_MAILJET_SECRET_KEY
      );

      mailjetClient
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: process.env.MAILJET_FROM_EMAIL,
                Name: process.env.MAILJET_FROM_NAME,
              },
              To: [
                {
                  Email: email,
                  Name: 'New User',
                },
              ],
              Subject: 'Welcome to SKILLFLOW',
              TextPart: `Welcome to SKILLFLOW! Here is your temporary password: ${password}. Please log in and update your password.`,
              HTMLPart: `<h3>Welcome to SKILLFLOW,</h3><p>Here is your temporary password: <strong>${password}</strong>.</p><p>Please log in and update your password.</p>`,
            },
          ],
        })
        .then(response => {
          console.log('✅ Email sent:', response.body);
          resolve(response.body); // Resolve with the response
        })
        .catch(error => {
          console.error('❌ Error sending email:', error);
          reject(new Error('Failed to send email')); // Reject with an error
        });
    } catch (error) {
      console.error('❌ Error sending email:', error);
      reject(new Error('Failed to send email'));
    }
  });
}
