import { NextResponse } from 'next/server';
import { Game } from '@/lib/types';

const games: Game[] = [
  {
    id: '1',
    title: 'Neon Pulse',
    description: 'A fast-paced cyberpunk action game with stunning visuals and intense combat.',
    price: 0,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
    downloadUrl: '/uploads/neon-pulse.exe',
    isFree: true,
    version: '1.0.0',
    category: 'Gaming',
    downloadCount: 1247,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Shadow Protocol',
    description: 'Stealth-based tactical shooter with innovative mechanics and compelling narrative.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
    downloadUrl: '/uploads/shadow-protocol.zip',
    isFree: false,
    version: '2.1.3',
    category: 'Gaming',
    downloadCount: 856,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Quantum Drift',
    description: 'Next-gen racing experience with physics-based gameplay and customizable vehicles.',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=400&h=300&fit=crop',
    downloadUrl: '/uploads/quantum-drift.exe',
    isFree: false,
    version: '1.5.0',
    category: 'Gaming',
    downloadCount: 432,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Binary Echoes',
    description: 'Puzzle platformer exploring themes of artificial consciousness and digital worlds.',
    price: 0,
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop',
    downloadUrl: '/uploads/binary-echoes.apk',
    isFree: true,
    version: '1.2.1',
    category: 'Gaming',
    downloadCount: 2103,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'SmartAI Console SDK',
    description: 'Development toolkit for building AI applications on the SmartAI Console platform.',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    downloadUrl: '/uploads/smartai-sdk.zip',
    isFree: false,
    version: '3.0.0',
    category: 'AI',
    downloadCount: 156,
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
      version: body.version || '1.0.0',
      category: body.category || 'Gaming',
      downloadCount: 0,
      fileSize: body.fileSize,
      fileName: body.fileName,
      createdAt: new Date().toISOString(),
    };
    games.push(newGame);
    return NextResponse.json(newGame, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create game' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;
    const index = games.findIndex(g => g.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }
    
    games[index] = { ...games[index], ...updates };
    return NextResponse.json(games[index]);
  } catch {
    return NextResponse.json({ error: 'Failed to update game' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Game ID required' }, { status: 400 });
    }
    
    const index = games.findIndex(g => g.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Game not found' }, { status: 404 });
    }
    
    games.splice(index, 1);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete game' }, { status: 500 });
  }
}
