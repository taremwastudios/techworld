'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8">
                <rect fill="#0F172A" width="32" height="32" rx="0"/>
                <path fill="#F59E0B" d="M16 6L6 12v8l10 6 10-6v-8L16 6zm0 2.5l7 4.2v6.6l-7 4.2-7-4.2v-6.6l7-4.2z"/>
                <circle fill="#F59E0B" cx="16" cy="16" r="4"/>
              </svg>
              <span className="text-xl font-bold">Illusions Family</span>
            </div>
            <p className="text-sm text-gray-400">
              Your destination for premium games and AI tools. Download APKs, purchase games, and access your library anywhere.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/game-store" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/game-store?category=games" className="hover:text-white transition-colors">Games</Link></li>
              <li><Link href="/ai-tools" className="hover:text-white transition-colors">AI Tools</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Cart</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/account" className="hover:text-white transition-colors">My Account</Link></li>
              <li><Link href="/account?tab=library" className="hover:text-white transition-colors">My Library</Link></li>
              <li><Link href="/account?tab=purchases" className="hover:text-white transition-colors">Purchase History</Link></li>
              <li><Link href="/admin-login" className="hover:text-white transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-primary-light hover:bg-gray-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-primary-light hover:bg-gray-700 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-primary-light hover:bg-gray-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:support@illusionsfamily.com" className="p-2 bg-primary-light hover:bg-gray-700 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; 2026 Illusions Family. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
