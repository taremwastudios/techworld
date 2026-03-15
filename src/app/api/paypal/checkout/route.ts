import { NextResponse } from 'next/server';

/**
 * PayPal Checkout API Route
 * Creates a PayPal order for the client to approve
 * 
 * Environment Variables Required:
 * - PAYPAL_CLIENT_ID: Your PayPal app client ID
 * - PAYPAL_CLIENT_SECRET: Your PayPal app client secret
 * - PAYPAL_MODE: 'sandbox' or 'live'
 */

const PAYPAL_API_BASE = process.env.PAYPAL_MODE === 'live' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com';

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID || '';
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';
  
  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gameId, gameTitle, price, userId } = body;

    if (!gameId || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get PayPal access token
    const accessToken = await getAccessToken();

    // Create PayPal order
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // First create the order without return_url, then update with orderId
    const orderResponse = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: gameId,
            description: `Purchase for ${gameTitle || 'Game'}`,
            soft_descriptor: 'TECHWORLD',
            amount: {
              currency_code: 'USD',
              value: price.toFixed(2),
            },
            custom_id: JSON.stringify({ gameId, userId }),
          },
        ],
        application_context: {
          brand_name: 'TechWorld',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${appUrl}/checkout/success`,
          cancel_url: `${appUrl}/checkout/cancelled`,
        },
      }),
    });

    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
      console.error('PayPal order creation error:', orderData);
      return NextResponse.json(
        { error: 'Failed to create PayPal order' },
        { status: 500 }
      );
    }

    const orderId = orderData.id;

    // Return the order ID and approval URL with orderId parameter for redirect after payment
    const baseApprovalUrl = orderData.links?.find(
      (link: { rel: string; href: string }) => link.rel === 'approve'
    )?.href;

    // Add orderId to the return_url by appending it
    const approvalUrl = baseApprovalUrl 
      ? `${baseApprovalUrl}&orderId=${orderId}`
      : undefined;

    return NextResponse.json({
      orderId,
      approvalUrl,
    });
  } catch (error) {
    console.error('PayPal checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create PayPal checkout session' },
      { status: 500 }
    );
  }
}
