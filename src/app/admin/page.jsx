//src/app/admin/page.jsx

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { protectRoute } from '@/lib/protectRoute';

export default function AdminPage() {
  const [docs, setDocs] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const isAuthenticated = protectRoute({ requireAuth: true, allowedRoles: ['admin'] });

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchDocs = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('https://hyperready-backend.onrender.com/api/doc', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch docs');
        }

        const data = await response.json();
        setDocs(data);
        setFilteredDocs(data);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching documents');
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, [isAuthenticated]);

  const handleSearch = (query) => {
    setSearch(query);
    const lowerQuery = query.toLowerCase();

    const results = docs.filter((doc) => {
      return (
        doc.title?.toLowerCase().includes(lowerQuery) ||
        doc.body?.toLowerCase().includes(lowerQuery) ||
        doc.userId?.toString().includes(lowerQuery) ||
        doc.date?.toLowerCase().includes(lowerQuery)
      );
    });

    setFilteredDocs(results);
  };

  if (!isAuthenticated) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Admin Panel - Document Search</h1>
        <Link href="/admin/create">
          <button className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Create New User
          </button>
        </Link>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by title, body, userId, or date..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Loading State */}
        {loading ? (
          <p className="text-white">Loading documents...</p>
        ) : filteredDocs.length === 0 ? (
          <p className="text-white">No matching documents found.</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {filteredDocs.map((doc, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-white">{doc.title}</h2>
                <p className="text-gray-400 mt-2">{doc.body}</p>
                {doc.doc_url && (
                  <a
                    href={doc.doc_url}
                    target="_blank"
                    rel=""
                    className="text-blue-400 hover:underline mt-4 inline-block"
                  >
                    View Document
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}