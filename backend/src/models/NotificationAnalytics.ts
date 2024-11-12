import mongoose from 'mongoose';

const notificationAnalyticsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  notificationType: {
    type: String,
    required: true,
  },
  delivered: {
    type: Boolean,
    default: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  clicked: {
    type: Boolean,
    default: false,
  },
  deliveredAt: {
    type: Date,
    default: Date.now,
  },
  readAt: Date,
  clickedAt: Date,
  platform: {
    type: String,
    enum: ['web', 'push', 'email'],
    required: true,
  },
});

notificationAnalyticsSchema.index({ user: 1, deliveredAt: -1 });

export default mongoose.model('NotificationAnalytics', notificationAnalyticsSchema); 