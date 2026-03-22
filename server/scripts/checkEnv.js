import dotenv from 'dotenv';
dotenv.config();

console.log('--- Env Verification ---');
console.log('SMTP_HOST:', process.env.SMTP_HOST);
console.log('SMTP_PORT:', process.env.SMTP_PORT);
console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS Starts with:', process.env.SMTP_PASS ? process.env.SMTP_PASS.substring(0, 5) + '...' : 'MISSING');
console.log('------------------------');
