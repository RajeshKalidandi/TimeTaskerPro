import cron from 'node-cron';
import Notification from '../models/Notification';
import NotificationAnalytics from '../models/NotificationAnalytics';

export const initializeCleanupJobs = () => {
  // Run cleanup at 3 AM every day
  cron.schedule('0 3 * * *', async () => {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Clean up old notifications
      await Notification.deleteMany({
        createdAt: { $lt: thirtyDaysAgo },
        read: true
      });

      // Clean up old analytics
      await NotificationAnalytics.deleteMany({
        deliveredAt: { $lt: thirtyDaysAgo }
      });

      console.log('Cleanup job completed successfully');
    } catch (error) {
      console.error('Error in cleanup job:', error);
    }
  });
}; 