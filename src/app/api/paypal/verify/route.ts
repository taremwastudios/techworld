import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

/**
 * PayPal Payment Verification API Route
 * Captures the PayPal order after user approval
 * 
 * Environment Variables Required:
 * - PAYPAL_CLIENT_ID: Your PayPal app client ID
 * - PAYPAL_CLIENT_SECRET: Your PayPal app client secret
 * - PAYPAL_MODE: 'sandbox' or 'live'
 * - NEXT_PUBLIC_SUPABASE_URL: Your Supabase URL
 * - SUPABASE_SERVICE_ROLE_KEY: Your Supabase service role key
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
    const { orderId, userId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Missing order ID' },
        { status: 400 }
      );
    }

    // Get PayPal access token
    const accessToken = await getAccessToken();

    // Capture the PayPal order
    const captureResponse = await fetch(
      `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const captureData = await captureResponse.json();

    if (!captureResponse.ok || captureData.status !== 'COMPLETED') {
      console.error('PayPal capture error:', captureData);
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      );
    }

    // Get purchase details from the captured order
    const purchaseUnit = captureData.purchase_units?.[0];
    const payments = purchaseUnit?.payments?.captures?.[0];
    
    const gameId = purchaseUnit?.reference_id;
    const amount = parseFloat(payments?.amount?.value || '0');
    const currency = payments?.amount?.currency_code?.toLowerCase() || 'usd';
    const paypalTransactionId = payments?.id;
    const payerEmail = captureData.payer?.email_address;

    if (!gameId) {
      return NextResponse.json(
        { error: 'No game associated with this purchase' },
        { status: 400 }
      );
    }

    // Save to Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    );

    // Try to find user by email if provided
    let purchaseUserId = userId;
    
    if (payerEmail) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', payerEmail)
        .single();
      
      if (profile?.id) {
        purchaseUserId = purchaseUserId || profile.id;
      }
    }

    // Record the purchase
    await supabase.from('purchases').insert({
      user_id: purchaseUserId,
      game_id: gameId,
      amount,
      currency,
      paypal_payment_id: paypalTransactionId,
      paypal_order_id: orderId,
      status: 'completed',
    });

    // Update download count
    await supabase
      .from('games')
      .update({ download_count: 1 })
      .eq('id', gameId);

    return NextResponse.json({ 
      success: true,
      transactionId: paypalTransactionId,
    });
  } catch (error) {
    console.error('PayPal verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
}
