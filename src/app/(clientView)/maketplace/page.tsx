'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const products = [
  {
    id: 1,
    title: 'Pro Smartwatch',
    price: 199.99,
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
    title: 'Classic Cotton Tees',
    price: 49.99,
    image: '/assets/mega-menu-category-02.jpg',
    category: 'Fashion',
  },
  {
    id: 4,
    title: 'Everyday Essentials Tee',
    price: 39.99,
    image: '/assets/mega-menu-category-01.jpg',
    category: 'Fashion',
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
    title: 'Pro Smartwatch',
    price: 199.99,
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
];

const categories = ['All', 'Electronics', 'Fashion', 'Accessories'];

export default function MarketplacePage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-indigo-50/40">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden />
            Back
          </button>

          <div className="relative w-full sm:max-w-md">
            <MagnifyingGlassIcon
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-11 pr-4 text-slate-900 shadow-inner outline-none ring-0 transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">Marketplace</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Discover products you will love
          </h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Browse by category or search by name. Prices and imagery are demo content for layout.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-56">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-1 shadow-sm">
              <div className="border-b border-slate-100 px-4 py-3">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Categories</h2>
              </div>
              <ul className="p-2">
                {categories.map((cat) => {
                  const active = category === cat;
                  return (
                    <li key={cat}>
                      <button
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                          active
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{cat}</span>
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-white/90" aria-hidden />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <main className="min-w-0 flex-1">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm text-slate-600">
                Showing{' '}
                <span className="font-semibold text-slate-900">{filteredProducts.length}</span> result
                {filteredProducts.length === 1 ? '' : 's'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/60 px-6 py-16 text-center">
                  <p className="text-lg font-medium text-slate-900">No products found</p>
                  <p className="mt-2 max-w-sm text-sm text-slate-600">
                    Try a different search or pick another category.
                  </p>
                </div>
              )}

              {filteredProducts.map(({ id, title, price, image, category: productCategory }, index) => (
                <motion.article
                  key={id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, type: 'spring', stiffness: 320, damping: 26 }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
                      {productCategory}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-semibold leading-snug text-slate-900">{title}</h3>
                    <p className="mt-3 text-2xl font-bold tracking-tight text-indigo-600">${price.toFixed(2)}</p>
                    <div className="mt-auto flex gap-2 pt-5">
                      <button
                        type="button"
                        className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        className="flex-1 rounded-xl bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                      >
                        Buy now
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
