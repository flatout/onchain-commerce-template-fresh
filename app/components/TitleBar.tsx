'use client';

import Image from 'next/image';

export default function TitleBar() {
  return (
    <div className="w-full bg-red-800 py-0 flex flex-col items-center mt-0">
      <Image
        src="/carmania-logo.png"
        alt="CarMania Logo"
        width={120}
        height={23}
        className="mb-0"
        priority
      />
      <h1 className="text-base font-bold text-white italic tracking-widest m-0" style={{ fontFamily: "'Montserrat', Arial, Helvetica, sans-serif", fontStyle: 'italic', fontWeight: 700, letterSpacing: '0.1em' }}>
        CAR OF THE DAY
      </h1>
    </div>
  );
} 