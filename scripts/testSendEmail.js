import { sendWelcomeEmail } from './sendEmail.js';

async function testEmail() {
  try {
    const email = 'tomehprince@gmail.com';  // Replace with the email you want to test
    const password = 'tempPassword123';  // Replace with the temporary password

    const result = await sendWelcomeEmail(email, password); // Wait for the promise to resolve
    console.log('Email sent result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

testEmail();
