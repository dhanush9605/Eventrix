import Settings from '../models/Settings.js';
import jwt from 'jsonwebtoken';

const maintenance = async (req, res, next) => {
    try {
        const settings = await Settings.findOne();

        // If maintenance mode is ON
        if (settings?.maintenanceMode) {
            console.log(`[Maintenance] Mode is ON. Path: ${req.path}`);

            // 1. Allow bypass for specific routes needed for recovery/login
            if (req.path === '/auth/login' || req.path.startsWith('/settings')) {
                console.log(`[Maintenance] Bypassing for route: ${req.path}`);
                return next();
            }

            // 2. Allow bypass for admins (manually decode token since auth middleware hasn't run)
            const token = req.headers.authorization?.split(" ")[1];
            if (token) {
                try {
                    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
                    if (decodedData.role === 'admin') {
                        console.log(`[Maintenance] Bypassing for admin user`);
                        return next();
                    }
                } catch (err) {
                    console.log(`[Maintenance] Token verification failed: ${err.message}`);
                    // Invalid token, treat as guest/student
                }
            }

            // 3. Allow bypass for users with maintenance password
            const maintenancePass = req.headers['x-maintenance-password'];
            if (maintenancePass && maintenancePass === settings.maintenancePassword) {
                console.log(`[Maintenance] Bypassing for user with correct maintenance password`);
                return next();
            }

            console.log(`[Maintenance] Blocking access to: ${req.path}`);
            return res.status(503).json({
                message: 'System is currently under maintenance. Please try again later.',
                maintenance: true
            });
        }

        next();
    } catch (error) {
        console.error('CRITICAL: Maintenance Middleware Error:', error);
        next();
    }
};

export default maintenance;
