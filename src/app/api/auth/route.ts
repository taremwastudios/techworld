import { NextResponse } from 'next/server';
import { mockUsers } from '@/lib/data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, password, name } = body;

    if (action === 'login') {
      const user = mockUsers.find(u => u.email === email);
      
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 401 });
      }

      const { password: _, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword);
    }

    if (action === 'register') {
      const existingUser = mockUsers.find(u => u.email === email);
      
      if (existingUser) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
      }

      const newUser: {
        id: string;
        email: string;
        name: string;
        role: 'buyer';
        addresses: never[];
        wishlist: never[];
        createdAt: string;
        password?: string;
      } = {
        id: `user-${Date.now()}`,
        email,
        name,
        role: 'buyer',
        addresses: [],
        wishlist: [],
        createdAt: new Date().toISOString()
      };
      mockUsers.push(newUser);

      const { password: _, ...userWithoutPassword } = newUser;
      return NextResponse.json(userWithoutPassword, { status: 201 });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
