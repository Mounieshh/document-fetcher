'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function protectRoute({ requireAuth = false, allowedRoles = [], redirectIfLoggedIn = false }) {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    let user = null;

    if (storedUser && storedToken) {
      try {
        user = JSON.parse(storedUser);
      } catch (e) {
        console.error('Invalid user data in localStorage');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }

    if (redirectIfLoggedIn && user) {
      // Redirect logged-in users from /login
      const redirectTo = user.role === 'admin' ? '/admin' : '/post';
      router.replace(redirectTo); // Use replace to avoid history entry
      return;
    }

    if (requireAuth) {
      if (!user || !storedToken) {
        router.replace('/login'); // Use replace for unauthenticated
        return;
      }
      if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        router.replace('/login'); // Use replace for unauthorized roles
        return;
      }
    }
  }, [router, requireAuth, allowedRoles, redirectIfLoggedIn]);

  return !!localStorage.getItem('user') && !!localStorage.getItem('token');
}