'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';

export default function SignOutPage() {
    const router = useRouter();

    // Form state
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form submission reload

        if (!fullName || !email || !password) {
            toast.error('Please fill in all the fields.');
            return;
        }

        toast.success('Signed up successfully!');

        setTimeout(() => {
            router.push('/auth/sign-in');
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600">
            <div className="text-sm absolute top-0 left-0 p-6 text-purple-700 flex items-center gap-2 cursor-pointer">
                <button
                    onClick={() => router.back()}
                    className="text-center flex items-center text-sm text-white font-medium"
                >
                    <span className="text-lg mr-1">‹</span> Back
                </button>
            </div>
            <div className="flex w-full max-w-6xl rounded-xl overflow-hidden shadow-xl bg-white/0 backdrop-blur-sm">
                {/* Left Form */}
                <div className="w-full md:w-1/2 bg-white p-10 rounded-tr-3xl rounded-br-3xl">
                    <h2 className="text-3xl font-bold mb-2 text-gray-800">Sign Up</h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Create your account to manage events with ease.
                    </p>

                    <form onSubmit={handleSignUp} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Your full name"
                                className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a password"
                                className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                        >
                            Sign Up
                        </button>
                        <p className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link
                                href="/sign-in"
                                className="text-purple-600 font-semibold cursor-pointer hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Right Illustration */}
                <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-bl from-indigo-500 to-purple-700">
                    <div className="relative w-[300px] h-[300px]">
                        <Image
                            src="/assets/Group 6.svg"
                            alt="Sign up illustration"
                            layout="fill"
                            objectFit="contain"
                            priority
                        />
                    </div>
                </div>
            </div>
            <ToastContainer position='top-center' autoClose={1000} />
        </div>
    );
}
