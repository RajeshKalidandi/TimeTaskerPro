import webpush from 'web-push';
import User from '../models/User';

// Generate VAPID keys if you haven't already
// const vapidKeys = webpush.generateVAPIDKeys();
// console.log(vapidKeys);

webpush.setVapidDetails(
  'mailto:support@tasktimerapp.com',
  process.env.VAPID_PUBLIC_KEY as string,
  process.env.VAPID_PRIVATE_KEY as string
);

export const sendPushNotification = async (userId: string, payload: any) => {
  try {
    const user = await User.findById(userId);
    if (!user?.pushSubscription) return;

    await webpush.sendNotification(
      user.pushSubscription,
      JSON.stringify(payload)
    );
  } catch (error) {
    console.error('Push notification error:', error);
  }
}; 