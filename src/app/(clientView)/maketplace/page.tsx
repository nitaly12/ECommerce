'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
const products = [
  {
    id: 1,
    title: 'Wireless Headphones',
    price: 99.99,
    image: '/assets/apple-watch.png',
    category: 'Electronics',
  },
  {
    id: 2,
    title: 'Stylish Sneakers',
    price: 79.99,
    image: '/assets/images.jpg',
    category: 'Fashion',
  },
  {
    id: 3,
    title: 'Smart Watch',
    price: 199.99,
    image: '/assets/mega-menu-category-02.jpg',
    category: 'Electronics',
  },
  {
    id: 4,
    title: 'Leather Wallet',
    price: 39.99,
    image: '/assets/mega-menu-category-01.jpg',
    category: 'Accessories',
  },
  {
    id: 5,
    title: 'Leather Wallet',
    price: 39.99,
    image: '/assets/mega-menu-category-01.jpg',
    category: 'Accessories',
  },
  {
    id: 6,
    title: 'Wireless Headphones',
    price: 99.99,
    image: '/assets/apple-watch.png',
    category: 'Electronics',
  },
  {
    id: 7,
    title: 'Stylish Sneakers',
    price: 79.99,
    image: '/assets/images.jpg',
    category: 'Fashion',
  },
  // Add more products...
];

const categories = ['All', 'Electronics', 'Fashion', 'Accessories'];

export default function MarketplacePage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <header className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className=' flex justify-between items-center'>
          <div className=" absolute top-0 left-0 p-6 ">
            <button
              onClick={() => router.back()}
              className=" dark:bg-gray-800 px-2 text-center rounded-full shadow-md  text-centerflex  items-center text-sm text-indigo-600 hover:text-indigo-800 font-medium "
            >
              <span className="text-lg mr-1">‹</span> Back
            </button>
          </div>
          <div>
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-col sm:flex-row gap-8">
        {/* Sidebar - Categories */}
        <aside className="w-full sm:w-48 bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">Categories</h2>
          <ul>
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => setCategory(cat)}
                className={`cursor-pointer p-2 rounded hover:bg-indigo-100 ${
                  category === cat ? 'bg-indigo-200 font-semibold' : ''
                  }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* Products Grid */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-6">
          {filteredProducts.length === 0 && (
            <p className="text-gray-600 col-span-full text-center">No products found.</p>
          )}

          {filteredProducts.map(({ id, title, price, image }) => (
            <motion.div
              key={id}
              className="bg-white rounded shadow hover:shadow-lg cursor-pointer overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="relative h-48 w-full">
                <Image src={image} alt={title} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-indigo-600 font-bold text-xl mb-4">${price.toFixed(2)}</p>
                <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </main>
      </div>
    </div>
  );
}
