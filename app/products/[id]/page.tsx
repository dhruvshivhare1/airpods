import Header from '@/components/Header';
import ProductDetailsClient from '@/components/ProductDetailsClient';

export async function generateStaticParams() {
  return [
    { id: 'airpods-pro-2' },
    { id: 'airpods-max' },
    { id: 'airpods-3' },
  ];
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = productData[params.id as keyof typeof productData];
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} - GadgetGhar`,
    description: product.description,
  };
}

const productData = {
  'airpods-pro-2': {
    id: 'airpods-pro-2',
    name: 'AirPods Pro (2nd generation)',
    price: 999,
    originalPrice: 22999,
    color: 'White',
    variant: 'pro' as const,
    rating: 5,
    reviews: 50,
    images: [
      '/imga.webp',
      '/img2a.webp',
      '/img3a.webp',
      '/img4a.webp',
      '/img5a.webp',
      '/img6a.webp',
      '/img7a.webp',
    ],
    description: 'Deliver the same design, features, and performance as premium brands—at a fraction of the price. Experience adaptive noise cancellation, transparency mode, and seamless connectivity across all your devices.',
    features: [
      'Adaptive ANC for Distraction-Free Listening',
      'Transparency + Live Audio',
      'Supports Android & iOS',
      'Latest Bluetooth 5.3',
      'Up to 16 Hours Playback (With Case)',
      'Wireless Charging Compatible',
      'Water & Sweat Resistant',
      'Siri Integration Enabled',
      'Automatic Ear Detection',
      'GPS Locator + Seamless iOS Popup',
      'Dual-Side Touch Sensors',
      'Custom Name Setting',
      '3 Sizes Ear Tips Included',
      'Battery Health Management',
      '6 Months Warranty',
    ],
    featureImages: {
      'hearing-health': '/img2a.webp',
      'voice-isolation': '/img3a.webp',
      'spatial-audio': '/img4a.webp',
      'whats-in-box': '/img5a.webp',
      'charging': '/img6a.webp',
      'earbuds-detail': '/img7a.webp',
    },
    specs: {
      'Device Compatibility': 'Supports Android & iOS',
      'Earbud Type': 'In-Ear',
      'Noise Cancellation (ANC)': 'Adaptive ANC for Distraction-Free Listening',
      'Transparency + Live Audio': 'Lets Outside Sound In When You Need It',
      'Charging Port': 'Type C',
      'Popup & GPS': 'Seamless iOS Popup + GPS Locator',
      'Dual-Side Sensors': 'Responsive Touch Sensors on Earbuds',
      'Wireless Charging': 'Compatible with Wireless Chargers',
      'Rename': 'Custom Name Setting',
      'Battery Life': 'Up to 16 Hours Playback (With Case)',
      'Voice Assistant': 'Siri Integration Enabled',
      'Water & Sweat Resistant': 'Yes – Suitable for Gym & Daily Use',
      'Bluetooth Version': 'Latest Bluetooth 5.3',
      'Automatic Ear Detection': 'Music Pauses When Removed from Ear',
      'Extra Ear Tips': '3 Sizes – Small (S), Medium (M), Large (L)',
      'Optimized Battery Charging': 'Battery Health Management Enabled',
      'Warranty': '6 Months Warranty (Excludes Physical & Water Damage)',
      'Package Include': 'Earbuds (Pods), Cable, User Manual, Free Protective Case',
    },
  },
  'airpods-max': {
    id: 'airpods-max',
    name: 'AirPods Max',
    price: 549,
    originalPrice: 579,
    color: 'Space Gray',
    variant: 'max' as const,
    rating: 4.6,
    reviews: 8901,
    images: [
      'https://images.pexels.com/photos/8534590/pexels-photo-8534590.jpeg',
      'https://images.pexels.com/photos/8534591/pexels-photo-8534591.jpeg',
    ],
    description: 'AirPods Max combine high-fidelity audio with industry-leading Active Noise Cancellation to deliver an unparalleled listening experience.',
    features: [
      'High-fidelity audio',
      'Active Noise Cancellation',
      'Transparency mode',
      'Spatial Audio',
      'Digital Crown',
      'Premium materials',
    ],
    specs: {
      'Battery Life': 'Up to 20 hours',
      'Charging': 'Lightning to USB-C Cable',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '384.8 grams',
      'Drivers': '40mm dynamic drivers',
      'Chip': 'Apple H1',
    },
  },
  'airpods-3': {
    id: 'airpods-3',
    name: 'AirPods (3rd generation)',
    price: 179,
    originalPrice: 199,
    color: 'White',
    variant: 'standard' as const,
    rating: 4.5,
    reviews: 15672,
    images: [
      'https://images.pexels.com/photos/8534592/pexels-photo-8534592.jpeg',
      'https://images.pexels.com/photos/8534594/pexels-photo-8534594.jpeg',
    ],
    description: 'AirPods (3rd generation) feature Spatial Audio, Adaptive EQ, and sweat and water resistance. Experience the perfect balance of comfort and performance.',
    features: [
      'Spatial Audio',
      'Adaptive EQ',
      'Sweat and water resistant (IPX4)',
      'Up to 6 hours listening time',
      'MagSafe Charging Case',
      'Custom high-excursion Apple driver',
    ],
    specs: {
      'Battery Life': 'Up to 6 hours (30 hours with case)',
      'Charging': 'Lightning to USB-C Cable, MagSafe',
      'Connectivity': 'Bluetooth 5.0',
      'Compatibility': 'iPhone, iPad, Mac, Apple Watch',
      'Water Resistance': 'IPX4',
      'Chip': 'Apple H1',
    },
  },
};

const reviews = [
  {
    id: 1,
    name: 'Priya Sharma',
    rating: 5,
    date: '2024-01-15',
    comment: 'Absolutely amazing sound quality! The noise cancellation is incredible and they fit perfectly. Best purchase I\'ve made this year!',
    verified: true,
    images: [
      'https://m.media-amazon.com/images/I/71LLNRF4a6L.jpg',
      'https://m.media-amazon.com/images/I/71UiPpwKk-L.jpg',
    ],
  },
  {
    id: 2,
    name: 'Arjun Patel',
    rating: 4,
    date: '2024-01-10',
    comment: 'Great headphones, love the spatial audio feature. Battery life is excellent too. Perfect for my daily commute.',
    verified: true,
    images: [
      'https://m.media-amazon.com/images/I/71XLfSjGZKL.jpg',
    ],
  },
  {
    id: 3,
    name: 'Kavya Reddy',
    rating: 5,
    date: '2024-01-08',
    comment: 'Perfect for working from home. The transparency mode is so useful for quick conversations. Highly recommend!',
    verified: false,
    images: [
      'https://m.media-amazon.com/images/I/61n-vhdW4NL.jpg',
      'https://m.media-amazon.com/images/I/71VUwV8o+BL.jpg',
    ],
  },
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = productData[params.id as keyof typeof productData];

  if (!product) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-20 text-center py-20">
          <h1 className="text-2xl font-bold text-white mb-4">Product not found</h1>
          <p className="text-gray-400 mb-6">The product you're looking for doesn't exist.</p>
          <a 
            href="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-500 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="pt-20">
        <ProductDetailsClient product={product} reviews={reviews} />
      </div>
    </div>
  );
}
