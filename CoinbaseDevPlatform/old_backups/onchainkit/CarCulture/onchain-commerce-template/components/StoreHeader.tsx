import Image from 'next/image';
import Link from 'next/link';

export function StoreHeader() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">CarCulture</span>
            <span className="text-xl text-blue-600">|</span>
            <span className="text-xl text-gray-700">CarMania NFTs</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/collection" className="text-gray-600 hover:text-gray-900">
              Collection
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link href="https://farcaster.xyz/@CarCulture" className="text-gray-600 hover:text-gray-900">
              Farcaster
            </Link>
            <Link href="https://x.com/CarCulture" className="text-gray-600 hover:text-gray-900">
              X
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 