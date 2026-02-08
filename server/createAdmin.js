import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const email = 'admin@eventrix.com';
        const password = 'admin123';
        const hashedPassword = await bcrypt.hash(password, 12);

        let admin = await User.findOne({ email });

        if (admin) {
            console.log('Admin user already exists.');
            console.log(`Email: ${email}`);
            // If you want to update the password, uncomment the next lines
            // admin.password = hashedPassword;
            // await admin.save();
            // console.log('Password updated to default.');
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

        process.exit();
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
