'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, X, Truck, Shield, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import { useCart } from '@/components/CartProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { items, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const shipping = total > 1000 ? 0 : 0; // Free shipping for orders over ₹1000
  const tax = 0; // Tax already included in item price
  const finalTotal = total; // Total already includes tax

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="w-32 h-32 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
              <div className="text-4xl">🛒</div>
            </div>
            <h1 className="text-3xl font-bold">Your cart is empty</h1>
            <p className="text-gray-400 text-lg">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold glow-button hover:bg-blue-500 transition-all duration-300"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      <div className="pt-20 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8"
        >
          Shopping Cart
        </motion.h1>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900/50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6 border border-gray-800 glass-effect"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg sm:rounded-xl flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base lg:text-lg truncate">{item.name}</h3>
                      <p className="text-gray-400 text-xs sm:text-sm">Color: {item.color}</p>
                      <p className="text-blue-400 font-semibold text-sm sm:text-base lg:text-lg">₹{item.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="flex items-center bg-gray-800 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 sm:p-2 hover:bg-gray-700 rounded-l-lg transition-colors"
                        >
                          <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <span className="px-2 sm:px-4 py-1 sm:py-2 min-w-[2rem] sm:min-w-[3rem] text-center text-xs sm:text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 sm:p-2 hover:bg-gray-700 rounded-r-lg transition-colors"
                        >
                          <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 sm:p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-gray-800 glass-effect space-y-3 sm:space-y-4"
            >
              <h2 className="text-lg sm:text-xl font-bold">Order Summary</h2>
              
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-gray-400">Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-800 pt-2 sm:pt-3 flex justify-between font-bold text-base sm:text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-2 sm:p-3 text-xs sm:text-sm">
                <p className="text-blue-400">
                  Shipping and final total will be calculated at checkout
                </p>
              </div>
            </motion.div>


            {/* Security Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Shield className="w-4 h-4 text-green-400" />
                <span>SSL Encrypted Checkout</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-400">
                <Truck className="w-4 h-4 text-blue-400" />
                <span>Free returns within 30 days</span>
              </div>
            </motion.div>

            {/* Checkout Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold glow-button hover:from-blue-500 hover:to-purple-500 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>

            <p className="text-xs text-gray-500 text-center">
              By placing your order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}