'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // You can add analytics or other tracking here
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
            Payment Successful!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for your purchase. Your NFT will be minted shortly.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Redirecting you back to home in 5 seconds...
          </p>
        </div>
      </div>
    </div>
  );
} 