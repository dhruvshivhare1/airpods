import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ContactPage() {
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
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
        <p className="text-gray-300 mb-8">We’re here to help. Reach us using the details below.</p>

        <div className="space-y-6 text-gray-300">
          <div>
            <div className="font-semibold text-white">Company</div>
            <div>GadgetGhar (Demo)</div>
          </div>
          <div>
            <div className="font-semibold text-white">Registered Address</div>
            <div>Chirag Delhi, New Delhi, India</div>
          </div>
          <div>
            <div className="font-semibold text-white">Email</div>
            <a href="mailto:support@gadgetghar.com" className="underline">support@gadgetghar.com</a>
          </div>
          <div>
            <div className="font-semibold text-white">Phone / WhatsApp</div>
            <a href="tel:+919455430498" className="underline">+91 94554 30498</a>
          </div>
          <div>
            <div className="font-semibold text-white">Support Hours</div>
            <div>Mon–Sat, 10:00–18:00 IST (response within 24–48 hours)</div>
          </div>
        </div>
      </div>
    </div>
  );
}




