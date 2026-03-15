'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Brain, 
  Cpu, 
  Database, 
  Shield, 
  Zap, 
  Globe, 
  Download, 
  ShoppingCart,
  Gamepad2,
  Sparkles,
  Box,
  Cloud,
  Package,
  Server,
  Users,
  CreditCard
} from 'lucide-react';
import Header from '@/components/Header';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section - Dark Blue */}
        <section className="relative bg-primary text-white py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="relative max-w-6xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Box className="w-10 h-10 text-accent" />
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Illusions Family
            </h1>
            <p className="text-xl text-gray-300 mb-4">
              Your destination for premium games and AI tools
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Discover, purchase, and download amazing games and AI applications. 
              Your library, accessible anywhere in the world. Join thousands of satisfied customers 
              who trust Illusions Family for their digital entertainment needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/game-store"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Browse Store
              </Link>
              <Link
                href="/account"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-light border border-gray-600 hover:bg-gray-800 text-white font-semibold transition-colors"
              >
                <Package className="w-5 h-5" />
                My Library
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">Our Services</h2>
            <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
              We provide a comprehensive platform for digital content distribution, 
              featuring secure payments, instant downloads, and cloud library access.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-8 border border-border hover:border-primary transition-colors">
                <Gamepad2 className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-primary">Premium Games</h3>
                <p className="text-text-secondary">
                  Access a curated collection of premium games developed by Phantom Illusions Studio. 
                  From action-packed adventures to mind-bending puzzles, discover your next favorite game.
                </p>
              </div>
              
              <div className="p-8 border border-border hover:border-primary transition-colors">
                <Brain className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-primary">AI Development Tools</h3>
                <p className="text-text-secondary">
                  Empower your AI projects with SmartAI Console and developer tools. 
                  Build, train, and deploy custom machine learning models with our comprehensive SDKs.
                </p>
              </div>
              
              <div className="p-8 border border-border hover:border-primary transition-colors">
                <Cloud className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-3 text-primary">Cloud Library</h3>
                <p className="text-text-secondary">
                  Your purchases are safely stored in the cloud. Access your entire game 
                  and AI tool collection from any device, anywhere, anytime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-primary">Why Choose Us</h2>
            <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
              Experience the difference with our secure, user-friendly platform designed 
              for the modern digital consumer.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 border border-border text-center">
                <Download className="w-10 h-10 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2 text-primary">Instant Access</h3>
                <p className="text-sm text-text-secondary">
                  Download your purchases immediately after payment completion.
                </p>
              </div>
              
              <div className="bg-white p-6 border border-border text-center">
                <Shield className="w-10 h-10 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2 text-primary">Secure Payments</h3>
                <p className="text-sm text-text-secondary">
                  Industry-standard encryption protects every transaction.
                </p>
              </div>
              
              <div className="bg-white p-6 border border-border text-center">
                <Users className="w-10 h-10 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2 text-primary">24/7 Support</h3>
                <p className="text-sm text-text-secondary">
                  Our team is always ready to help with any questions.
                </p>
              </div>
              
              <div className="bg-white p-6 border border-border text-center">
                <CreditCard className="w-10 h-10 text-accent mx-auto mb-3" />
                <h3 className="font-semibold mb-2 text-primary">Flexible Payments</h3>
                <p className="text-sm text-text-secondary">
                  Multiple payment options including cards and digital wallets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Create a free account to start building your digital library. 
              Browse our store, make purchases, and access your content anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/account"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-semibold transition-colors"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/game-store"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-light border border-gray-600 hover:bg-gray-800 text-white font-semibold transition-colors"
              >
                Browse Store
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Box className="w-8 h-8 text-accent" />
                <h3 className="text-xl font-bold">Illusions Family</h3>
              </div>
              <p className="text-sm text-gray-400">
                Your destination for premium games and AI tools.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Store</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/ai-tools" className="hover:text-white">AI Tools</Link></li>
                <li><Link href="/game-store" className="hover:text-white">Games</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/account" className="hover:text-white">Sign In</Link></li>
                <li><Link href="/account" className="hover:text-white">My Library</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            &copy; 2024 Illusions Family. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
