import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import connectDB from './config/database';
import taskRoutes from './routes/tasks';
import userRoutes from './routes/users';
import { initializeSocket } from './services/socket';
import { errorHandler } from './middleware/error';
import { apiLimiter, authLimiter } from './middleware/rateLimiter';
import notificationRoutes from './routes/notifications';
import notificationPreferencesRoutes from './routes/notificationPreferences';
import pushSubscriptionRoutes from './routes/pushSubscription';
import { initializeCleanupJobs } from './services/cleanup';
import authRoutes from './routes/auth';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO
const io = initializeSocket(httpServer);

// Middleware
app.use(cors());
app.use(express.json());

// Apply rate limiting
app.use('/api/', apiLimiter);
app.use('/api/users', authLimiter);

// Make io available in routes
app.use((req: any, res, next) => {
  req.io = io;
  next();
});

// Connect to MongoDB
connectDB();

// Initialize cleanup jobs
initializeCleanupJobs();

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/notification-preferences', notificationPreferencesRoutes);
app.use('/api/push', pushSubscriptionRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 