import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

const seedAdmin = async () => {
    try {
        const email = 'admin@eventrix.com';
        const password = 'admin123';
        const hashedPassword = await bcrypt.hash(password, 12);

        let admin = await User.findOne({ email });

        if (admin) {
            console.log('Admin user check: User already exists.');
        } else {
            admin = await User.create({
                name: 'System Admin',
                email,
                password: hashedPassword,
                role: 'admin',
                department: 'Administration'
            });
            console.log('Admin user created successfully.');
            console.log(`Email: ${email}`);
            console.log(`Password: ${password}`);
        }
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
};

export default seedAdmin;
