import React from 'react';
import { SEO } from '../components/SEO';
import { useAuth } from '../components/auth/AuthContext';
import { Check, Clock, Users, Star } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  price: string;
  currency: string;
  period: string;
  description: string;
  features: PlanFeature[];
  icon: React.ReactNode;
  priceId: string;
}

const plans: PricingPlan[] = [
  {
    name: 'Basic',
    price: '0',
    currency: 'USD',
    period: 'forever',
    description: 'Perfect for getting started with task management',
    icon: <Clock className="w-6 h-6" />,
    priceId: 'free',
    features: [
      { text: 'Basic timer functionality', included: true },
      { text: 'Up to 5 tasks per day', included: true },
      { text: 'Basic task templates', included: true },
      { text: 'Email support', included: true },
      { text: 'Advanced analytics', included: false },
      { text: 'Team collaboration', included: false },
    ],
  },
  {
    name: 'Pro',
    price: '9.99',
    currency: 'USD',
    period: 'month',
    description: 'For professionals who need more power',
    icon: <Star className="w-6 h-6" />,
    priceId: 'price_pro',
    features: [
      { text: 'Everything in Basic', included: true },
      { text: 'Unlimited tasks', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Custom templates', included: true },
      { text: 'Priority support', included: true },
      { text: 'Team collaboration', included: false },
    ],
  },
  {
    name: 'Team',
    price: '19.99',
    currency: 'USD',
    period: 'user/month',
    description: 'Perfect for teams and organizations',
    icon: <Users className="w-6 h-6" />,
    priceId: 'price_team',
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Team collaboration', included: true },
      { text: 'Team analytics', included: true },
      { text: 'Admin controls', included: true },
      { text: 'Custom onboarding', included: true },
      { text: '24/7 phone support', included: true },
    ],
  },
];

export function PricingPage() {
  const { user } = useAuth();

  const handleSubscribe = async (priceId: string) => {
    if (!user) {
      window.location.href = '/login?redirect=/pricing';
      return;
    }

    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          priceId,
          successUrl: `${window.location.origin}/dashboard`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <SEO
        title="Pricing"
        description="Choose the perfect plan for your productivity needs"
        keywords={['pricing', 'subscription', 'plans', 'task management']}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-5 text-xl text-gray-500">
              Start for free, upgrade when you need more
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 rounded-md bg-blue-500 p-2 text-white">
                        {plan.icon}
                      </div>
                      <h3 className="ml-4 text-xl font-semibold text-gray-900">
                        {plan.name}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-500">{plan.description}</p>

                  <div className="mt-6">
                    <div className="flex items-baseline">
                      <span className="text-3xl font-bold tracking-tight text-gray-900">
                        ${plan.price}
                      </span>
                      <span className="ml-1 text-lg text-gray-500">
                        /{plan.period}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <Check
                            className={`h-5 w-5 ${
                              feature.included ? 'text-green-500' : 'text-gray-300'
                            }`}
                          />
                        </div>
                        <p
                          className={`ml-3 text-sm ${
                            feature.included ? 'text-gray-700' : 'text-gray-400'
                          }`}
                        >
                          {feature.text}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSubscribe(plan.priceId)}
                  className="mt-8 block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  {plan.price === '0' ? 'Get Started' : 'Subscribe'}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              Frequently Asked Questions
            </h2>
            <dl className="mt-8 space-y-6 text-left max-w-3xl mx-auto">
              <div>
                <dt className="font-semibold text-gray-900">
                  Can I switch plans later?
                </dt>
                <dd className="mt-2 text-gray-500">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900">
                  What payment methods do you accept?
                </dt>
                <dd className="mt-2 text-gray-500">
                  We accept all major credit cards, including Visa, Mastercard, and American Express. We also support various regional payment methods through Stripe.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-gray-900">
                  Is there a long-term commitment?
                </dt>
                <dd className="mt-2 text-gray-500">
                  No, all paid plans are billed monthly and you can cancel at any time. There are no long-term contracts or commitments.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
}