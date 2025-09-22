'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Share2, Zap, MessageCircle, Truck, Shield, RotateCcw, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AirPodsModel from '@/components/AirPodsModel';
import { useCart } from '@/components/CartProvider';
import toast from 'react-hot-toast';

interface ProductDetailsClientProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    color: string;
    variant: 'pro' | 'max' | 'standard';
    rating: number;
    reviews: number;
    images: string[];
    description: string;
    features: string[];
    featureImages?: Record<string, string>;
    specs: Record<string, string>;
  };
  reviews: Array<{
    id: number;
    name: string;
    rating: number;
    date: string;
    comment: string;
    verified: boolean;
    images?: string[];
  }>;
}

export default function ProductDetailsClient({ product, reviews }: ProductDetailsClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState('features');
  const { addToCart } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: 1399, // Prepaid price including tax
        image: product.images[0],
        color: product.color,
      });
    }
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    // Add to cart first
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: 1399, // Prepaid price including tax
        image: product.images[0],
        color: product.color,
      });
    }
    // Navigate to checkout
    router.push('/checkout');
  };

  const handleWhatsAppOrder = () => {
    const totalPrice = 1399 * quantity; // Prepaid price including tax
    const message = `Hi! I'd like to order ${quantity}x ${product.name} for ₹${totalPrice} (including tax). Please arrange cash on delivery.`;
    const whatsappUrl = `https://wa.me/919455430498?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Keyboard navigation for image slider
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.images.length - 1);
      } else if (e.key === 'ArrowRight') {
        setSelectedImage(selectedImage < product.images.length - 1 ? selectedImage + 1 : 0);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, product.images.length]);

  const guarantees = [
    { icon: Truck, title: 'Free Delivery', description: 'Free shipping on orders over ₹1000' },
    { icon: RotateCcw, title: '30-Day Returns', description: 'Easy returns within 30 days' },
    { icon: Shield, title: '2-Year Warranty', description: 'Comprehensive coverage included' },
    { icon: Award, title: 'Authentic Product', description: '100% genuine Apple products' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        {/* Product Images Slider */}
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {/* Main Image Display with Navigation */}
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 h-48 sm:h-64 lg:h-96 overflow-hidden">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <img
                src={product.images[selectedImage]}
                alt={`${product.name} ${selectedImage + 1}`}
                className="w-full h-full object-contain"
              />
            </motion.div>
            
            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.images.length - 1)}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 sm:p-2 rounded-full transition-all duration-200 z-10"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedImage(selectedImage < product.images.length - 1 ? selectedImage + 1 : 0)}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 sm:p-2 rounded-full transition-all duration-200 z-10"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image Indicators (hidden on mobile) */}
            {product.images.length > 1 && (
              <div className="hidden sm:flex absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 space-x-1 sm:space-x-2">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-all duration-200 ${
                      selectedImage === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((image, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`flex-shrink-0 cursor-pointer transition-all duration-300 ${
                  selectedImage === index 
                    ? 'ring-2 ring-blue-500 rounded-lg shadow-lg' 
                    : 'hover:opacity-80 hover:ring-1 hover:ring-gray-400 rounded-lg'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative">
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-cover rounded-lg bg-gray-800"
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-blue-500/20 rounded-lg" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop video under gallery (small) */}
        <div className="hidden lg:block">
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 inline-block">
            <div className="relative w-full max-w-[220px]">
              <video
                id="product-video-desktop"
                className="w-full h-auto rounded-lg"
                src="/m.mp4"
                preload="auto"
                playsInline
                controls={isVideoPlaying}
                onPlay={() => setIsVideoPlaying(true)}
              />
              {!isVideoPlaying && (
                <button
                  aria-label="Play product video"
                  onClick={() => {
                    const el = document.getElementById('product-video-desktop') as HTMLVideoElement | null;
                    if (el) {
                      el.play();
                    }
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg">▶</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-4 sm:space-y-5 lg:space-y-6">
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-1 sm:ml-2 text-gray-400 text-xs sm:text-sm">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center space-x-2 sm:space-x-4 flex-wrap">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm sm:text-lg lg:text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="bg-green-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                  Save ₹{product.originalPrice - product.price}
                </span>
              )}
            </div>
            
            {/* Tax Information */}
            <div className="text-xs sm:text-sm text-gray-400">
              <span>+ Tax: ₹75</span>
              <span className="ml-2 sm:ml-4">Total: ₹{product.price + 75}</span>
            </div>
            
            {/* Prepaid Discount Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 sm:p-3 rounded-lg">
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span className="font-semibold text-xs sm:text-sm lg:text-base">Prepaid Orders: ₹1,399 (including tax)</span>
              </div>
            </div>

            {/* Mobile/tablet video after pricing (extra small) */}
            <div className="lg:hidden">
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-3 inline-block">
                <div className="relative w-full max-w-[160px] mx-auto">
                  <video
                    id="product-video-mobile"
                    className="w-full h-auto rounded-lg"
                    src="/m.mp4"
                    preload="auto"
                    playsInline
                    controls={isVideoPlaying}
                    onPlay={() => setIsVideoPlaying(true)}
                  />
                  {!isVideoPlaying && (
                    <button
                      aria-label="Play product video"
                      onClick={() => {
                        const el = document.getElementById('product-video-mobile') as HTMLVideoElement | null;
                        if (el) {
                          el.play();
                        }
                      }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg text-sm">▶</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Quantity & Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-medium">Quantity:</span>
              <div className="flex items-center bg-gray-800 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-700 rounded-l-lg"
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-700 rounded-r-lg"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-3 flex-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold glow-button hover:from-green-500 hover:to-emerald-500 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>Buy Now</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWhatsAppOrder}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-400 hover:to-green-500 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp - Cash on Delivery</span>
              </motion.button>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex-1 p-3 rounded-xl border transition-all duration-300 ${
                    isWishlisted
                      ? 'bg-red-600 border-red-600 text-white'
                      : 'border-gray-600 hover:border-red-600 text-gray-400 hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 mx-auto ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                
                <button className="flex-1 p-3 rounded-xl border border-gray-600 hover:border-blue-600 text-gray-400 hover:text-blue-400 transition-all duration-300">
                  <Share2 className="w-5 h-5 mx-auto" />
                </button>
              </div>
            </div>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-800">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <guarantee.icon className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <div className="font-medium text-sm">{guarantee.title}</div>
                  <div className="text-xs text-gray-400">{guarantee.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="border-b border-gray-800">
          <nav className="flex space-x-8">
            <button 
              onClick={() => setActiveTab('features')}
              className={`py-4 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'features' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Features
            </button>
            <button 
              onClick={() => setActiveTab('specifications')}
              className={`py-4 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'specifications' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Specifications
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-1 border-b-2 font-medium transition-colors ${
                activeTab === 'reviews' 
                  ? 'border-blue-500 text-blue-400' 
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Reviews
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'features' && (
          <div className="py-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-900/50 p-6 rounded-xl border border-gray-800"
                >
                  <h3 className="font-semibold text-lg mb-2">{feature}</h3>
                  <p className="text-gray-400 text-sm">
                    Experience premium quality and innovative technology.
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Feature Images Section */}
            {product.featureImages && (
              <div className="mt-12 space-y-16">
                {/* Advanced Hearing Health Features */}
                {product.featureImages['hearing-health'] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                  >
                    <h3 className="text-2xl font-bold mb-6">Advanced hearing health features</h3>
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8">
                      <img
                        src={product.featureImages['hearing-health']}
                        alt="Advanced hearing health features"
                        className="w-full max-w-2xl mx-auto rounded-xl"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Voice Isolation */}
                {product.featureImages['voice-isolation'] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center"
                  >
                    <h3 className="text-2xl font-bold mb-6">Clearer calls with Voice Isolation</h3>
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8">
                      <img
                        src={product.featureImages['voice-isolation']}
                        alt="Clearer calls with Voice Isolation"
                        className="w-full max-w-2xl mx-auto rounded-xl"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Personalized Spatial Audio */}
                {product.featureImages['spatial-audio'] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center"
                  >
                    <h3 className="text-2xl font-bold mb-6">Personalised Spatial Audio</h3>
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8">
                      <img
                        src={product.featureImages['spatial-audio']}
                        alt="Personalised Spatial Audio"
                        className="w-full max-w-2xl mx-auto rounded-xl"
                      />
                    </div>
                  </motion.div>
                )}

                {/* What's in the Box */}
                {product.featureImages['whats-in-box'] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center"
                  >
                    <h3 className="text-2xl font-bold mb-6">What's in the Box</h3>
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8">
                      <img
                        src={product.featureImages['whats-in-box']}
                        alt="What's in the Box"
                        className="w-full max-w-2xl mx-auto rounded-xl"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Charging Details */}
                {product.featureImages['charging'] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center"
                  >
                    <h3 className="text-2xl font-bold mb-6">MagSafe Charging</h3>
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8">
                      <img
                        src={product.featureImages['charging']}
                        alt="MagSafe Charging"
                        className="w-full max-w-2xl mx-auto rounded-xl"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Earbuds Detail */}
                {product.featureImages['earbuds-detail'] && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="text-center"
                  >
                    <h3 className="text-2xl font-bold mb-6">Precision Crafted Design</h3>
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8">
                      <img
                        src={product.featureImages['earbuds-detail']}
                        alt="Precision Crafted Design"
                        className="w-full max-w-2xl mx-auto rounded-xl"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="py-8">
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(product.specs).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-gray-900/50 p-6 rounded-xl border border-gray-800"
                >
                  <h3 className="font-semibold text-lg mb-2 text-blue-400">{key}</h3>
                  <p className="text-gray-300">{value}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="py-8">
            <div className="space-y-6">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-900/50 p-6 rounded-xl border border-gray-800"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold">{review.name}</h3>
                        {review.verified && (
                          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-400 text-sm">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300">{review.comment}</p>
                  
                  {/* Review Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {review.images.map((image, index) => (
                          <motion.img
                            key={index}
                            src={image}
                            alt={`Review image ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                            whileHover={{ scale: 1.05 }}
                            onClick={() => window.open(image, '_blank')}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}