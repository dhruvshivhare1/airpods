'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import { ChevronRight, Star, Shield, Truck, Headphones } from 'lucide-react';

const products = [
  {
    id: 'airpods-pro-2',
    name: 'AirPods Pro (2nd generation)',
    price: 1499,
    image: '/imga.webp',
    color: 'White',
    description:
      'Deliver the same design, features, and performance as premium brands—at a fraction of the price. Experience adaptive noise cancellation, transparency mode, and seamless connectivity across all your devices.',
    rating: 5,
    reviews: 50,
    variant: 'pro' as const,
  },
];

const features = [
  {
    icon: Headphones,
    title: 'Premium Audio',
    description: 'Experience studio-quality sound with every note.'
  },
  {
    icon: Shield,
    title: '2-Year Warranty',
    description: 'Complete protection for your investment.'
  },
  {
    icon: Truck,
    title: 'Free Delivery',
    description: 'Free shipping on all orders over ₹1000.'
  },
  {
    icon: Star,
    title: 'Expert Support',
    description: '24/7 customer support from audio experts.'
  },
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'pro', name: 'AirPods Pro' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.variant === selectedCategory);

  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black z-0"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="gradient-text">AirPods Pro</span>
                <br />
                <span className="text-white">Reimagined</span>
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-lg mx-auto lg:mx-0">
                Experience audio like never before. Active Noise Cancellation, 
                Transparency mode, and Personalized Spatial Audio.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 justify-center sm:justify-start">
                <Link href="/products/airpods-pro-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base lg:text-lg glow-button hover:bg-blue-500 transition-all duration-300"
                  >
                    Shop Now
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ml-1 sm:ml-2 inline" />
                  </motion.button>
                </Link>
                
                <Link href="/products/airpods-pro-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-gray-600 text-white px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base lg:text-lg hover:bg-white/10 transition-all duration-300"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center mt-6 lg:mt-0"
            >
              <div className="relative w-full max-w-[200px] sm:max-w-xs md:max-w-sm lg:max-w-md">
                <Image
                  src="/img.png"
                  alt="GadgetGhar Products"
                  width={400}
                  height={400}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-12 lg:py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
              Why Choose <span className="gradient-text">GadgetGhar</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              Discover the features that make GadgetGhar the world's most trusted gadget store
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center space-y-2 sm:space-y-3 lg:space-y-4 p-3 sm:p-4 lg:p-6 glass-effect rounded-xl sm:rounded-2xl card-hover"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-600/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto">
                  <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-400" />
                </div>
                <h3 className="text-sm sm:text-base lg:text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm lg:text-base">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-8 sm:py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 sm:mb-8 lg:mb-12"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
              Our <span className="gradient-text">Collection</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto mb-4 sm:mb-6 lg:mb-8">
              Discover our premium AirPods Pro with cutting-edge technology
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1 sm:px-4 sm:py-2 lg:px-6 lg:py-2 rounded-full text-xs sm:text-sm lg:text-base transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="flex justify-center">
            <div className="max-w-xs sm:max-w-sm lg:max-w-md">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      {/* Footer */}
      <footer className="py-8 sm:py-12 lg:py-16 bg-gray-900/50 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center">
                <Image 
                  src="/Gadgetghar.png" 
                  alt="GadgetGhar" 
                  width={100} 
                  height={50}
                  className="w-24 h-8 sm:w-32 sm:h-10 lg:w-40 lg:h-12"
                />
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                Premium gadget experiences for everyone.
              </p>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-sm sm:text-base">Products</h4>
              <div className="space-y-1 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                <div>AirPods Pro (2nd gen)</div>
                <div>Accessories</div>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-sm sm:text-base">Support</h4>
              <div className="space-y-1 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                <a href="/contact" className="hover:text-white transition-colors block">Contact Us</a>
                <a href="/returns" className="hover:text-white transition-colors block">Returns & Exchanges</a>
                <a href="/refunds" className="hover:text-white transition-colors block">Refunds & Cancellations</a>
                <a href="/terms" className="hover:text-white transition-colors block">Terms & Conditions</a>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-sm sm:text-base">Company</h4>
              <div className="space-y-1 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
                <a href="/about" className="hover:text-white transition-colors block">About Us</a>
                <a href="/privacy" className="hover:text-white transition-colors block">Privacy Policy</a>
                <a href="/contact" className="hover:text-white transition-colors block">Support</a>
                <a href="/terms" className="hover:text-white transition-colors block">Legal</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-6 sm:mt-8 lg:mt-12 pt-4 sm:pt-6 lg:pt-8 text-center text-gray-400 text-xs sm:text-sm">
            <p>&copy; 2025 GadgetGhar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}