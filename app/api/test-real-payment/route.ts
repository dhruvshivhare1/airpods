import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, orderAmount, orderCurrency, customerDetails } = body;

    console.log('Real payment test:', { orderId, orderAmount, orderCurrency, customerDetails });

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

    // Create order with EXACT same format as payment initiation
    const orderRequest = {
      order_id: orderId,
      order_amount: orderAmount,
      order_currency: orderCurrency,
      customer_details: {
        customer_id: customerDetails.customerId,
        customer_name: customerDetails.customerName,
        customer_email: customerDetails.customerEmail,
        customer_phone: customerDetails.customerPhone.replace(/\D/g, '').substring(0, 10)
      },
      order_meta: {
        return_url: `${baseUrlForCallbacks}/payment/callback?order_id=${orderId}`,
        notify_url: `${baseUrlForCallbacks}/api/payment/callback`
      },
      order_note: `AirPods Pro order - ${orderId}`,
      order_expiry_time: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    console.log('Order request:', orderRequest);

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
    console.log('Order response:', { status: orderResponse.status, data: orderData });

    if (!orderResponse.ok) {
      return NextResponse.json({
        success: false,
        message: 'Order creation failed',
        details: orderData,
        debug: {
          status: orderResponse.status,
          orderRequest,
          cashfreeConfig: {
            baseUrl: cashfreeConfig.baseUrl,
            appId: cashfreeConfig.appId?.substring(0, 10) + '...',
            isProduction
          }
        }
      }, { status: orderResponse.status });
    }

    return NextResponse.json({
      success: true,
      message: 'Order created successfully',
      orderData,
      debug: {
        orderRequest,
        cashfreeConfig: {
          baseUrl: cashfreeConfig.baseUrl,
          isProduction
        }
      }
    });

  } catch (error) {
    console.error('Real payment test error:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
