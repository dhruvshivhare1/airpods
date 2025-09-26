'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Loader2 } from 'lucide-react';

interface CashfreePaymentProps {
  amount: number;
  orderId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  onSuccess: (paymentData: any) => void;
  onFailure: (error: any) => void;
}

export default function CashfreePayment({ 
  amount, 
  orderId, 
  customerInfo, 
  onSuccess, 
  onFailure 
}: CashfreePaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const initiateCashfreePayment = async () => {
    setIsProcessing(true);
    
    try {
      // Cashfree API configuration
      const cashfreeConfig = {
        orderId: orderId,
        orderAmount: amount,
        orderCurrency: 'INR',
        customerDetails: {
          customerId: customerInfo.phone,
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerPhone: customerInfo.phone
        },
        orderMeta: {
          returnUrl: `${window.location.origin}/payment/callback?order_id=${orderId}`,
          notifyUrl: `${window.location.origin}/api/payment/callback`
        }
      };

      // Create payment request
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cashfreeConfig),
      });

      const data = await response.json();

      if (data.success && data.paymentSessionId) {
        // Load Cashfree SDK and initiate payment
        const script = document.createElement('script');
        script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
        script.onload = () => {
          const cashfree = (window as any).Cashfree({
            mode: 'PRODUCTION' // Always use production mode since you have production credentials
          });
          
          cashfree.checkout({
            paymentSessionId: data.paymentSessionId,
            returnUrl: `${window.location.origin}/payment/callback?order_id=${orderId}`
          });
        };
        document.head.appendChild(script);
      } else {
        throw new Error(data.message || 'Payment initiation failed');
      }
    } catch (error) {
      console.error('Cashfree payment error:', error);
      onFailure(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/30 rounded-xl p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-blue-400 font-semibold">Cashfree Payment</h3>
            <p className="text-blue-300 text-sm">Secure & Fast Online Payments</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span className="text-gray-300">UPI, Cards, Net Banking, Wallets</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span className="text-gray-300">Instant Payment Confirmation</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✓</span>
            <span className="text-gray-300">100% Secure & PCI Compliant</span>
          </div>
        </div>
      </div>

      <motion.button
        onClick={initiateCashfreePayment}
        disabled={isProcessing}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            <span>Pay with Cashfree - ₹{amount.toFixed(2)}</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
