import { NextResponse } from 'next/server';
import { mockOrders } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (userId) {
    const userOrders = mockOrders.filter(o => o.userId === userId);
    return NextResponse.json(userOrders);
  }

  return NextResponse.json(mockOrders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newOrder = {
      id: `order-${Date.now()}`,
      ...body,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockOrders.push(newOrder);
    return NextResponse.json(newOrder, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
