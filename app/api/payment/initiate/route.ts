import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, orderAmount, orderCurrency, customerDetails, orderMeta } = body;

    // Validate required fields
    if (!orderId || !orderAmount || !orderCurrency || !customerDetails || !orderMeta) {
      return NextResponse.json({
        success: false,
        message: 'Missing required fields'
      }, { status: 400 });
    }

    // Validate customer details
    if (!customerDetails.customerId || !customerDetails.customerName || 
        !customerDetails.customerEmail || !customerDetails.customerPhone) {
      return NextResponse.json({
        success: false,
        message: 'Missing customer details'
      }, { status: 400 });
    }

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

    // Validate environment variables
    if (cashfreeConfig.appId === 'TEST_APP_ID' || cashfreeConfig.secretKey === 'TEST_SECRET_KEY') {
      console.warn('Using test Cashfree credentials. Please set CASHFREE_APP_ID and CASHFREE_SECRET_KEY in .env.local');
    } else {
      console.log('Using Cashfree credentials:', {
        appId: cashfreeConfig.appId,
        secretKey: cashfreeConfig.secretKey.substring(0, 10) + '...',
        baseUrl: cashfreeConfig.baseUrl,
        environment: process.env.NODE_ENV
      });
    }

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

    console.log('Creating order:', orderId, {
      environment: isProduction ? 'production' : 'sandbox',
      callbacksBase: baseUrlForCallbacks,
      cashfreeBase: cashfreeConfig.baseUrl
    });

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
    console.log('Order creation response:', orderData);

    if (!orderResponse.ok) {
      return NextResponse.json({
        success: false,
        message: 'Order creation failed',
        details: orderData
      }, { status: orderResponse.status });
    }

    // Step 2: Create payment session (simplified - no retry logic)
    console.log('Order created, creating payment session...');
    
    const paymentSessionRequest = {
      order_id: orderId
    };

    console.log('Payment session request:', paymentSessionRequest);

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

    if (!cashfreeResponse.ok || !responseData.payment_session_id) {
      return NextResponse.json({
        success: false,
        message: 'Payment session creation failed',
        details: responseData,
        debug: {
          status: cashfreeResponse.status,
          orderData: orderData,
          paymentSessionRequest: paymentSessionRequest,
          baseUrl: cashfreeConfig.baseUrl
        }
      }, { status: cashfreeResponse.status });
    }

    const paymentSessionId = responseData.payment_session_id;

    return NextResponse.json({
      success: true,
      paymentSessionId: paymentSessionId,
      orderId: orderId,
      message: 'Payment session created successfully'
    });

  } catch (error) {
    console.error('Cashfree payment initiation error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
