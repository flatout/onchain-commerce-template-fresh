'use client';

import Image from 'next/image';

export default function TitleBar() {
  return (
    <div className="w-full bg-red-800 py-2 flex flex-col items-center mt-16">
      <Image
        src="/carmania-logo.png"
        alt="CarMania Logo"
        width={220}
        height={80}
        className="mb-0"
        priority
      />
      <h1 className="text-2xl font-bold text-white tracking-widest italic" style={{ letterSpacing: '0.1em' }}>
        CAR OF THE DAY
      </h1>
    </div>
  );
} 