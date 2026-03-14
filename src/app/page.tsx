'use client';

import Link from 'next/link';
import { ArrowRight, Server, Network, Database, Cpu, Shield, Zap, Globe } from 'lucide-react';
import Header from '@/components/Header';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background-alt">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-primary text-white py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="relative max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
              TechWorld
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              Powered by Phantom Illusions Studio
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Enterprise-grade technology solutions for modern businesses
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent-hover text-white text-lg font-semibold transition-colors"
            >
              Browse Store
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Enterprise Solutions</h2>
            <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
              Comprehensive technology infrastructure for businesses of all sizes
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border border-border hover:border-primary transition-colors">
                <Server className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Server Infrastructure</h3>
                <p className="text-text-secondary">
                  Enterprise-grade rack servers, blade systems, and modular infrastructure solutions for mission-critical workloads.
                </p>
              </div>
              
              <div className="p-6 border border-border hover:border-primary transition-colors">
                <Network className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Networking</h3>
                <p className="text-text-secondary">
                  High-performance switches, routers, and network security appliances to keep your infrastructure connected and secure.
                </p>
              </div>
              
              <div className="p-6 border border-border hover:border-primary transition-colors">
                <Database className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Storage Solutions</h3>
                <p className="text-text-secondary">
                  Scalable SAN, NAS, and hybrid storage arrays with enterprise reliability and advanced data protection.
                </p>
              </div>
              
              <div className="p-6 border border-border hover:border-primary transition-colors">
                <Cpu className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Workstations</h3>
                <p className="text-text-secondary">
                  Professional workstations and rendering servers powered by the latest multi-core processors and professional GPUs.
                </p>
              </div>
              
              <div className="p-6 border border-border hover:border-primary transition-colors">
                <Shield className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Security</h3>
                <p className="text-text-secondary">
                  UPS systems, environmental monitoring, and physical security solutions to protect your critical infrastructure.
                </p>
              </div>
              
              <div className="p-6 border border-border hover:border-primary transition-colors">
                <Zap className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2">Accessories</h3>
                <p className="text-text-secondary">
                  Cables, KVM switches, rack mount kits, and essential accessories for complete infrastructure deployment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24 bg-background-alt">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">About TechWorld</h2>
            
            <div className="prose prose-lg max-w-none text-text-secondary space-y-6">
              <p>
                TechWorld, powered by Phantom Illusions Studio, represents the next generation of enterprise technology procurement. 
                Our platform delivers a comprehensive suite of hardware solutions designed to meet the demanding requirements of 
                modern enterprise environments, from startup infrastructure to global enterprise deployments.
              </p>
              
              <p>
                We specialize in providing enterprise-grade server hardware, networking equipment, storage solutions, and 
                professional workstation systems. Every product in our catalog is carefully selected to meet rigorous standards 
                for reliability, performance, and longevity. Our relationships with leading manufacturers ensure that our 
                customers receive genuine, warranty-backed equipment backed by world-class support.
              </p>
              
              <p>
                Our ordering system has been engineered for efficiency and precision. From sophisticated filtering capabilities 
                that help you find exactly what you need, to streamlined checkout processes that minimize procurement time, 
                every aspect of TechWorld is designed with the enterprise buyer in mind. Real-time inventory visibility, 
                comprehensive product specifications, and detailed specifications enable informed decision-making.
              </p>
              
              <p>
                Phantom Illusions Studio brings decades of combined experience in enterprise infrastructure to TechWorld. 
                We understand that technology procurement is more than just purchasing hardware—it is about building 
                foundations for business success. Our team is committed to providing not just products, but partnerships 
                that support your technological evolution.
              </p>
              
              <p>
                Whether you are building your first server room, expanding your data center capacity, or outfitting a 
                creative professional workstation fleet, TechWorld provides the tools, expertise, and infrastructure 
                solutions you need to succeed in todays competitive landscape.
              </p>
            </div>
            
            <div className="mt-12 text-center">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-light text-white text-lg font-semibold transition-colors"
              >
                <Globe className="w-5 h-5" />
                Explore Our Catalog
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Build Your Infrastructure?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Browse our comprehensive catalog of enterprise hardware and find the perfect solutions for your business needs.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white text-lg font-semibold transition-colors"
            >
              Start Shopping
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TechWorld</h3>
              <p className="text-sm text-gray-400">
                Powered by Phantom Illusions Studio
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/shop?category=servers" className="hover:text-white">Servers</Link></li>
                <li><Link href="/shop?category=networking" className="hover:text-white">Networking</Link></li>
                <li><Link href="/shop?category=storage" className="hover:text-white">Storage</Link></li>
                <li><Link href="/shop?category=workstations" className="hover:text-white">Workstations</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white">Shipping Info</Link></li>
                <li><Link href="#" className="hover:text-white">Returns</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/account" className="hover:text-white">Sign In</Link></li>
                <li><Link href="/account" className="hover:text-white">Create Account</Link></li>
                <li><Link href="/account" className="hover:text-white">Order History</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            &copy; 2024 TechWorld. Powered by Phantom Illusions Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
