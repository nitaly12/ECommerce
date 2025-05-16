'use client'
import Image from 'next/image'

export default function AboutUsPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <Image
          src="/assets/download (4).jpg"
          alt="About Us"
          layout="fill"
          objectFit="cover"
          className="opacity-70"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold">About Us</h1>
        </div>
      </section>

      {/* Company Info */}
      <section className="max-w-5xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
        <p className="text-lg leading-relaxed">
          We’re a passionate team of developers, designers, and strategists building powerful digital experiences. Our mission is to empower businesses with modern technology and design that delivers results.
        </p>
      </section>

      {/* Mission & Values */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p>We stay ahead of trends to bring innovative solutions that solve real problems.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Transparency</h3>
              <p>We believe in open, honest communication and building trust with our clients.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p>We work as partners, not vendors. Your success is our success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { name: 'Alice Johnson', role: 'CEO', image: '/assets/mega-menu-category-01.jpg' },
            { name: 'Michael Chen', role: 'Lead Developer', image: '/assets/mega-menu-category-01.jpg' },
            { name: 'Sophia Lee', role: 'UI/UX Designer', image: '/assets/mega-menu-category-01.jpg' },
          ].map((member, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-4 text-center">
              <Image
                src={member.image}
                alt={member.name}
                width={150}
                height={150}
                className="mx-auto rounded-full object-cover"
              />
              <h4 className="mt-4 text-lg font-semibold">{member.name}</h4>
              <p className="text-sm text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Us on Our Journey</h2>
        <p className="mb-6 text-lg">We’re always looking for passionate people and exciting projects. Let’s build something amazing together.</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded font-semibold hover:bg-gray-100 transition">
          Contact Us
        </button>
      </section>
    </div>
  )
}