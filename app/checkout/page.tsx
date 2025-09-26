'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowLeft, Truck, Shield, Check, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { useCart, CartItem } from '@/components/CartProvider';

export default function CheckoutPage() {
  const router = useRouter();
  const { items: cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'IN',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // Save order to Google Sheet via SheetDB
  const saveOrderToSheet = async (params: {
    paymentMethod: 'cod';
    subtotal: number;
    shipping: number;
    total: number;
    status: 'pending';
  }, showToast: boolean = true) => {
    const endpoint = process.env.NEXT_PUBLIC_SHEETDB_URL;
    if (!endpoint) {
      console.warn('Missing NEXT_PUBLIC_SHEETDB_URL for SheetDB integration');
      return;
    }
    try {
      const itemsSummary = cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        color: item.color,
      }));

      const body = {
        data: {
          timestamp: new Date().toISOString(),
          payment_method: params.paymentMethod,
          status: params.status,
          subtotal: params.subtotal,
          shipping: params.shipping,
          total: params.total,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zip: formData.zipCode,
          country: formData.country,
          items_json: JSON.stringify(itemsSummary),
        },
      } as const;

      let attempt = 0;
      const maxAttempts = 3;
      let lastError: any = null;
      if (showToast) toast.loading('Saving order details...', { id: 'sheetdb' });
      while (attempt < maxAttempts) {
        try {
          const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
          if (!res.ok) throw new Error(`SheetDB HTTP ${res.status}`);
          if (showToast) toast.success('Order details saved', { id: 'sheetdb' });
          lastError = null;
          break;
        } catch (err) {
          lastError = err;
          attempt++;
          if (attempt < maxAttempts) {
            await new Promise((r) => setTimeout(r, 400 * Math.pow(2, attempt - 1)));
          }
        }
      }
      if (lastError && showToast) toast.error('Could not save order details', { id: 'sheetdb' });
    } catch (err) {
      console.error('Failed to save order to SheetDB', err);
      if (showToast) toast.error('Could not save order details', { id: 'sheetdb' });
    }
  };

  const subtotal = 1399; // Base price (prepaid price including tax)
  const shipping = paymentMethod === 'cod' ? 100 : 0; // Shipping added only for COD
  const tax = 0; // Tax already included in item price
  const total = subtotal + shipping; // Final price

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart and redirect to success page
    clearCart();
    router.push('/checkout/success');
  };

  const handleWhatsAppOrder = () => {
    const orderItems = cart.map(item => `${item.quantity}x ${item.name}`).join(', ');
    const codTotal = 1499; // Cash on delivery total
    const message = `Hi! I'd like to place a cash on delivery order:

Order Details:
${orderItems}

Subtotal: ₹1,399
Shipping: ₹100
Total Amount: ₹${codTotal}

Customer Details:
Name: ${formData.firstName} ${formData.lastName}
Phone: ${formData.phone}
Email: ${formData.email}
Address: ${formData.address}, ${formData.city}, ${formData.zipCode}

Please arrange cash on delivery. Thank you!`;
    
    // Fire-and-forget save to SheetDB
    saveOrderToSheet({ paymentMethod: 'cod', subtotal, shipping, total, status: 'pending' });

    const whatsappUrl = `https://wa.me/919455430498?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };


  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-20 text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-500 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="pt-20">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-400 hover:text-white transition-colors mb-4 sm:mb-6 lg:mb-8"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            <span className="text-sm sm:text-base">Back to Shopping</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {/* Checkout Form */}
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Checkout</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="bg-gray-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-800">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-gray-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-800">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Shipping Address</h2>
                  <div className="space-y-3 sm:space-y-4">
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-800 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                      />
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="ZIP Code"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-800 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                      />
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-800 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none text-sm sm:text-base"
                      >
                        <option value="IN">India</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Payment Method - COD Only */}
                <div className="bg-gray-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-800">
                  <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Payment Method</h2>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    <span className="text-sm sm:text-base text-green-300">Cash on Delivery</span>
                  </div>
                </div>

                {/* WhatsApp COD Button */}
                <div className="space-y-3">
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4">
                    <div className="text-blue-300 text-sm space-y-2 text-center">
                      <p>💬 Click the button below to place your order via WhatsApp. Our team will confirm your order and arrange cash on delivery.</p>
                      <p className="text-yellow-300">Note: You will have to pay a small security amount in advance (delivery charges ₹200) to confirm COD.</p>
                    </div>
                  </div>
                  <motion.button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-400 hover:to-green-500 transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp - Cash on Delivery - ₹{total}</span>
                  </motion.button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Order Summary</h2>
              
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <div className="space-y-4">
                  {cart.map((item: CartItem) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-gray-400 text-sm">{item.color}</p>
                        <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-800 pt-4 mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shipping}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold border-t border-gray-800 pt-2">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                  {paymentMethod === 'cod' && (
                    <div className="text-xs text-yellow-300 pt-1">Security amount (delivery charges ₹200) is collected in advance for COD orders.</div>
                  )}
                </div>
              </div>

              {/* Security Badges */}
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-semibold mb-4">Secure Checkout</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    <span className="text-sm">SSL Encrypted</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-sm">Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
