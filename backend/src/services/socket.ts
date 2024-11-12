import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import Notification from '../models/Notification';
import NotificationPreference from '../models/NotificationPreference';
import { socketAuth } from '../middleware/socketAuth';
import NotificationAnalytics from '../models/NotificationAnalytics';
import { sendPushNotification } from './pushNotification';

export const initializeSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: ['GET', 'POST']
    }
  });

  // Apply authentication middleware
  io.use(socketAuth);

  const userSockets = new Map<string, string>();

  io.on('connection', (socket) => {
    const userId = socket.data.user.id;
    console.log('Authenticated client connected:', socket.id, 'User:', userId);

    socket.join(`user:${userId}`);
    userSockets.set(socket.id, userId);

    // Handle task updates
    socket.on('task:update', async (data) => {
      try {
        const preferences = await NotificationPreference.findOne({ user: userId });
        
        if (preferences?.taskUpdates) {
          const notification = await Notification.create({
            user: userId,
            type: 'task_update',
            title: 'Task Updated',
            message: `Task "${data.title}" has been updated`,
            data: data
          });

          io.to(`user:${userId}`).emit('task:updated', {
            task: data,
            notification
          });
        }
      } catch (error) {
        console.error('Error handling task update:', error);
      }
    });

    // Handle task completion
    socket.on('task:complete', async (data) => {
      try {
        const preferences = await NotificationPreference.findOne({ user: userId });
        
        if (preferences?.taskCompletions) {
          const notification = await Notification.create({
            user: userId,
            type: 'task_complete',
            title: 'Task Completed',
            message: `Task "${data.title}" has been completed`,
            data: data
          });

          io.to(`user:${userId}`).emit('task:completed', {
            task: data,
            notification
          });
        }
      } catch (error) {
        console.error('Error handling task completion:', error);
      }
    });

    // Handle engagement checks
    socket.on('engagement:check', async (data) => {
      try {
        const preferences = await NotificationPreference.findOne({ user: userId });
        
        if (preferences?.engagementChecks) {
          const notification = await Notification.create({
            user: userId,
            type: 'engagement_check',
            title: 'Engagement Check',
            message: 'Are you still working on your task?',
            data: data
          });

          io.to(`user:${userId}`).emit('engagement:required', {
            check: data,
            notification
          });
        }
      } catch (error) {
        console.error('Error handling engagement check:', error);
      }
    });

    // Track notification interactions
    socket.on('notification:read', async (notificationId: string) => {
      try {
        const analytics = await NotificationAnalytics.findOneAndUpdate(
          { notification: notificationId },
          { 
            read: true,
            readAt: new Date()
          },
          { new: true }
        );
      } catch (error) {
        console.error('Error tracking notification read:', error);
      }
    });

    socket.on('notification:click', async (notificationId: string) => {
      try {
        const analytics = await NotificationAnalytics.findOneAndUpdate(
          { notification: notificationId },
          { 
            clicked: true,
            clickedAt: new Date()
          },
          { new: true }
        );
      } catch (error) {
        console.error('Error tracking notification click:', error);
      }
    });

    socket.on('disconnect', () => {
      userSockets.delete(socket.id);
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
}; 