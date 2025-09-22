import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('order_id');

    if (!orderId) {
      return NextResponse.json({
        success: false,
        message: 'Order ID is required'
      }, { status: 400 });
    }

    // Cashfree configuration
    const cashfreeConfig = {
      appId: process.env.CASHFREE_APP_ID || 'TEST_APP_ID',
      secretKey: process.env.CASHFREE_SECRET_KEY || 'TEST_SECRET_KEY',
      baseUrl: process.env.NODE_ENV === 'production' 
        ? 'https://api.cashfree.com/pg' 
        : 'https://sandbox.cashfree.com/pg'
    };

    // Check payment status with Cashfree
    const response = await fetch(`${cashfreeConfig.baseUrl}/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': cashfreeConfig.appId,
        'x-client-secret': cashfreeConfig.secretKey
      }
    });

    const data = await response.json();

    if (data.order_status === 'PAID') {
      return NextResponse.json({
        success: true,
        data: data,
        message: 'Payment successful'
      });
    } else if (data.order_status === 'ACTIVE') {
      return NextResponse.json({
        success: false,
        data: data,
        message: 'Payment pending'
      });
    } else {
      return NextResponse.json({
        success: false,
        data: data,
        message: 'Payment failed or cancelled'
      });
    }

  } catch (error) {
    console.error('Payment status check error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}
