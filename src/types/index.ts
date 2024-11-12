export interface User {
  id: string;
  name: string;
  email: string;
  subscription: 'free' | 'pro' | 'team';
  isEmailVerified: boolean;
}

export interface Task {
  id: string;
  user: string;
  title: string;
  description?: string;
  duration: number;
  status: 'pending' | 'in_progress' | 'completed';
  tags?: string[];
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
}

export interface Notification {
  id: string;
  user: string;
  type: 'task_complete' | 'task_update' | 'engagement_check' | 'locked_status';
  title: string;
  message: string;
  read: boolean;
  data?: any;
  createdAt: Date;
}

export interface NotificationPreference {
  taskUpdates: boolean;
  taskCompletions: boolean;
  engagementChecks: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  doNotDisturb: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
} 