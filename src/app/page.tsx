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
  CreditCard,
  Lock
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
              Your library, accessible anywhere in the world.
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

        {/* About Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">About Illusions Family</h2>
            
            <div className="prose prose-lg max-w-none text-text-secondary space-y-6">
              <p>
                At the intersection of cutting-edge artificial intelligence and high-performance interactive entertainment stands Illusions Family, 
                a digital infrastructure engineered for those who demand efficiency without compromise. Founded and operated by a lean, two-person 
                executive team, Illusions Family was established to bridge the gap between complex software development and the end-user experience. 
                Our mission is singular: to provide the global market with the most streamlined, reliable, and powerful AI tools and Android 
                gaming packages available in the modern digital landscape. We do not believe in the clutter of traditional marketplaces; 
                we believe in precision, speed, and the raw utility of professional-grade software.
              </p>
              
              <p>
                The genesis of Illusions Family was rooted in a shared observation of the digital distribution sector's fragmentation. 
                We noted that while the world was rapidly adopting AI and mobile gaming, the platforms delivering these tools were often 
                inefficient, visually distracting, and technically bloated. As a two-person operation, we chose a different path—one defined 
                by radical efficiency. By maintaining a compact leadership structure, we ensure that every line of code, every .apk file, 
                and every AI model hosted on our platform undergoes rigorous personal verification. This hands-on approach allows us to pivot 
                faster than corporate giants, implementing security patches and performance updates in real-time, ensuring that our global 
                user base is always equipped with the latest advancements in technology.
              </p>
              
              <p>
                The "Family" in our name is not a reference to a social collective, but rather a structural philosophy. It represents 
                a unified ecosystem where AI and Gaming coexist in a seamless technical environment. Our AI division is dedicated to 
                productivity and innovation, offering a wide display of tools designed to automate complex workflows and provide users 
                with a competitive edge in a data-driven world. Simultaneously, our Game Store serves as a repository for 
                high-fidelity gaming experiences, specifically curated and optimized for the Android platform. By splitting these two 
                pillars into distinct showcases within our dashboard, we provide a structured user journey that respects the professional 
                requirements of the developer and the entertainment needs of the gamer.
              </p>
              
              <p>
                Operating a global distribution system requires a robust backend architecture, which is why Illusions Family is built 
                upon the Supabase ecosystem. This choice was deliberate, ensuring that every "Techworld" account—now rebranded under 
                our definitive Illusions Family identity—is a fortress of personal data and digital assets. When a user joins our family, 
                their acquisitions are not merely temporary downloads; they are permanent entries in a secure, cloud-based library. We 
                understand the volatility of hardware; devices are lost, upgraded, or compromised. However, an Illusions Family account 
                remains a constant. Our persistence layer ensures that your AI tools and .apk packages are tied to your identity, 
                allowing for immediate re-acquisition across any device, anywhere in the world, at any time.
              </p>
              
              <p>
                Our aesthetic reflects our operational philosophy: sharp, professional, and devoid of unnecessary ornamentation. In a 
                digital era saturated with distracting visuals and "rounded" friendly templates, Illusions Family stands apart with 
                a high-contrast, "Enterprise-sharp" design. We use 0px border-radii and professional iconography to signal our 
                commitment to serious utility. This is not a social media platform; it is a professional tool and an elite gaming 
                repository. Our AI tools page, presented on a refined cream-colored canvas with wide-display imagery, is designed 
                for clarity and focus, allowing the technical specifications and descriptions of each tool to remain the primary 
                objective of the user's gaze.
              </p>
              
              <p>
                The logistics of our global operation are handled through a multi-tiered payment integration system. By incorporating 
                Stripe, PayPal, and Google Pay, we have removed the barriers to entry for users across different continents and 
                banking systems. This financial flexibility, coupled with our secure administrative portal, allows our two-person 
                team to manage an international inventory with the precision of a high-frequency trading firm. The admin login is 
                the nerve center of Illusions Family, where we personally oversee the lifecycle of every .apk package, ensuring 
                that only the most stable and efficient versions reach your dashboard. If a tool no longer meets our standard 
                of excellence, it is removed; if a new breakthrough in AI occurs, it is integrated immediately.
              </p>
              
              <p>
                As we look toward the future, Illusions Family continues to refine its role as a premier digital purveyor. We are 
                not just a store; we are a specialized service run by two individuals who value the user's time as much as their 
                own. Every decision made at the executive level—from the choice of a professional box-logo favicon to the removal of 
                the main page search bar in favor of a structured dashboard—is made to enhance the efficiency of your digital life. 
                We provide the tools that build the future and the games that define the modern era of mobile entertainment. 
                Welcome to Illusions Family: where professional architecture meets global innovation, and where the most efficient 
                tools in the world are only a single, secure click away.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
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
    </div>
  );
}
