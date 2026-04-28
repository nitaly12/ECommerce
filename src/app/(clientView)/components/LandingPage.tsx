'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import ListCardComponent from './ListCard';

const navLinks = [
  { name: 'Shop', href: '/shop' },
  { name: 'Marketplace', href: '/maketplace' },
  { name: 'Features', href: '/feature' },
  { name: 'Company', href: '/about' },
];

export default function LandingPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [dashboardHref, setDashboardHref] = useState('/sign-in');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setDashboardHref(localStorage.getItem('token') ? '/dashboard' : '/sign-in');
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMobileNavOpen(false);
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileNavOpen]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header
        ref={navRef}
        className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-md"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="-m-2.5 inline-flex rounded-lg p-2.5 text-slate-700 lg:hidden"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <span className="sr-only">Home</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-sm">
                E
              </span>
              <span className="hidden font-semibold tracking-tight text-slate-900 sm:inline text-lg">
                EdgeMart
              </span>
            </Link>
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="hidden rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 sm:inline-flex"
              aria-label="Notifications"
            >
              <BellIcon className="h-6 w-6" />
            </button>
            <Link
              href="/sign-in"
              className="hidden rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 sm:inline-block"
            >
              Sign in
            </Link>
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen((v) => !v)}
                className="relative flex rounded-full ring-2 ring-white ring-offset-2 ring-offset-slate-50 transition hover:ring-indigo-200"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
                aria-label="Account menu"
              >
                <Image
                  className="h-9 w-9 rounded-full object-cover"
                  src="/assets/category-page-04-image-card-04.jpg"
                  alt=""
                  width={36}
                  height={36}
                />
              </button>
              {userMenuOpen && (
                <div
                  className="absolute right-0 z-50 mt-2 w-52 origin-top-right rounded-xl border border-slate-200 bg-white py-1 shadow-lg"
                  role="menu"
                >
                  <span
                    className="block px-4 py-2 text-xs font-medium uppercase tracking-wide text-slate-400"
                    role="presentation"
                  >
                    Account
                  </span>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    role="menuitem"
                  >
                    Your profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    role="menuitem"
                  >
                    Settings
                  </a>
                  <Link
                    href="/sign-in"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    role="menuitem"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/sign-out"
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    role="menuitem"
                  >
                    Sign out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>

        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              aria-label="Close menu"
              onClick={() => setMobileNavOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 flex w-full max-w-xs flex-col bg-white shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
                <span className="text-lg font-semibold text-slate-900">Menu</span>
                <button
                  type="button"
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                  onClick={() => setMobileNavOpen(false)}
                  aria-label="Close menu"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-1 p-3">
                {navLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="rounded-xl px-4 py-3 text-base font-medium text-slate-800 hover:bg-indigo-50 hover:text-indigo-800"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/sign-in"
                  className="mt-4 rounded-xl bg-indigo-600 px-4 py-3 text-center text-base font-semibold text-white shadow-sm hover:bg-indigo-700"
                  onClick={() => setMobileNavOpen(false)}
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <section className="relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.22),transparent)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-1/4 -z-10 h-72 w-72 translate-x-1/3 rounded-full bg-indigo-400/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 -z-10 h-64 w-64 -translate-x-1/4 rounded-full bg-violet-400/15 blur-3xl"
        />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:pb-28 lg:pt-20">
          <div>
            <p className="inline-flex items-center rounded-full border border-indigo-200/80 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
              Curated for modern commerce
            </p>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Everything your storefront needs, in one place.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Browse the marketplace, manage inventory from your dashboard, and give customers a fast, polished experience from first click to checkout.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/maketplace"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition hover:bg-indigo-700"
              >
                Browse marketplace
              </Link>
              <Link
                href={dashboardHref}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
              >
                Open dashboard
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200/80 pt-10 sm:max-w-lg">
              {[
                { k: '24/7', v: 'Support' },
                { k: 'Fast', v: 'Checkout' },
                { k: 'Secure', v: 'Payments' },
              ].map((row) => (
                <div key={row.k}>
                  <dt className="text-2xl font-bold tracking-tight text-indigo-600 sm:text-3xl">{row.k}</dt>
                  <dd className="mt-1 text-sm font-medium text-slate-600">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative lg:justify-self-end">
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/5">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/10" />
              <Image
                src="/assets/category-page-04-image-card-01.jpg"
                alt="Featured products"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 28rem, 100vw"
                priority
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-md">
                <p className="text-sm font-semibold text-slate-900">Spring collection</p>
                <p className="mt-1 text-sm text-slate-600">New arrivals weekly — tap Shop to explore.</p>
                <Link
                  href="/shop"
                  className="mt-3 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Shop now →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ListCardComponent />
    </div>
  );
}
