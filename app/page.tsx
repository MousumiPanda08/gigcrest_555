'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  ShieldCheck, 
  Zap, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Smartphone 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-zinc-50 font-sans">
      
      {/* --- NAVIGATION BAR --- */}
      <nav className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-black/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-blue-600" size={32} />
            <span className="text-xl font-bold tracking-tight">GigGuard</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="#features" className="hover:text-blue-600 transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</Link>
            <Link href="#security" className="hover:text-blue-600 transition-colors">Security</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-semibold">Login</Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 font-semibold">
                Admin Portal
              </Button>
            </Link>
            <Link href="/register" className="hidden sm:block">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium mb-6 bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse" />
            New: AI-Powered Fraud Protection
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">
            Insurance built for <br className="hidden md:block" /> 
            the Gig Economy.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10">
            Automated claim processing, instant payouts, and advanced fraud detection 
            designed specifically for modern gig workers and partners.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700">
              Start Protecting Your Income <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg">
              View Demo
            </Button>
          </div>

          {/* Hero Image/Mockup Placeholder */}
          <div className="mt-20 relative max-w-5xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20" />
            <div className="relative bg-zinc-100 dark:bg-zinc-900 border dark:border-zinc-800 rounded-2xl h-64 md:h-[400px] flex items-center justify-center text-zinc-400">
              Dashboard Preview Mockup
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 bg-zinc-50 dark:bg-zinc-950/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to scale</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Powerful tools for workers and seamless management for admins.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-none shadow-lg bg-white dark:bg-zinc-900">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                <Zap size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Payouts</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                No more waiting weeks for your money. Our automated system processes approved claims in seconds.
              </p>
            </Card>

            <Card className="p-8 border-none shadow-lg bg-white dark:bg-zinc-900">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-6 text-green-600">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Fraud Protection</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                AI-driven assessment engine detects anomalies instantly, keeping the ecosystem safe and fair.
              </p>
            </Card>

            <Card className="p-8 border-none shadow-lg bg-white dark:bg-zinc-900">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-6 text-purple-600">
                <Lock size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Bank-Grade Security</h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Your data and financial information are protected with industry-leading encryption standards.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* --- TRUST SECTION --- */}
      <section className="py-20 border-y dark:border-zinc-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-50 grayscale">
            <div className="flex justify-center font-bold text-2xl italic text-zinc-400">PARTNER_1</div>
            <div className="flex justify-center font-bold text-2xl italic text-zinc-400">PARTNER_2</div>
            <div className="flex justify-center font-bold text-2xl italic text-zinc-400">PARTNER_3</div>
            <div className="flex justify-center font-bold text-2xl italic text-zinc-400">PARTNER_4</div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t dark:border-zinc-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-blue-600" size={24} />
              <span className="text-lg font-bold">GigGuard</span>
            </div>
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} GigGuard Inc. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-zinc-500">
              <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-100">Privacy</Link>
              <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-zinc-100">Terms</Link>
              <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-100">Contact</Link>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}