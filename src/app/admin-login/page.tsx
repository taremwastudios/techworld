'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Loader2, AlertCircle, Box, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        return;
      }

      if (signInData.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', signInData.user.id)
          .single();

        if (profile?.role === 'admin') {
          router.push('/admin');
        } else {
          await supabase.auth.signOut();
          setError('Access denied. Admin credentials required.');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <Box className="w-10 h-10 text-accent" />
          </Link>
          <h1 className="text-2xl font-bold text-primary mb-2">Admin Portal</h1>
          <p className="text-text-secondary">
            Sign in to manage the Illusions Family store
          </p>
        </div>

        <div className="bg-white border border-border p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 pl-10 pr-3 border border-border text-primary focus:border-accent"
                  placeholder="admin@illusions.family"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 pl-10 pr-3 border border-border text-primary focus:border-accent"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-error/10 border border-error/20 text-error text-sm">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-accent hover:bg-accent-hover text-white font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In to Admin
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-text-secondary">
              Not an admin?{' '}
              <Link href="/account" className="text-accent hover:underline">
                Return to main site
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-text-muted mt-6">
          Restricted access. Authorized personnel only.
        </p>
      </div>
    </div>
  );
}
