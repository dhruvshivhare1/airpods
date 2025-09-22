'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Eye, Zap } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart, Product } from './CartProvider';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product & {
    description: string;
    rating: number;
    reviews: number;
    variant: 'pro' | 'max' | 'standard';
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    router.push(`/products/${product.id}`);
  };

  const handleCardClick = () => {
    router.push(`/products/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group bg-gray-900/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-gray-800 card-hover glass-effect cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="relative h-40 sm:h-56 lg:h-72 mb-3 sm:mb-4 lg:mb-6 overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-gray-800 to-gray-900">
        <Image
          src={product.image || '/imga.webp'}
          alt={product.name}
          fill
          className="object-contain"
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2 sm:space-x-3">
            <Link href={`/products/${product.id}`} onClick={(e) => e.stopPropagation()}>
              <button className="p-2 sm:p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
              </button>
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              className="p-2 sm:p-3 bg-blue-600/80 backdrop-blur-sm rounded-full hover:bg-blue-600 transition-colors"
            >
              <ShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2 sm:space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-sm sm:text-base lg:text-xl font-semibold group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
          <span className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-400">
            ₹{product.price}
          </span>
        </div>
        
        <p className="text-gray-400 text-xs sm:text-sm line-clamp-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xs sm:text-sm ${
                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
          
          <span className="text-xs text-gray-500 px-1 sm:px-2 py-1 bg-gray-800 rounded-full">
            {product.color}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            handleBuyNow();
          }}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium glow-button hover:from-green-500 hover:to-emerald-500 transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm lg:text-base"
        >
          <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
          Buy Now
        </motion.button>
      </div>
    </motion.div>
  );
}