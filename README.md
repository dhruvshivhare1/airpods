# GadgetGhar - AirPods Pro Store

A modern e-commerce website for AirPods Pro built with Next.js 13, featuring a sleek design and integrated payment processing.

## Features

- 🎧 **Product Showcase**: Beautiful product display with image carousel
- 🛒 **Shopping Cart**: Add to cart functionality with quantity management
- 💳 **Payment Integration**: Cashfree payment gateway for secure transactions
- 📱 **Mobile Responsive**: Optimized for all device sizes
- 🚚 **Cash on Delivery**: WhatsApp-based COD ordering system
- 📊 **Order Tracking**: Google Sheets integration for order management
- 🎬 **Product Videos**: Click-to-play product demonstration videos

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Payments**: Cashfree
- **Database**: Google Sheets (via SheetDB)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/airpods-store.git
cd airpods-store
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your environment variables to `.env.local`:
```env
NEXT_PUBLIC_SHEETDB_URL=your_sheetdb_api_url
CASHFREE_APP_ID=your_cashfree_app_id
CASHFREE_SECRET_KEY=your_cashfree_secret_key
CASHFREE_ENVIRONMENT=sandbox
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SHEETDB_URL` | SheetDB API URL for Google Sheets integration | Yes |
| `CASHFREE_APP_ID` | Cashfree App ID | Yes |
| `CASHFREE_SECRET_KEY` | Cashfree Secret Key | Yes |
| `CASHFREE_ENVIRONMENT` | Cashfree Environment (sandbox/production) | Yes |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Manual Deployment

```bash
npm run build
npm start
```

## Project Structure

```
├── app/                    # Next.js 13 app directory
│   ├── api/               # API routes
│   ├── checkout/          # Checkout pages
│   ├── products/          # Product pages
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── CashfreePayment.tsx
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   └── ProductDetailsClient.tsx
├── public/               # Static assets
└── lib/                  # Utility functions
```

## Features Overview

### Homepage
- Hero section with product showcase
- Feature highlights
- Product grid with filtering

### Product Pages
- Detailed product information
- Image gallery with thumbnails
- Product videos
- Add to cart functionality

### Checkout
- Form validation
- Payment method selection
- Order summary
- Google Sheets integration

### Cart
- Item management
- Quantity updates
- Price calculations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@gadgetghar.com or call +91 94554 30498
