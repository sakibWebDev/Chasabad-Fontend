// app/(public)/layout.tsx (Simplified with components)
'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
    
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all z-50 group"
        >
          <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition" />
        </button>
      )}

      {/* WhatsApp Chat Button */}
      <a
        href="https://wa.me/8801234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 left-8 p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all z-50 group"
      >
        <MessageCircle className="h-6 w-6 group-hover:scale-110 transition" />
      </a>
    </div>
  );
}