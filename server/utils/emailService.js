import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import axios from 'axios';

/**
 * Send an email via Brevo API
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} text - Plain text content
 * @param {string} html - HTML content
 */
export const sendEmail = async (to, subject, text, html) => {
    try {
        const apiKey = process.env.SMTP_PASS; // Using the same key variable
        const senderEmail = process.env.EMAIL_FROM || 'noreply@eventrix.com';

        if (!apiKey) {
            console.error('Email Error: SMTP_PASS (Brevo API Key) is missing');
            return null;
        }

        const data = {
            sender: { email: senderEmail, name: 'Eventrix Team' },
            to: [{ email: to }],
            subject: subject,
            htmlContent: html,
            textContent: text
        };

        const response = await axios.post('https://api.brevo.com/v3/smtp/email', data, {
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json'
            }
        });

        console.log('Email sent via API:', response.data.messageId);
        return response.data;
    } catch (error) {
        console.error('Error sending email via API:', {
            message: error.message,
            response: error.response?.data || 'No response data'
        });
        return null;
    }
};

/**
 * Send Welcome Email
 */
export const sendWelcomeEmail = async (user) => {
    const subject = 'Welcome to Eventrix!';
    const text = `Hi ${user.name},\n\nWelcome to Eventrix! We are excited to have you on board as a ${user.role}.\n\nBest regards,\nThe Eventrix Team`;
    const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #ef4444;">Welcome to Eventrix!</h2>
            <p>Hi <strong>${user.name}</strong>,</p>
            <p>We are excited to have you on board as a <strong>${user.role}</strong>.</p>
            <p>Start exploring and registering for upcoming events now!</p>
            <br>
            <p style="border-top: 1px solid #eee; padding-top: 20px;">Best regards,<br>The Eventrix Team</p>
        </div>
    `;
    return sendEmail(user.email, subject, text, html);
};

/**
 * Send Event Creation Notification
 */
export const sendEventUpdateEmail = async (user, event) => {
    const subject = `New Event: ${event.title}`;
    const text = `Hi ${user.name},\n\nA new event "${event.title}" has been created in the ${event.category} category. Check it out now!\n\nBest regards,\nThe Eventrix Team`;
    const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #ef4444;">New Event: ${event.title}</h2>
            <p>Hi <strong>${user.name}</strong>,</p>
            <p>A new event "<strong>${event.title}</strong>" has been created in the <strong>${event.category}</strong> category.</p>
            <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p>Don't miss out! Register now.</p>
            <br>
            <p style="border-top: 1px solid #eee; padding-top: 20px;">Best regards,<br>The Eventrix Team</p>
        </div>
    `;
    return sendEmail(user.email, subject, text, html);
};

/**
 * Send Event Registration Confirmation
 */
export const sendRegistrationConfirmationEmail = async (user, event) => {
    const subject = `Registration Confirmed: ${event.title}`;
    const text = `Hi ${user.name},\n\nYour registration for "${event.title}" has been confirmed. See you there!\n\nBest regards,\nThe Eventrix Team`;
    const html = `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #ef4444;">Registration Confirmed!</h2>
            <p>Hi <strong>${user.name}</strong>,</p>
            <p>Your registration for "<strong>${event.title}</strong>" has been successfully confirmed.</p>
            <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${event.time}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <br>
            <p style="border-top: 1px solid #eee; padding-top: 20px;">Best regards,<br>The Eventrix Team</p>
        </div>
    `;
    return sendEmail(user.email, subject, text, html);
};
