'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader2, ArrowRight, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function PaymentCallbackPage() {
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [paymentData, setPaymentData] = useState<any>(null);

  useEffect(() => {
    // Get payment data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');
    const status = urlParams.get('status');

    if (status === 'success') {
      setPaymentStatus('success');
      // You can fetch payment details from your backend here
    } else if (status === 'failed') {
      setPaymentStatus('failed');
    } else {
      // Check payment status with your backend
      checkPaymentStatus(orderId);
    }
  }, []);

  const checkPaymentStatus = async (orderId: string | null) => {
    if (!orderId) {
      setPaymentStatus('failed');
      return;
    }

    try {
      const response = await fetch(`/api/payment/status?order_id=${orderId}`);
      const data = await response.json();
      
      if (data.success) {
        setPaymentStatus('success');
        setPaymentData(data.data);
      } else {
        setPaymentStatus('failed');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      setPaymentStatus('failed');
    }
  };

  const handleContinue = () => {
    if (paymentStatus === 'success') {
      router.push('/checkout/success');
    } else {
      router.push('/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Payment Status Icon */}
            <div className="flex justify-center">
              {paymentStatus === 'loading' && (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center"
                >
                  <Loader2 className="w-12 h-12 text-white" />
                </motion.div>
              )}
              
              {paymentStatus === 'success' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center"
                >
                  <CheckCircle className="w-12 h-12 text-white" />
                </motion.div>
              )}
              
              {paymentStatus === 'failed' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center"
                >
                  <XCircle className="w-12 h-12 text-white" />
                </motion.div>
              )}
            </div>

            {/* Payment Status Message */}
            <div className="space-y-4">
              {paymentStatus === 'loading' && (
                <>
                  <h1 className="text-4xl font-bold text-white">
                    Processing Payment...
                  </h1>
                  <p className="text-xl text-gray-300">
                    Please wait while we verify your payment with PhonePe.
                  </p>
                </>
              )}
              
              {paymentStatus === 'success' && (
                <>
                  <h1 className="text-4xl font-bold text-white">
                    Payment Successful!
                  </h1>
                  <p className="text-xl text-gray-300">
                    Your payment has been processed successfully. Your order is being prepared.
                  </p>
                  {paymentData && (
                    <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 mt-6">
                      <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                      <div className="space-y-2 text-left">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Order ID:</span>
                          <span className="text-white">{paymentData.order_id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Amount:</span>
                          <span className="text-white">₹{paymentData.order_amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Payment Method:</span>
                          <span className="text-white">Cashfree</span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
              
              {paymentStatus === 'failed' && (
                <>
                  <h1 className="text-4xl font-bold text-white">
                    Payment Failed
                  </h1>
                  <p className="text-xl text-gray-300">
                    We couldn't process your payment. Please try again or contact support.
                  </p>
                </>
              )}
            </div>

            {/* Action Buttons */}
            {paymentStatus !== 'loading' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleContinue}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    paymentStatus === 'success'
                      ? 'bg-green-600 text-white hover:bg-green-500'
                      : 'bg-blue-600 text-white hover:bg-blue-500'
                  }`}
                >
                  <span>
                    {paymentStatus === 'success' ? 'Continue to Order Details' : 'Try Again'}
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/')}
                  className="border border-gray-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Home className="w-5 h-5" />
                  <span>Back to Home</span>
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
