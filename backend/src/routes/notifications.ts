import express from 'express';
import Notification from '../models/Notification';
import auth from '../middleware/auth';

const router = express.Router();

router.use(auth);

// Get all notifications for user
router.get('/', async (req: any, res) => {
  try {
    const notifications = await Notification.find({ 
      user: req.user.id 
    }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Mark notification as read
router.put('/:id/read', async (req: any, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { read: true },
      { new: true }
    );
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete notification
router.delete('/:id', async (req: any, res) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    res.json({ message: 'Notification removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router; 