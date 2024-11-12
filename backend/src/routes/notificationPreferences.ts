import express from 'express';
import NotificationPreference from '../models/NotificationPreference';
import auth from '../middleware/auth';
import { validate } from '../middleware/validation';
import { body } from 'express-validator';

const router = express.Router();

router.use(auth);

const preferenceValidation = [
  body('taskUpdates').optional().isBoolean(),
  body('taskCompletions').optional().isBoolean(),
  body('engagementChecks').optional().isBoolean(),
  body('emailNotifications').optional().isBoolean(),
  body('pushNotifications').optional().isBoolean(),
  body('doNotDisturb.enabled').optional().isBoolean(),
  body('doNotDisturb.startTime').optional().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
  body('doNotDisturb.endTime').optional().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/),
];

// Get user preferences
router.get('/', async (req: any, res) => {
  try {
    let preferences = await NotificationPreference.findOne({ user: req.user.id });
    
    if (!preferences) {
      preferences = await NotificationPreference.create({ user: req.user.id });
    }
    
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update preferences
router.put('/', validate(preferenceValidation), async (req: any, res) => {
  try {
    const preferences = await NotificationPreference.findOneAndUpdate(
      { user: req.user.id },
      { $set: req.body },
      { new: true, upsert: true }
    );
    
    res.json(preferences);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router; 