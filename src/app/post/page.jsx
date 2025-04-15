"use client";

import { useState } from 'react';

export default function CreatePost() {
  const [heading, setHeading] = useState('');
  const [body, setBody] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [date, setDate] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError(null);
    setPdfUrl(null);

    if (!pdfFile) {
      setError('Please select a PDF file.');
      setUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('pdf', pdfFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      setPdfUrl(result.url);
      setHeading('');
      setBody('');
      setPdfFile(null);
      setDate('');
      alert(`PDF uploaded! Link: ${result.url}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="heading">
              Heading
            </label>
            <input
              type="text"
              id="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post heading"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="body">
              Body
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter post content"
              rows="5"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="pdf">
              Upload PDF
            </label>
            <input
              type="file"
              id="pdf"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files[0])}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {error && (
          <div className="mb-4 text-red-500 text-center">{error}</div>
        )}
        {pdfUrl && (
          <div className="mb-4 text-green-500 text-center">
            <p>PDF Uploaded Successfully!</p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {pdfUrl}
            </a>
          </div>
        )}
          <button
            type="submit"
            disabled={uploading}
            className={`w-full p-3 rounded-lg transition ${
              uploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {uploading ? 'Uploading...' : 'Submit Post'}
          </button>
        </form>
      </div>
    </div>
  );
}