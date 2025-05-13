'use client';

const MANIFOLD_URL = "https://app.manifold.xyz/c/man-driving-car";

export default function MiniAppPage() {
  const handleMint = async () => {
    window.location.href = MANIFOLD_URL;
  };

  return (
    <div className="flex flex-col bg-black text-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold">CAR OF THE DAY</h1>
        <button
          onClick={handleMint}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          MINT
        </button>
      </div>
      
      {/* Image Container */}
      <div className="flex-grow relative">
        <img 
          src={`${MANIFOLD_URL}/preview`}
          alt="Car of the Day"
          className="w-full h-full object-contain"
          style={{ maxHeight: 'calc(100vh - 200px)' }}
        />
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-between p-2 border-t border-gray-800">
        {/* Comment */}
        <button className="flex-1 text-center py-2 hover:bg-gray-800 rounded flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9c0 1.56.4 3.02 1.1 4.3L3 21l4.3-1.1c1.28.7 2.74 1.1 4.7 1.1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* Recast */}
        <button className="flex-1 text-center py-2 hover:bg-gray-800 rounded flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 3.5v6h6v-2h-2.7c1.3-1.3 3-2 4.7-2 3.5 0 6.5 3 6.5 6.5s-3 6.5-6.5 6.5c-2.5 0-4.8-1.5-5.8-3.8h-2.1c1.1 3.3 4.2 5.8 7.9 5.8 4.6 0 8.5-3.9 8.5-8.5s-3.8-8.5-8.4-8.5c-2.4 0-4.5 1-6.1 2.6v-2.6h-2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* Like */}
        <button className="flex-1 text-center py-2 hover:bg-gray-800 rounded flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
        
        {/* Menu */}
        <button className="flex-1 text-center py-2 hover:bg-gray-800 rounded flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>
        
        {/* Share */}
        <button className="flex-1 text-center py-2 hover:bg-gray-800 rounded flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Gallery Link */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleMint}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
        >
          CarMania Gallery
        </button>
      </div>
    </div>
  );
} 