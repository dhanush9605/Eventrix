import { sendWelcomeEmail } from '../utils/emailService.js';

const testUser = {
    name: 'Eventrix Admin',
    email: 'eventrixhq@gmail.com', 
    role: 'admin'
};

async function runTest() {
    console.log('Sending test email to:', testUser.email);
    try {
        const result = await sendWelcomeEmail(testUser);
        if (result) {
            console.log('Test email sent successfully! Message ID:', result.messageId);
        } else {
            console.log('Test email failed to return a result.');
        }
    } catch (error) {
        console.error('CRITICAL ERROR in test script:');
        console.error('Message:', error.message);
        console.error('Code:', error.code);
        console.error('Response:', error.response);
        console.error('ResponseCode:', error.responseCode);
        console.error('Command:', error.command);
    }
}

runTest();
