'use client';

import Image from 'next/image';

export default function TitleBar() {
  return (
    <div className="flex flex-col items-center">
      {/* Car Culture Logo at the top, centered, 10% smaller, with margin from top */}
      <div className="py-2 mt-8">
        <Image
          src="/carculture-wing-logo.png"
          alt="Car Culture Logo"
          width={190}
          height={63}
          className="object-contain mx-auto"
          priority
        />
      </div>

      {/* Red Bar with Title */}
      <div className="w-full bg-[#8B0000] text-white mt-[5vh]">
        <div className="max-w-[1440px] mx-auto px-8 py-8 flex justify-center">
          <h1 className="text-4xl font-bold italic text-white" style={{ 
            fontFamily: "'Permanent Marker', 'Arial Black', 'Helvetica Black', 'Arial', 'sans-serif'",
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontStyle: 'oblique'
          }}>
            Car of the Day
          </h1>
        </div>
      </div>
    </div>
  );
} 