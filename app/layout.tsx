import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { CartProvider } from '@/components/CartProvider';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GadgetGhar - Premium Wireless Audio',
  description: 'Discover the latest gadgets collection with immersive 3D experience',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <CartProvider>
          {children}
          <footer className="py-10 border-t border-gray-800 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-4">
                  <Image 
                    src="/Gadgetghar.png" 
                    alt="GadgetGhar" 
                    width={100} 
                    height={50}
                    className="w-40 h-12"
                  />
                  <div className="text-center lg:text-left">© 2025 GadgetGhar. All prices shown in INR.</div>
                </div>
                <nav className="flex flex-wrap items-center justify-center gap-4 lg:gap-6">
                  <a href="/about" className="hover:text-white transition-colors">About</a>
                  <a href="/contact" className="hover:text-white transition-colors">Contact</a>
                  <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
                  <a href="/terms" className="hover:text-white transition-colors">Terms</a>
                  <a href="/refunds" className="hover:text-white transition-colors">Refunds</a>
                  <a href="/returns" className="hover:text-white transition-colors">Returns</a>
                </nav>
              </div>
            </div>
          </footer>
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#fff',
                border: '1px solid #333',
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}