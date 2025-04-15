'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Sync user state with localStorage
  const syncUser = () => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Invalid user data in localStorage');
        handleSignOut();
      }
    } else {
      setUser(null);
    }
  };

  // Check localStorage on mount and listen for changes
  useEffect(() => {
    syncUser();
    const handleStorageChange = (e) => {
      if (e.key === 'user' || e.key === 'token') {
        syncUser();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle sign out
  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-blue-500">HyperReady</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {!user ? (
              <>
                <Link href="/register">
                  <span className="text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                    Register
                  </span>
                </Link>
                <Link href="/login">
                  <span className="text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                    Login
                  </span>
                </Link>
              </>
            ) : user.role === 'admin' ? (
              <>
                <Link href="/admin">
                  <span className="text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                    Dashboard
                  </span>
                </Link>
                <Link href="/admin/create">
                  <span className="text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                    Create User
                  </span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/post">
                  <span className="text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                    Posts
                  </span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    Logout
                  </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-500 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {!user ? (
              <>
                <Link href="/register">
                  <span className="block text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium transition">
                    Register
                  </span>
                </Link>
                <Link href="/login">
                  <span className="block text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium transition">
                    Login
                  </span>
                </Link>
              </>
            ) : user.role === 'admin' ? (
              <>
                <Link href="/admin">
                  <span className="block text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium transition">
                    Dashboard
                  </span>
                </Link>
                <Link href="/admin/create">
                  <span className="block text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium transition">
                    Create User
                  </span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/post">
                  <span className="block text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium transition">
                    Posts
                  </span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium transition"
                  >
                    Logout
                  </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}