'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, 
  CreditCard, 
  Loader2, 
  CheckCircle,
  XCircle,
  Gamepad2,
  Brain,
  ShoppingCart
} from 'lucide-react';
import Header from '@/components/Header';
import { createClient } from '@/lib/supabase';
import { useAuth } from '@/components/AuthProvider';
import { SupabaseGame } from '@/lib/types';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const gameId = searchParams.get('game');
  
  const [game, setGame] = useState<SupabaseGame | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [checkoutStatus, setCheckoutStatus] = useState<'pending' | 'success' | 'cancelled' | null>(null);

  useEffect(() => {
    if (searchParams.get('session_id')) {
      handleCheckoutComplete();
    } else if (gameId) {
      fetchGame();
    } else {
      setLoading(false);
    }
  }, [gameId, searchParams]);

  const fetchGame = async () => {
    if (!gameId) return;
    
    try {
      const supabase = createClient();
      const { data } = await supabase
        .from('games')
        .select('*')
        .eq('id', gameId)
        .single();
      
      if (data) {
        setGame(data);
      }
    } catch (err) {
      console.error('Failed to fetch game:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckoutComplete = async () => {
    const sessionId = searchParams.get('session_id');
    if (!sessionId) return;

    setLoading(true);
    
    try {
      const res = await fetch('/api/stripe/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, userId: user?.id }),
      });
      
      if (res.ok) {
        setCheckoutStatus('success');
      } else {
        setCheckoutStatus('cancelled');
      }
    } catch {
      setCheckoutStatus('cancelled');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!game || !user) {
      router.push('/account');
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameId: game.id,
          gameTitle: game.title,
          price: game.price,
          userId: user.id,
          email: user.email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Checkout failed');
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (checkoutStatus === 'success') {
    return (
      <div className="min-h-screen bg-primary">
        <Header />
        <main className="pt-24 pb-12 px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-primary-light border border-border p-8">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Purchase Complete!</h1>
              <p className="text-gray-400 mb-6">
                Thank you for your purchase. You can now download your game from My Library.
              </p>
              <div className="space-y-3">
                <Link
                  href="/account"
                  className="block w-full py-3 bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
                >
                  Go to My Library
                </Link>
                <Link
                  href="/"
                  className="block w-full py-3 border border-border text-white hover:bg-primary-light transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (checkoutStatus === 'cancelled') {
    return (
      <div className="min-h-screen bg-primary">
        <Header />
        <main className="pt-24 pb-12 px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-primary-light border border-border p-8">
              <XCircle className="w-16 h-16 text-error mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Checkout Cancelled</h1>
              <p className="text-gray-400 mb-6">
                Your purchase was cancelled. No charges were made.
              </p>
              <div className="space-y-3">
                <Link
                  href="/"
                  className="block w-full py-3 bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-primary">
        <Header />
        <main className="pt-24 pb-12 px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-primary-light border border-border p-8">
              <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">No Item Selected</h1>
              <p className="text-gray-400 mb-6">
                Please select a game to purchase.
              </p>
              <Link
                href="/"
                className="inline-block py-3 px-6 bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
              >
                Browse Store
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <div className="bg-primary-light border border-border">
            <div className="p-6 border-b border-border">
              <h1 className="text-xl font-bold text-white">Complete Your Purchase</h1>
            </div>

            <div className="p-6 flex items-start gap-6">
              <div className="w-32 h-32 bg-primary shrink-0 relative overflow-hidden">
                {game.image_url ? (
                  <Image
                    src={game.image_url}
                    alt={game.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    {game.category === 'AI' ? (
                      <Brain className="w-12 h-12 text-purple-400" />
                    ) : (
                      <Gamepad2 className="w-12 h-12 text-gray-500" />
                    )}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 border ${
                    game.category === 'AI'
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  }`}>
                    {game.category}
                  </span>
                  <span className="text-xs font-mono text-gray-500">v{game.version}</span>
                </div>
                <h2 className="text-xl font-semibold text-white mb-2">{game.title}</h2>
                <p className="text-gray-400 text-sm">{game.description}</p>
              </div>
            </div>

            <div className="p-6 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">${game.price.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-400">Total</span>
                <span className="text-2xl font-bold text-white">${game.price.toFixed(2)}</span>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-error/10 border border-error/20 text-error text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handlePurchase}
                disabled={processing || !user}
                className="w-full py-4 bg-accent hover:bg-accent-hover text-white font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : !user ? (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Sign In to Purchase
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pay ${game.price.toFixed(2)} with Stripe
                  </>
                )}
              </button>

              <p className="text-center text-gray-500 text-xs mt-4">
                Secure payment powered by Stripe. Google Pay available in Stripe checkout.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function GameCheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
