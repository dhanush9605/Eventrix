import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const updateAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB.");

        const email = 'admin@eventrix.com';
        const newPassword = 'admin123';

        const adminUser = await User.findOne({ email });

        if (!adminUser) {
            console.log("Admin user not found!");
            return;
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        adminUser.password = hashedPassword;
        await adminUser.save();

        console.log(`Password for ${email} updated to '${newPassword}' successfully.`);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
    }
};

updateAdmin();
