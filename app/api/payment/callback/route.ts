import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    // Cashfree configuration
    const cashfreeConfig = {
      secretKey: process.env.CASHFREE_SECRET_KEY || 'TEST_SECRET_KEY'
    };

    // Verify webhook signature
    const signature = request.headers.get('x-webhook-signature');
    if (signature) {
      const expectedSignature = crypto
        .createHmac('sha256', cashfreeConfig.secretKey)
        .update(JSON.stringify(body))
        .digest('base64');

      if (signature !== expectedSignature) {
        return NextResponse.json({
          success: false,
          message: 'Invalid signature'
        }, { status: 400 });
      }
    }

    // Handle different webhook events
    if (type === 'PAYMENT_SUCCESS_WEBHOOK') {
      // Payment successful
      console.log('Payment successful:', data);
      
      // Here you would typically:
      // 1. Update order status in database
      // 2. Send confirmation email
      // 3. Update inventory
      // 4. Generate invoice
      
      return NextResponse.json({
        success: true,
        data: data,
        message: 'Payment successful'
      });
    } else if (type === 'PAYMENT_FAILED_WEBHOOK') {
      // Payment failed
      console.log('Payment failed:', data);
      
      return NextResponse.json({
        success: false,
        data: data,
        message: 'Payment failed'
      });
    } else {
      // Other webhook events
      console.log('Webhook event:', type, data);
      
      return NextResponse.json({
        success: true,
        message: 'Webhook received'
      });
    }

  } catch (error) {
    console.error('Cashfree callback error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}
