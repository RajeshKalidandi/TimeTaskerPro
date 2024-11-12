import React from 'react';
import { SEO } from '../components/SEO';
import { useAuth } from '../components/auth/AuthContext';
import { TaskForm } from '../components/TaskForm';
import { CircularTimer } from '../components/CircularTimer';
import { Clock, CheckCircle, LogOut } from 'lucide-react';

export function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = React.useState([]);
  const [currentTask, setCurrentTask] = React.useState(null);

  return (
    <>
      <SEO
        title="Dashboard"
        description="Manage your tasks and track your productivity with Task Timer Pro"
        keywords={['dashboard', 'task management', 'productivity tracking']}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Task Timer Pro</h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                <button
                  onClick={logout}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Rest of the dashboard content remains the same */}
          </div>
        </main>
      </div>
    </>
  );
}