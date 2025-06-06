'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About Us', href: '#' },
  { name: 'Products', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Contact Us', href: '#' },
];

const heroImages = [
  '/assets/mega-menu-category-01.jpg',
  '/assets/mega-menu-category-02.jpg',
  '/assets/mega-menu-category-01.jpg',
  '/assets/mega-menu-category-01.jpg',
];

const collection = [
  {
    id: 1,
    image: '/assets/images (1).jpg',
    label: 'Featured',
    title: 'Bold Street Style',
    featured: true,
  },
  {
    id: 2,
    image: '/assets/images (2).jpg',
    label: 'TRENDS',
    title: 'Modern Essentials',
    featured: false,
  },
  {
    id: 3,
    image: '/assets/images (3).jpg',
    label: '',
    title: 'Sporty Yellow',
    featured: false,
  },
  {
    id: 4,
    image: '/assets/images (4).jpg',
    label: 'Our Recent collection',
    title: 'Cozy Outdoors',
    featured: false,
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f4ef] font-serif">
      {/* Navbar */}
      <header className="w-full px-4 py-4 flex items-center justify-between bg-[#232323] rounded-b-2xl shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-[#f6f4ef] rounded-full w-10 h-10 flex items-center justify-center">
            <span className="text-2xl font-bold text-orange-500">C</span>
          </div>
        </div>
        <nav className="hidden md:flex gap-8 text-white font-medium">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-orange-500 transition">{link.name}</Link>
          ))}
        </nav>
        <div className="flex gap-2">
          <button className="px-4 py-1 rounded bg-[#232323] border border-white text-white hover:bg-white hover:text-[#232323] transition">LOG IN</button>
          <button className="px-4 py-1 rounded bg-white text-[#232323] font-semibold hover:bg-orange-500 hover:text-white transition">SIGN UP</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 py-16 px-4">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#232323] leading-tight">Discover The Beauty<br />Within You</h1>
          <p className="text-base md:text-lg text-[#232323] max-w-md">
            Free from harmful chemicals with nourishing botanicals, and designed to deliver visible results without compromising your skin's health.
          </p>
          {/* <button >GET STARTED</button> */}
          <Link href={`/dashboard`} className="w-fit px-6 py-2 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 transition"> GET STARTED </Link>
        </div>
        <div className="flex-1 flex flex-col gap-4 items-end">
          <div className="flex gap-4">
            {heroImages.map((img, i) => (
              <div key={i} className="rounded-2xl overflow-hidden w-24 h-32 bg-gray-200">
                <Image src={img} alt="hero" width={96} height={128} className="object-cover w-full h-full" unoptimized />
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium shadow">
            <span className="inline-block w-4 h-4 bg-white rounded-full mr-2" />
            Number 1 trusted company
          </div>
        </div>
      </section>

      {/* Recent Collection Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-12">
        <div className="text-2xl md:text-3xl font-bold text-[#232323] mb-8">Our Recent Collection</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {collection.map((item, idx) => (
            <div key={item.id} className="relative rounded-3xl overflow-hidden group shadow-lg bg-white">
              <Image src={item.image} alt={item.title} width={400} height={500} className="object-cover w-full h-80 group-hover:scale-105 transition-transform duration-300" />
              {item.label && (
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${item.featured ? 'bg-orange-100 text-orange-600' : 'bg-orange-500 text-white'} shadow`}>{item.label}</span>
              )}
              <div className="absolute bottom-4 left-4 right-4 bg-white/80 rounded-xl px-4 py-2 shadow text-[#232323] font-semibold text-lg group-hover:bg-white">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
