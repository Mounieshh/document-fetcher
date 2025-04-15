"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  // Simulate auth state (replace with real auth logic)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null); // null, 'admin', or 'user'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Simulate logout (replace with real logout logic)
  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-2xl font-bold text-blue-500">Logo</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {!isLoggedIn ? (
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
            ) : role === 'admin' ? (
              <>
                <Link href="/dashboard">
                  <span className="text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                    Dashboard
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/posts/create">
                  <span className="text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition">
                    Form
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
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
            {!isLoggedIn ? (
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
            ) : role === 'admin' ? (
              <>
                <Link href="/dashboard">
                  <span className="block text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium transition">
                    Dashboard
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/posts/create">
                  <span className="block text-gray-700 hover:bg-blue-500 hover:text-white px-3 py-2 rounded-md text-base font-medium transition">
                    Form
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
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