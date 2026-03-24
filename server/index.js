import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';
import adminRoutes from './routes/admin.js';
import feedbackRoutes from './routes/feedback.js';
import departmentRoutes from './routes/departments.js';
import settingsRoutes from './routes/settings.js';
import maintenance from './middleware/maintenance.js';
import seedAdmin from './scripts/createAdmin.js';

dotenv.config();
// Trigger restart for env update

const app = express();
// Trust the first proxy in front of Express (e.g., Render)
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet({
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" }
})); // Security Headers with Google Login support
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', process.env.CLIENT_URL],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // Increased limit for development/maintenance checks
    message: 'Too many requests from this IP, please try again after 15 minutes',
    validate: { xForwardedForHeader: false } // Prevent express-rate-limit from crashing the app due to reverse proxy IP spoofing checks
});
app.use('/api/', limiter);

// Maintenance Mode Middleware
app.use('/api', maintenance);

// Database Connection
const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventrix');
        console.log('Connected to MongoDB');
        await seedAdmin();
    } catch (err) {
        console.error('MongoDB connection error:', err);
    }
};

// Middleware to ensure DB is connected for every request on Vercel
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/', (req, res) => {
    res.send('Eventrix Backend is running');
});

// Start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
