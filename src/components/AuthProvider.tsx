'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createClient, isSupabaseConfigured } from '@/lib/supabase';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: Record<string, { password: string; name: string; role: string }> = {
  'buyer@example.com': { password: 'buyer123', name: 'Buyer User', role: 'buyer' },
  'admin@example.com': { password: 'admin123', name: 'Admin User', role: 'admin' },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [useMock, setUseMock] = useState(false);
  
  let supabase: ReturnType<typeof createClient> | null = null;

  useEffect(() => {
    const configured = isSupabaseConfigured();
    setUseMock(!configured);
    
    if (configured) {
      supabase = createClient();
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      const storedUser = localStorage.getItem('mockUser');
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        setUser(parsed as User);
      }
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    if (useMock) {
      const mockUser = MOCK_USERS[email];
      if (mockUser && mockUser.password === password) {
        const userData = {
          id: email,
          email,
          role: mockUser.role,
          app_metadata: {},
          user_metadata: { full_name: mockUser.name },
          aud: 'authenticated',
          created_at: new Date().toISOString(),
        } as unknown as User;
        localStorage.setItem('mockUser', JSON.stringify(userData));
        setUser(userData);
        return { error: null };
      }
      return { error: new Error('Invalid email or password') };
    }
    
    if (!supabase) supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    if (useMock) {
      if (MOCK_USERS[email]) {
        return { error: new Error('User already exists') };
      }
      const userData = {
        id: email,
        email,
        role: 'buyer',
        app_metadata: {},
        user_metadata: { full_name: fullName },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      } as unknown as User;
      localStorage.setItem('mockUser', JSON.stringify(userData));
      setUser(userData);
      return { error: null };
    }
    
    if (!supabase) supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (!error && data.user) {
      // Use service role to bypass RLS for profile creation
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      
      if (supabaseUrl && serviceRoleKey) {
        const adminClient = createSupabaseAdmin(supabaseUrl, serviceRoleKey);
        const { error: profileError } = await adminClient.from('profiles').insert({
          id: data.user.id,
          email,
          full_name: fullName,
          role: 'buyer',
        });
        
        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
      } else {
        // Fallback to regular client if no service role key
        await supabase.from('profiles').insert({
          id: data.user.id,
          email,
          full_name: fullName,
          role: 'buyer',
        });
      }
    }

    return { error: error as Error | null };
  };

  const signOut = async () => {
    if (useMock) {
      localStorage.removeItem('mockUser');
      setUser(null);
      return;
    }
    
    if (!supabase) supabase = createClient();
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
