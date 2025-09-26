import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, orderAmount, orderCurrency, customerDetails } = body;

    console.log('Debug payment request:', { orderId, orderAmount, orderCurrency, customerDetails });

    // Resolve base URL for return/notify (prefer explicit env, fallback to headers)
    const explicitBase = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, ''); // Remove trailing slash
    const forwardedProto = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
    const inferredBase = host ? `${forwardedProto}://${host}` : '';
    const baseUrlForCallbacks = explicitBase || inferredBase;

    // Cashfree API configuration (sandbox vs production)
    const isProduction = process.env.CASHFREE_ENV === 'production' || process.env.NODE_ENV === 'production';
    const cashfreeConfig = {
      appId: process.env.CASHFREE_APP_ID || 'TEST_APP_ID',
      secretKey: process.env.CASHFREE_SECRET_KEY || 'TEST_SECRET_KEY',
      baseUrl: isProduction 
        ? 'https://api.cashfree.com/pg' 
        : 'https://sandbox.cashfree.com/pg'
    };

    console.log('Cashfree config:', {
      appId: cashfreeConfig.appId?.substring(0, 10) + '...',
      baseUrl: cashfreeConfig.baseUrl,
      isProduction,
      baseUrlForCallbacks
    });

    // Create order first with proper format
    const orderRequest = {
      order_id: orderId,
      order_amount: orderAmount,
      order_currency: orderCurrency,
      customer_details: {
        customer_id: customerDetails.customerId,
        customer_name: customerDetails.customerName,
        customer_email: customerDetails.customerEmail,
        customer_phone: customerDetails.customerPhone
      },
      order_meta: {
        return_url: `${baseUrlForCallbacks}/payment/callback?order_id=${orderId}`,
        notify_url: `${baseUrlForCallbacks}/api/payment/callback`
      }
    };

    console.log('Creating order with:', orderRequest);

    // Step 1: Create order
    const orderResponse = await fetch(`${cashfreeConfig.baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': cashfreeConfig.appId,
        'x-client-secret': cashfreeConfig.secretKey
      },
      body: JSON.stringify(orderRequest)
    });

    const orderData = await orderResponse.json();
    console.log('Order creation response:', { status: orderResponse.status, data: orderData });

    if (!orderResponse.ok) {
      return NextResponse.json({
        success: false,
        message: 'Order creation failed',
        details: orderData,
        step: 'order_creation'
      }, { status: orderResponse.status });
    }

    // Step 2: Create payment session
    console.log('Order created, creating payment session...');
    
    const paymentSessionRequest = {
      order_id: orderId
    };

    const cashfreeResponse = await fetch(`${cashfreeConfig.baseUrl}/orders/payment-sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': cashfreeConfig.appId,
        'x-client-secret': cashfreeConfig.secretKey
      },
      body: JSON.stringify(paymentSessionRequest)
    });

    const responseData = await cashfreeResponse.json();
    console.log('Payment session response:', { status: cashfreeResponse.status, data: responseData });

    if (cashfreeResponse.ok && responseData.payment_session_id) {
      return NextResponse.json({
        success: true,
        paymentSessionId: responseData.payment_session_id,
        orderId: orderId,
        message: 'Payment session created successfully',
        step: 'payment_session_created',
        debug: {
          orderData,
          paymentSessionData: responseData,
          baseUrlForCallbacks,
          cashfreeConfig: {
            baseUrl: cashfreeConfig.baseUrl,
            isProduction
          }
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Payment session creation failed',
        details: responseData,
        step: 'payment_session_creation',
        debug: {
          orderData,
          paymentSessionData: responseData,
          baseUrlForCallbacks
        }
      }, { status: cashfreeResponse.status });
    }

  } catch (error) {
    console.error('Debug payment error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
      step: 'exception'
    }, { status: 500 });
  }
}
