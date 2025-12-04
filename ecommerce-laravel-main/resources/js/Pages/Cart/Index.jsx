import React from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export default function CartIndex() {
  return (
    <PublicLayout>
      <Head title="Cart" />

      <div className="bg-white animate-in fade-in duration-500">
        
        {/* 1. Empty State Section */}
        <div className="py-24 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-normal mb-10 text-gray-900 tracking-tight">
            Your cart is empty
          </h1>
          <Link
            href={route('products.index')} >
            <button className="bg-[#FDE047] hover:bg-yellow-300 text-black px-10 py-4 rounded-lg text-sm font-medium tracking-wide transition-colors duration-200">
              Continue shopping
            </button>
          </Link>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100"></div>

        {/* 2. Brand Philosophy Section */}
        <div className="py-24 text-center max-w-2xl mx-auto px-6">
          
          {/* Logo */}
          <div className="mb-10 flex justify-center">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform duration-500 shadow-lg cursor-pointer">
              <span className="text-white text-3xl font-bold font-serif select-none">SM</span>
            </div>
          </div>

          {/* Headline */}
          <h2 className="text-lg md:text-xl font-normal mb-6 text-gray-900 tracking-wide">
            A brand that strives to inspire and push creative culture forward, CHATGPT W KDA HHH.
          </h2>
          
          {/* Paragraph text from image */}
          <p className="text-gray-500 text-sm leading-7 mb-12 font-light">
            We approach our work with the mentality that every product made is a learning experience to
            improve our craft. We are practitioners and purveyors of creative culture and are inspired
            by its various forms from art, design, fashion, music, film, food, and more.
          </p>

          {/* Social Icons */}
          <div className="flex justify-center gap-8 items-center">
            <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors transform hover:scale-110">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors transform hover:scale-110">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors transform hover:scale-110">
              <Youtube className="w-5 h-5" />
            </a>
            {/* Custom Tiktok Icon since it's not always standard in icon sets */}
            <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors transform hover:scale-110">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a href="#" className="text-gray-900 hover:text-gray-600 transition-colors transform hover:scale-110">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}