import mongoose from 'mongoose';

const notificationPreferenceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  taskUpdates: {
    type: Boolean,
    default: true,
  },
  taskCompletions: {
    type: Boolean,
    default: true,
  },
  engagementChecks: {
    type: Boolean,
    default: true,
  },
  emailNotifications: {
    type: Boolean,
    default: false,
  },
  pushNotifications: {
    type: Boolean,
    default: true,
  },
  doNotDisturb: {
    enabled: {
      type: Boolean,
      default: false,
    },
    startTime: {
      type: String,
      default: '22:00',
    },
    endTime: {
      type: String,
      default: '08:00',
    },
  },
});

export default mongoose.model('NotificationPreference', notificationPreferenceSchema); 