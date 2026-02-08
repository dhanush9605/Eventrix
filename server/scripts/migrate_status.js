import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load env vars
dotenv.config({ path: join(__dirname, '../.env') });

import User from '../models/User.js';

const migrateStatus = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const result = await User.updateMany(
            { status: { $exists: false } },
            { $set: { status: 'Active' } }
        );

        console.log(`Updated ${result.modifiedCount} users with default status 'Active'.`);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

migrateStatus();
