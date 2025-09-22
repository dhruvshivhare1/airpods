'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useCart } from './CartProvider';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const menuItems = [
    { name: 'Store', href: '/' },
    { name: 'AirPods Pro', href: '/products/airpods-pro-2' },
    { name: 'About', href: '/about' },
    { name: 'Support', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14 lg:h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/Gadgetghar.png" 
                alt="GadgetGhar" 
                width={100} 
                height={50}
                className="w-24 h-8 sm:w-32 sm:h-10 lg:w-40 lg:h-12"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm lg:text-base"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors duration-200"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <Link
              href="/cart"
              className="relative p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors duration-200 inline-flex items-center justify-center align-middle"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs leading-none">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 hover:bg-white/10 rounded-full transition-colors duration-200 inline-flex items-center justify-center"
            >
              {isMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-800 py-4"
            >
              <input
                type="text"
                placeholder="Search Gadgets..."
                className="w-full bg-gray-900 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-800 py-3 sm:py-4 space-y-3 sm:space-y-4"
            >
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}