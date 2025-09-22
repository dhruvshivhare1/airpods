import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RefundsPage() {
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
        <h1 className="text-3xl font-bold mb-6">Refunds & Cancellations</h1>
        <div className="space-y-6 text-gray-300 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Eligibility</h2>
            <p>Requests must be raised within 7 days of delivery. Items should be unused, in original packaging, and include all accessories.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Process</h2>
            <p>To initiate a return or cancellation, email <a href="mailto:support@gadgetghar.com" className="underline">support@gadgetghar.com</a> or call <a href="tel:+919455430498" className="underline">+91 94554 30498</a> with your order ID and reason.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Refund Timelines</h2>
            <p>Refunds are initiated within 3–5 business days after approval and may take 5–7 additional business days to reflect in your account.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Non‑Refundable</h2>
            <p>Used items, damaged items due to misuse, and items without original packaging are not eligible.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Cancellations</h2>
            <p>Orders can be cancelled before dispatch for a full refund. Post‑dispatch, please raise a return request.</p>
          </div>
          <p className="text-sm text-gray-400">Last updated: {new Date().toLocaleDateString('en-IN')}</p>
        </div>
      </div>
    </div>
  );
}




