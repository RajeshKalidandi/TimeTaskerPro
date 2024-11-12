import express from 'express';
import User from '../models/User';
import auth from '../middleware/auth';

const router = express.Router();

router.use(auth);

// Subscribe to push notifications
router.post('/subscribe', async (req: any, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      pushSubscription: req.body
    });
    
    res.json({ message: 'Successfully subscribed to push notifications' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Unsubscribe from push notifications
router.post('/unsubscribe', async (req: any, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $unset: { pushSubscription: 1 }
    });
    
    res.json({ message: 'Successfully unsubscribed from push notifications' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get VAPID public key
router.get('/vapid-public-key', (req, res) => {
  res.json({ key: process.env.VAPID_PUBLIC_KEY });
});

export default router; 