import Image from "next/image"
import Link from "next/link"

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About Us', href: '#' },
  { name: 'Products', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Contact Us', href: '#' },
];

const social = [
  { name: 'Instagram', icon: '/assets/instagram.jpg', href: '#' },
  { name: 'Twitter', icon: '/assets/twitter.jpg', href: '#' },
  { name: 'Facebook', icon: '/assets/facebook.jpg', href: '#' },
];

export default function FooterComponent() {
  return (
    <footer className="bg-[#f6f4ef] border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-12 md:gap-0 justify-between items-center md:items-start">
        {/* Logo and About */}
        <div className="flex flex-col items-center md:items-start gap-4 md:w-1/3">
          <div className="bg-[#232323] rounded-full w-12 h-12 flex items-center justify-center">
            <span className="text-2xl font-bold text-orange-500">C</span>
          </div>
          <p className="text-gray-700 text-center md:text-left max-w-xs text-sm">
            Discover the beauty within you. Modern, clean, and natural products for your everyday style.
          </p>
        </div>
        {/* Navigation */}
        <div className="flex flex-col items-center gap-2 md:w-1/3">
          <div className="flex flex-wrap gap-6 justify-center">
            {navLinks.map(link => (
              <Link key={link.name} href={link.href} className="text-gray-700 hover:text-orange-500 font-medium transition">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        {/* Social */}
        <div className="flex flex-col items-center gap-4 md:w-1/3">
          <div className="flex gap-4">
            {social.map(s => (
              <a key={s.name} href={s.href} aria-label={s.name} className="hover:scale-110 transition-transform">
                <Image src={s.icon} alt={s.name} width={28} height={28} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center text-gray-400 text-xs py-4 border-t border-gray-100">
        © 2024 C Company. All rights reserved.
      </div>
    </footer>
  )
}