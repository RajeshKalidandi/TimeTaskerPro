import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';

export function LoginPage() {
  return (
    <>
      <SEO
        title="Login"
        description="Sign in to Task Timer Pro to manage your tasks and boost productivity"
        keywords={['login', 'sign in', 'task management', 'productivity']}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <div>
            <h1 className="text-center text-3xl font-extrabold text-gray-900">
              Welcome Back
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                create a new account
              </Link>
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
}