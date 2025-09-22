import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function AboutPage() {
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
        <h1 className="text-4xl font-bold mb-8">About GadgetGhar</h1>
        
        <div className="space-y-8 text-gray-300 leading-relaxed">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Our Story</h2>
            <p>
              GadgetGhar was founded with a simple mission: to bring the latest and greatest gadgets 
              to tech enthusiasts across India. We believe that technology should be accessible, 
              reliable, and enhance your daily life.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">What We Do</h2>
            <p>
              We specialize in premium audio devices, starting with the iconic AirPods Pro. 
              Our carefully curated selection focuses on quality, innovation, and user experience. 
              Every product we offer is tested and verified to meet our high standards.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Our Values</h2>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Quality First:</strong> We only sell products that meet our strict quality standards</li>
              <li><strong>Customer Satisfaction:</strong> Your happiness is our priority</li>
              <li><strong>Innovation:</strong> We stay ahead of the curve with the latest technology</li>
              <li><strong>Transparency:</strong> Honest pricing and clear communication</li>
              <li><strong>Support:</strong> Comprehensive after-sales service and support</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Why Choose Us</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-2">Authentic Products</h3>
                <p>100% genuine products with manufacturer warranty</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-2">Fast Delivery</h3>
                <p>Quick and secure shipping across India</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-2">Expert Support</h3>
                <p>Knowledgeable team to help with your needs</p>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-2">Easy Returns</h3>
                <p>Hassle-free return and exchange policy</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
            <div className="bg-gray-900/50 p-6 rounded-xl">
              <p><strong>Email:</strong> support@gadgetghar.com</p>
              <p><strong>Phone:</strong> +91 94554 30498</p>
              <p><strong>Address:</strong> Chirag Delhi, New Delhi, India</p>
              <p><strong>Business Hours:</strong> Mon-Sat, 10:00 AM - 6:00 PM IST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
