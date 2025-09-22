# Deployment Guide

## GitHub Setup

1. **Create a new repository on GitHub**
   - Repository name: `gadgetghar-airpods` (or your preferred name)
   - Make it public or private as needed
   - Don't initialize with README (we already have one)

2. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AirPods Pro e-commerce store"
   git branch -M main
   git remote add origin https://github.com/yourusername/gadgetghar-airpods.git
   git push -u origin main
   ```

## Vercel Deployment

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Environment Variables**
   In Vercel dashboard, go to Project Settings → Environment Variables and add:
   
   ```
   NEXT_PUBLIC_SHEETDB_URL = your_sheetdb_api_url
   CASHFREE_APP_ID = your_cashfree_app_id
   CASHFREE_SECRET_KEY = your_cashfree_secret_key
   CASHFREE_ENVIRONMENT = sandbox
   NEXT_PUBLIC_BASE_URL = https://your-project.vercel.app
   ```

3. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at `https://your-project.vercel.app`

## Required Services Setup

### 1. Google Sheets + SheetDB
1. Create a Google Sheet with these headers:
   - timestamp, payment_method, status, subtotal, shipping, total
   - first_name, last_name, email, phone, address, city, zip, country
   - items_json

2. Go to [sheetdb.io](https://sheetdb.io)
3. Create API for your Google Sheet
4. Copy the API URL to `NEXT_PUBLIC_SHEETDB_URL`

### 2. Cashfree Payment Gateway
1. Sign up at [cashfree.com](https://cashfree.com)
2. Get your App ID and Secret Key
3. Add them to environment variables
4. For production, change `CASHFREE_ENVIRONMENT` to `production`

## Post-Deployment Checklist

- [ ] Test homepage loads correctly
- [ ] Test product page functionality
- [ ] Test add to cart
- [ ] Test checkout flow
- [ ] Test payment integration (use sandbox mode first)
- [ ] Test WhatsApp COD flow
- [ ] Verify Google Sheets integration
- [ ] Test mobile responsiveness
- [ ] Check all links and navigation

## Custom Domain (Optional)

1. In Vercel dashboard, go to Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_BASE_URL` to your custom domain

## Production Checklist

Before going live:
- [ ] Change `CASHFREE_ENVIRONMENT` to `production`
- [ ] Update Cashfree credentials to production
- [ ] Test with real payment methods
- [ ] Set up monitoring and analytics
- [ ] Configure proper error handling
- [ ] Test all user flows thoroughly

## Troubleshooting

### Common Issues:
1. **Payment not working**: Check Cashfree credentials and environment
2. **Sheets not updating**: Verify SheetDB URL and sheet permissions
3. **Build errors**: Check for missing dependencies in package.json
4. **Environment variables**: Ensure all required vars are set in Vercel

### Support:
- Check Vercel logs in dashboard
- Check browser console for errors
- Verify all environment variables are set correctly
