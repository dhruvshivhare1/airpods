import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p>Welcome to GadgetGhar. By placing an order on our website, you agree to the terms below.</p>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Products & Pricing (INR)</h2>
            <p>All prices are listed in Indian Rupees (₹). Taxes and shipping, if applicable, are shown at checkout.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Payments</h2>
            <p>Payments are processed securely via Cashfree Payment Gateway. Orders are confirmed upon successful payment authorization.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Shipping & Delivery</h2>
            <p>Delivery timelines are estimates and may vary based on location and courier constraints.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Returns & Refunds</h2>
            <p>Please refer to our Refunds & Cancellations policy for eligibility, timelines, and the process.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, our liability is limited to the amount paid for the product.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Governing Law</h2>
            <p>These terms are governed by the laws of India. Jurisdiction: Bengaluru, Karnataka.</p>
          </div>
          <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
        </div>
      </div>
    </div>
  );
}




