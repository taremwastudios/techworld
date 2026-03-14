import { NextResponse } from 'next/server';
import { mockProducts, mockCategories } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const rating = searchParams.get('rating');
  const sort = searchParams.get('sort');

  let products = [...mockProducts];

  if (category && category !== 'all') {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const searchLower = search.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    );
  }

  if (minPrice) {
    products = products.filter(p => p.price >= parseFloat(minPrice));
  }

  if (maxPrice) {
    products = products.filter(p => p.price <= parseFloat(maxPrice));
  }

  if (rating) {
    products = products.filter(p => p.rating >= parseFloat(rating));
  }

  switch (sort) {
    case 'price-asc':
      products.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      products.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      products.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    default:
      break;
  }

  return NextResponse.json({
    products,
    categories: mockCategories,
    total: products.length
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProduct = {
      id: `prod-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
      reviewCount: 0,
      rating: 0
    };
    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
