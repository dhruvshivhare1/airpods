import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
        <h1 className="text-4xl font-bold mb-8">Returns & Exchanges</h1>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Return Policy</h2>
            <p>
              We want you to be completely satisfied with your purchase. If you're not happy with 
              your AirPods Pro, you can return them within 7 days of delivery for a full refund.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Eligibility Requirements</h2>
            <p>To be eligible for a return, your item must:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Be in original, unopened packaging</li>
              <li>Include all original accessories and documentation</li>
              <li>Be in the same condition as when you received it</li>
              <li>Be returned within 7 days of delivery</li>
              <li>Not be damaged due to misuse or negligence</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">How to Return</h2>
            <div className="space-y-4">
              <div className="bg-gray-900/50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-2">Step 1: Contact Us</h3>
                <p>
                  Email us at <a href="mailto:returns@gadgetghar.com" className="text-blue-400 underline">returns@gadgetghar.com</a> 
                  or call <a href="tel:+919455430498" className="text-blue-400 underline">+91 94554 30498</a> with your order number and reason for return.
                </p>
              </div>
              
              <div className="bg-gray-900/50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-2">Step 2: Get Return Authorization</h3>
                <p>We'll provide you with a Return Merchandise Authorization (RMA) number and return instructions.</p>
              </div>
              
              <div className="bg-gray-900/50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-2">Step 3: Package & Ship</h3>
                <p>Package the item securely with the RMA number and ship it back to us using a trackable method.</p>
              </div>
              
              <div className="bg-gray-900/50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-2">Step 4: Receive Refund</h3>
                <p>Once we receive and inspect your return, we'll process your refund within 3-5 business days.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Exchange Policy</h2>
            <p>
              If you need to exchange your AirPods Pro for a different color or if there's a defect, 
              we'll be happy to help. Exchange requests must be made within 7 days of delivery.
            </p>
            <p className="mt-2">
              <strong>Note:</strong> We currently only offer AirPods Pro in White. If you need a different 
              product, please return your current order and place a new one.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Refund Timeline</h2>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
              <ul className="space-y-2">
                <li><strong>Processing Time:</strong> 3-5 business days after we receive your return</li>
                <li><strong>Bank Transfer:</strong> 5-7 business days to reflect in your account</li>
                <li><strong>Credit Card:</strong> 3-5 business days to appear on your statement</li>
                <li><strong>UPI/Wallet:</strong> 1-2 business days</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Non-Returnable Items</h2>
            <p>The following items cannot be returned:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Items damaged due to misuse or negligence</li>
              <li>Items without original packaging or accessories</li>
              <li>Items returned after 7 days</li>
              <li>Items that have been used extensively</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Return Shipping</h2>
            <p>
              Return shipping costs are the responsibility of the customer unless the return is due to 
              our error or a defective product. We recommend using a trackable shipping method for your protection.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p>For any questions about returns or exchanges:</p>
            <div className="bg-gray-900/50 p-4 rounded-xl mt-4">
              <p><strong>Email:</strong> returns@gadgetghar.com</p>
              <p><strong>Phone:</strong> +91 94554 30498</p>
              <p><strong>Hours:</strong> Mon-Sat, 10:00 AM - 6:00 PM IST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
