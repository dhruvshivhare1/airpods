import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Test environment variables
    const envCheck = {
      CASHFREE_APP_ID: process.env.CASHFREE_APP_ID ? 'SET' : 'NOT SET',
      CASHFREE_SECRET_KEY: process.env.CASHFREE_SECRET_KEY ? 'SET' : 'NOT SET',
      CASHFREE_ENV: process.env.CASHFREE_ENV || 'NOT SET',
      NODE_ENV: process.env.NODE_ENV || 'NOT SET',
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || 'NOT SET',
    };

    // Test Cashfree API connection
    const testOrderId = `test_${Date.now()}`;
    const isProduction = process.env.CASHFREE_ENV === 'production' || process.env.NODE_ENV === 'production';
    const baseUrl = isProduction ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg';
    
    const testOrderRequest = {
      order_id: testOrderId,
      order_amount: 1,
      order_currency: 'INR',
      customer_details: {
        customer_id: 'test_customer',
        customer_name: 'Test Customer',
        customer_email: 'test@example.com',
        customer_phone: '9999999999'
      },
      order_meta: {
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/callback?order_id=${testOrderId}`,
        notify_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payment/callback`
      }
    };

    console.log('Testing Cashfree API with:', {
      baseUrl,
      appId: process.env.CASHFREE_APP_ID?.substring(0, 10) + '...',
      environment: isProduction ? 'production' : 'sandbox'
    });

    const orderResponse = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': process.env.CASHFREE_APP_ID || 'TEST_APP_ID',
        'x-client-secret': process.env.CASHFREE_SECRET_KEY || 'TEST_SECRET_KEY'
      },
      body: JSON.stringify(testOrderRequest)
    });

    const orderData = await orderResponse.json();

    return NextResponse.json({
      success: true,
      environment: envCheck,
      apiTest: {
        status: orderResponse.status,
        ok: orderResponse.ok,
        response: orderData,
        baseUrl,
        isProduction
      }
    });

  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: {
        CASHFREE_APP_ID: process.env.CASHFREE_APP_ID ? 'SET' : 'NOT SET',
        CASHFREE_SECRET_KEY: process.env.CASHFREE_SECRET_KEY ? 'SET' : 'NOT SET',
        CASHFREE_ENV: process.env.CASHFREE_ENV || 'NOT SET',
        NODE_ENV: process.env.NODE_ENV || 'NOT SET',
      }
    }, { status: 500 });
  }
}
