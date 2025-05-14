'use client';

import Image from 'next/image';

export default function TitleBar() {
  return (
    <div className="flex flex-col items-center">
      {/* CarMania Logo at the top, centered */}
      <div className="py-4">
        <Image
          src="/CarMania-logo.png"
          alt="CarMania Logo"
          width={351}
          height={117}
          className="object-contain mx-auto"
          priority
        />
      </div>

      {/* Red Bar with Title */}
      <div className="w-full bg-[#8B0000] text-white mt-0">
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