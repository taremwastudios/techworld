import { NextResponse } from 'next/server';
import { Game } from '@/lib/types';

const games: Game[] = [
  {
    id: '1',
    title: 'Neon Pulse',
    description: 'A fast-paced cyberpunk action game with stunning visuals and intense combat.',
    price: 0,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
    downloadUrl: 'https://example.com/download/neon-pulse',
    isFree: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Shadow Protocol',
    description: 'Stealth-based tactical shooter with innovative mechanics and compelling narrative.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    downloadUrl: '',
    isFree: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Quantum Drift',
    description: 'Next-gen racing experience with physics-based gameplay and customizable vehicles.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=400&h=300&fit=crop',
    downloadUrl: '',
    isFree: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Binary Echoes',
    description: 'Puzzle platformer exploring themes of artificial consciousness and digital worlds.',
    price: 0,
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
    downloadUrl: 'https://example.com/download/binary-echoes',
    isFree: true,
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json({ games });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newGame: Game = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description,
      price: body.price || 0,
      image: body.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
      downloadUrl: body.downloadUrl || '',
      isFree: body.isFree || false,
      createdAt: new Date().toISOString(),
    };
    games.push(newGame);
    return NextResponse.json(newGame, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create game' }, { status: 500 });
  }
}
