import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, BarChart, Users, ArrowRight, Star } from 'lucide-react';
import { SEO } from '../components/SEO';

export function LandingPage() {
  return (
    <>
      <SEO
        title="Task Timer Pro - Boost Your Productivity"
        description="Transform your productivity with Task Timer Pro. Smart task management, time tracking, and team collaboration tools to help you achieve more."
        keywords={['task management', 'time tracking', 'productivity tools', 'team collaboration', 'pomodoro timer']}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <header className="relative bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-8 h-8 text-blue-600" />
                <span className="text-2xl font-bold text-gray-900">Task Timer Pro</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1>
                  <span className="block text-sm font-semibold uppercase tracking-wide text-blue-600">
                    Introducing Task Timer Pro
                  </span>
                  <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                    <span className="block text-gray-900">Master Your Time,</span>
                    <span className="block text-blue-600">Boost Productivity</span>
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Transform how you work with our intelligent task management and time tracking solution. Stay focused, meet deadlines, and achieve more—every day.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                  <Link
                    to="/register"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                  </Link>
                </div>
              </div>
              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <img
                    className="w-full rounded-lg"
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Task Timer Pro Dashboard"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Everything you need to stay productive
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Powerful features to help you manage time and tasks effectively
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="pt-6">
                  <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                    <div className="-mt-6">
                      <div className="inline-flex items-center justify-center rounded-md bg-blue-600 p-3 shadow-lg">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900">
                        Smart Time Tracking
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        Interactive timer with visual feedback and smart duration suggestions based on your history.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="pt-6">
                  <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                    <div className="-mt-6">
                      <div className="inline-flex items-center justify-center rounded-md bg-blue-600 p-3 shadow-lg">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900">
                        Task Management
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        Organize tasks with tags, set completion criteria, and track progress effortlessly.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="pt-6">
                  <div className="flow-root rounded-lg bg-gray-50 px-6 pb-8">
                    <div className="-mt-6">
                      <div className="inline-flex items-center justify-center rounded-md bg-blue-600 p-3 shadow-lg">
                        <BarChart className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900">
                        Advanced Analytics
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        Gain insights into your productivity with detailed reports and trends analysis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to dive in?</span>
              <span className="block text-blue-200">Start your free trial today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                >
                  Get Started
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Clock className="w-6 h-6 text-blue-600" />
                <span className="text-xl font-semibold text-gray-900">Task Timer Pro</span>
              </div>
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} Task Timer Pro. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}