# Cashfree Payment Integration Setup

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Cashfree Payment Gateway Configuration
CASHFREE_APP_ID=TEST_APP_ID
CASHFREE_SECRET_KEY=TEST_SECRET_KEY

# For Production, use:
# CASHFREE_APP_ID=your_production_app_id
# CASHFREE_SECRET_KEY=your_production_secret_key

# Next.js Configuration
NODE_ENV=development
```

## Cashfree Account Setup

1. **Register with Cashfree**: Visit [Cashfree for Business](https://merchant.cashfree.com/) and create an account
2. **Get Credentials**: After registration, you'll receive:
   - App ID
   - Secret Key
3. **Test Environment**: Use the sandbox environment for testing
4. **Production**: Switch to production credentials when ready

## Features Implemented

### 1. Cashfree Payment Component
- Secure payment initiation using Cashfree SDK
- Real-time payment processing
- Error handling and validation
- Support for multiple payment methods

### 2. API Routes
- `/api/payment/initiate` - Creates payment session
- `/api/payment/callback` - Handles webhook callbacks
- `/api/payment/status` - Checks payment status

### 3. Payment Flow
1. Customer selects "Credit/Debit Card" payment
2. Clicks "Proceed to Payment"
3. Cashfree payment component appears
4. Customer clicks "Pay with Cashfree"
5. Cashfree SDK loads and shows payment options
6. Customer completes payment
7. Redirected back to callback page
8. Success/failure handling

### 4. Security Features
- Webhook signature verification
- Secure API communication
- Environment-based configuration
- PCI DSS compliant

## Payment Methods Supported

- ✅ **UPI**: All major UPI apps (PhonePe, Google Pay, Paytm, etc.)
- ✅ **Credit/Debit Cards**: Visa, Mastercard, RuPay
- ✅ **Net Banking**: 50+ banks
- ✅ **Wallets**: Paytm, Mobikwik, Freecharge
- ✅ **EMI**: No-cost EMI options
- ✅ **Pay Later**: LazyPay, Simpl, etc.

## Testing

### Test Cards (Sandbox)
- **Success**: 4111 1111 1111 1111
- **Failure**: 4000 0000 0000 0002
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### Test UPI IDs
- `success@upi`
- `failure@upi`

### Test Net Banking
- Use any bank from the list
- Use test credentials provided by Cashfree

## Production Deployment

1. **Update Environment Variables**:
   - Replace sandbox credentials with production ones
   - Set `NODE_ENV=production`

2. **Webhook Configuration**:
   - Set up webhook URLs in Cashfree dashboard
   - Ensure callback URLs are accessible
   - Configure webhook events (PAYMENT_SUCCESS_WEBHOOK, PAYMENT_FAILED_WEBHOOK)

3. **SSL Certificate**:
   - Ensure your domain has valid SSL certificate
   - Cashfree requires HTTPS for production

4. **Domain Verification**:
   - Verify your domain in Cashfree dashboard
   - Add your domain to allowed origins

## Support

- **Cashfree Documentation**: [Cashfree Developer Docs](https://docs.cashfree.com/)
- **Support**: Contact Cashfree support for production setup
- **Testing**: Use sandbox environment for development

## Important Notes

- Always test in sandbox before going live
- Keep your secret key secure and never expose it in client-side code
- Implement proper error handling and logging
- Set up monitoring for payment failures
- Ensure your callback URLs are accessible from external networks
- Cashfree provides excellent analytics and reporting
- Support for international payments available
