import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars
dotenv.config({ path: join(__dirname, '../.env') });

import User from '../models/User.js';

const seedAdmin = async () => {
    try {
        const email = process.env.ADMIN_EMAIL || 'admin@eventrix.com';
        const password = process.env.ADMIN_PASSWORD || 'admin123';

        const hashedPassword = await bcrypt.hash(password, 12);

        let admin = await User.findOne({ email });

        if (!admin) {
            admin = await User.create({
                name: 'System Admin',
                email,
                password: hashedPassword,
                role: 'admin',
                department: 'Administration'
            });
            console.log('Admin user created successfully.');
            console.log(`Email: ${email}`);
            // Don't log password if it's from env var, security practice
            if (password === 'admin123') {
                console.log(`Password: ${password}`);
            } else {
                console.log('Password: [HIDDEN_FROM_LOGS]');
            }
        }
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
};

// Execute if run directly
if (process.argv[1] === __filename) {
    if (!process.env.MONGODB_URI) {
        console.error('MONGODB_URI is not defined. check .env file');
        process.exit(1);
    }

    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log('Connected to MongoDB');
            return seedAdmin();
        })
        .then(() => {
            console.log('Script completed.');
            return mongoose.disconnect();
        })
        .catch(err => {
            console.error('Script failed:', err);
            process.exit(1);
        });
}

export default seedAdmin;
