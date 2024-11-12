import React from 'react';
import { RegisterForm } from '../components/auth/RegisterForm';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';

export function RegisterPage() {
  return (
    <>
      <SEO
        title="Create Account"
        description="Join Task Timer Pro to start managing your tasks effectively and boost your productivity"
        keywords={['register', 'sign up', 'task management', 'productivity tools']}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div>
            <h1 className="text-center text-3xl font-extrabold text-gray-900">
              Create Your Account
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </>
  );
}