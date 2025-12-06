import React from 'react';
import { ShoppingBag, Facebook, Instagram, Youtube, Twitter, Sparkles } from 'lucide-react';

export default function CartIndex() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* 1. Enhanced Empty State Section */}
      <div className="py-32 text-center px-4 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        </div>

        {/* Shopping bag icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <ShoppingBag className="w-20 h-20 text-gray-300" strokeWidth={1.5} />
            <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-light mb-4 text-gray-900 tracking-tight">
          Your cart is empty
        </h1>
        
        <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto font-light">
          Looks like you haven't added anything yet. Let's find something special for you.
        </p>

        <button className="group relative bg-black hover:bg-gray-900 text-white px-12 py-4 rounded-full text-sm font-medium tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
          <span className="relative z-10">Explore Products</span>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="absolute inset-0 flex items-center justify-center text-black font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            Let's Go →
          </span>
        </button>
      </div>

      {/* Elegant Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-gray-200"></div>
      </div>

      {/* 2. Enhanced Brand Philosophy Section */}
      <div className="py-32 text-center max-w-3xl mx-auto px-6">
        
        {/* Logo with improved animation */}
        <div className="mb-12 flex justify-center">
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative w-20 h-20 bg-black rounded-2xl flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-all duration-500 shadow-xl group-hover:shadow-2xl">
              <span className="text-white text-4xl font-bold font-serif select-none">SM</span>
            </div>
          </div>
        </div>

        {/* Headline with better spacing */}
        <h2 className="text-2xl md:text-3xl font-light mb-8 text-gray-900 tracking-wide leading-relaxed">
          A brand that strives to inspire and push creative culture forward
        </h2>
        
        {/* Description with improved readability */}
        <p className="text-gray-600 text-base leading-8 mb-16 font-light max-w-2xl mx-auto">
          We approach our work with the mentality that every product made is a learning experience to
          improve our craft. We are practitioners and purveyors of creative culture and are inspired
          by its various forms from art, design, fashion, music, film, food, and more.
        </p>

        {/* Enhanced Social Icons */}
        <div className="flex justify-center gap-6 items-center">
          <a href="#" className="group relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:text-blue-600 hover:border-blue-600 transition-all duration-300 hover:scale-110 bg-white">
              <Facebook className="w-5 h-5" />
            </div>
          </a>
          
          <a href="#" className="group relative">
            <div className="absolute inset-0 bg-pink-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:text-pink-600 hover:border-pink-600 transition-all duration-300 hover:scale-110 bg-white">
              <Instagram className="w-5 h-5" />
            </div>
          </a>
          
          <a href="#" className="group relative">
            <div className="absolute inset-0 bg-red-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:text-red-600 hover:border-red-600 transition-all duration-300 hover:scale-110 bg-white">
              <Youtube className="w-5 h-5" />
            </div>
          </a>
          
          <a href="#" className="group relative">
            <div className="absolute inset-0 bg-gray-900 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:text-gray-900 hover:border-gray-900 transition-all duration-300 hover:scale-110 bg-white">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </div>
          </a>
          
          <a href="#" className="group relative">
            <div className="absolute inset-0 bg-sky-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-900 hover:text-sky-500 hover:border-sky-500 transition-all duration-300 hover:scale-110 bg-white">
              <Twitter className="w-5 h-5" />
            </div>
          </a>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="pb-16"></div>
    </div>
  );
}