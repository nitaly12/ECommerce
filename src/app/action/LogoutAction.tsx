'use client';

import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

export default function LogoutAction() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    toast.success("Logged out successfully!");

    // Wait for toast to show before redirecting
    setTimeout(() => {
      router.push('/auth/sign-in');
    }, 1500); // Match with toast duration
  };

  const modalContent = (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center w-full h-screen bg-opacity-20 inset-0 backdrop-blur-sm bg-white/0 ">
      <div
        ref={menuRef}
        className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-10 relative"
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          ✕
        </button>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Are you sure you want to log out?
          </h3>
          <button
            onClick={handleLogout}
            className="inline-block bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 mr-2"
          >
            Yes, log me out
          </button>
          <button
            onClick={() => setMenuOpen(false)}
            className="inline-block bg-gray-200 text-gray-700 px-4 py-1 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <svg className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
          <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
        </svg>
        <button onClick={() => setMenuOpen(true)}>Sign Out</button>
        
      </div>

      {mounted && menuOpen && createPortal(modalContent, document.getElementById('modal-root')!)}
    </>
  );
}
