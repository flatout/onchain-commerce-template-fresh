'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CancelPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/'); // Redirect to home after 5 seconds
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment Cancelled
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your payment was cancelled. No charges were made.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Redirecting you back to home in 5 seconds...
          </p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
} 