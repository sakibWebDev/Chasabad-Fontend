// app/(public)/contact/page.tsx
'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import toast from 'react-hot-toast';

/* ================= ANIMATIONS ================= */

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

/* ================= SVG ICONS ================= */

const PhoneIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MessageIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const SendIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const HeadphoneIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 18v-6a9 9 0 0118 0v6" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const SparkleIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const GlobeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.913-12.086c0-.214 0-.428-.015-.642A9.936 9.936 0 0024 4.59z" />
  </svg>
);

/* ================= COMPONENT ================= */

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const contactInfo = [
    { 
      icon: PhoneIcon, 
      title: 'ফোন', 
      details: '+৮৮০ ১২৩৪ ৫৬৭৮৯০', 
      sub: 'সকাল ৯টা - রাত ৮টা',
      color: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600',
      href: 'tel:+8801234567890'
    },
    { 
      icon: MailIcon, 
      title: 'ইমেইল', 
      details: 'info@chashibhai.com', 
      sub: '২৪/৭ সাপোর্ট',
      color: 'bg-red-50 dark:bg-red-900/20',
      iconColor: 'text-red-600',
      href: 'mailto:info@chashibhai.com'
    },
    { 
      icon: MapPinIcon, 
      title: 'ঠিকানা', 
      details: 'ধানমন্ডি, ঢাকা - ১২০৯', 
      sub: 'বাংলাদেশ',
      color: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600',
      href: '#'
    },
    { 
      icon: ClockIcon, 
      title: 'কার্যকাল', 
      details: 'সকাল ৯টা - রাত ৮টা', 
      sub: 'শনিবার - বৃহস্পতিবার',
      color: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600',
      href: '#'
    }
  ];

  const socialLinks = [
    { icon: FacebookIcon, name: 'Facebook', color: 'bg-blue-600', href: 'https://facebook.com' },
    { icon: InstagramIcon, name: 'Instagram', color: 'bg-gradient-to-tr from-purple-600 to-pink-600', href: 'https://instagram.com' },
    { icon: YoutubeIcon, name: 'YouTube', color: 'bg-red-600', href: 'https://youtube.com' },
    { icon: LinkedinIcon, name: 'LinkedIn', color: 'bg-blue-700', href: 'https://linkedin.com' },
    { icon: TwitterIcon, name: 'Twitter', color: 'bg-sky-500', href: 'https://twitter.com' }
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('আপনার বার্তা সফলভাবে পাঠানো হয়েছে! আমরা খুব শীঘ্রই যোগাযোগ করব।');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      toast.error('বার্তা পাঠাতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900/20 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200/30 dark:bg-green-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-yellow-100/20 dark:bg-yellow-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-28 text-center">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <SparkleIcon />
            <span className="text-sm">যোগাযোগ করুন</span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent"
          >
            যোগাযোগ করুন
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-green-100 max-w-2xl mx-auto"
          >
            আপনার যেকোনো প্রশ্ন বা মতামত জানাতে আমাদের সাথে যোগাযোগ করুন
          </motion.p>
        </div>
        
        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path fill="#f0fdf4" fillOpacity="1" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,53.3C672,53,768,75,864,80C960,85,1056,75,1152,69.3C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
          </svg>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        
        {/* Contact Info Cards */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {contactInfo.map((info, i) => {
            const Icon = info.icon;
            return (
              <motion.a
                key={i}
                href={info.href}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center cursor-pointer"
              >
                <div className={`w-14 h-14 ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={info.iconColor}>
                    <Icon />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{info.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{info.details}</p>
                <p className="text-xs text-gray-500 mt-2">{info.sub}</p>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Contact Form & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInLeft}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <MessageIcon />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">পাঠান বার্তা</h2>
                  <p className="text-green-100 text-sm">আমরা ২৪ ঘন্টার মধ্যে উত্তর দেব</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">আপনার নাম *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 dark:bg-gray-700 dark:text-white ${
                      focusedField === 'name' 
                        ? 'border-green-500 shadow-lg ring-2 ring-green-200' 
                        : 'border-gray-200 dark:border-gray-600'
                    }`}
                    placeholder="আপনার নাম লিখুন"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">ইমেইল *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 dark:bg-gray-700 dark:text-white ${
                      focusedField === 'email' 
                        ? 'border-green-500 shadow-lg ring-2 ring-green-200' 
                        : 'border-gray-200 dark:border-gray-600'
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">ফোন নম্বর</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 dark:bg-gray-700 dark:text-white ${
                      focusedField === 'phone' 
                        ? 'border-green-500 shadow-lg ring-2 ring-green-200' 
                        : 'border-gray-200 dark:border-gray-600'
                    }`}
                    placeholder="০১XXXXXXXXX"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">বিষয় *</label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">বিষয় নির্বাচন করুন</option>
                    <option value="product">পণ্য সম্পর্কে</option>
                    <option value="order">অর্ডার সংক্রান্ত</option>
                    <option value="support">সাপোর্ট</option>
                    <option value="feedback">মতামত</option>
                    <option value="partnership">পার্টনারশিপ</option>
                    <option value="other">অন্যান্য</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">বার্তা *</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all duration-300 dark:bg-gray-700 dark:text-white resize-none ${
                    focusedField === 'message' 
                      ? 'border-green-500 shadow-lg ring-2 ring-green-200' 
                      : 'border-gray-200 dark:border-gray-600'
                  }`}
                  placeholder="আপনার বার্তা বিস্তারিত লিখুন..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
              >
                {sending ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    পাঠানো হচ্ছে...
                  </>
                ) : (
                  <>
                    <SendIcon />
                    বার্তা পাঠান
                    <ArrowIcon />
                  </>
                )}
              </motion.button>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <CheckIcon />
                  <span>দ্রুত উত্তর</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <ShieldIcon />
                  <span>গোপনীয়তা সুরক্ষিত</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <HeadphoneIcon />
                  <span>২৪/৭ সাপোর্ট</span>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInRight}
            className="space-y-6"
          >
            {/* Map Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden group">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <MapPinIcon />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">আমাদের অবস্থান</h3>
                    <p className="text-blue-100 text-sm">ধানমন্ডি, ঢাকা</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-xl h-64 flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <MapPinIcon />
                  <p className="text-gray-600 dark:text-gray-400 text-center mt-3">
                    ধানমন্ডি ২৭<br />
                    ঢাকা - ১২০৯, বাংলাদেশ
                  </p>
                  <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition">
                    গুগল ম্যাপে দেখুন
                  </button>
                </div>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <GlobeIcon />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">সোশ্যাল মিডিয়া</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                আমাদের সাথে যুক্ত থাকুন এবং সর্বশেষ আপডেট পান
              </p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, i) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -5, scale: 1.1 }}
                      className={`w-14 h-14 ${social.color} text-white rounded-2xl flex items-center justify-center hover:shadow-xl transition-all`}
                    >
                      <Icon />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* FAQ Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-xl p-6 border border-green-100 dark:border-green-800"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">প্রায়শই জিজ্ঞাসিত প্রশ্ন?</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    সাধারণ প্রশ্নের উত্তর পেতে আমাদের FAQ দেখুন
                  </p>
                  <Link href="/faq">
                    <button className="px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition flex items-center gap-2 group">
                      FAQ দেখুন
                      <ArrowIcon />
                    </button>
                  </Link>
                </div>
                <div className="w-16 h-16 bg-green-200 dark:bg-green-800 rounded-2xl flex items-center justify-center">
                  <MessageIcon />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Support Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="bg-gradient-to-r from-green-900 to-emerald-900 text-white py-16 mt-8"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
            <HeadphoneIcon />
            <span className="text-sm">২৪/৭ সাপোর্ট</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4">২৪/৭ কাস্টমার সাপোর্ট</h2>
          <p className="text-lg text-green-200 mb-8 max-w-2xl mx-auto">
            যেকোনো সমস্যায় আমাদের হটলাইনে কল করুন। আমরা ২৪ ঘন্টা আপনার পাশে আছি।
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href="tel:+8801234567890"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-green-700 rounded-xl font-semibold flex items-center gap-3 hover:bg-gray-100 transition shadow-lg"
            >
              <PhoneIcon />
              +৮৮০ ১২৩৪ ৫৬৭৮৯০
            </motion.a>
            
            <motion.a
              href="https://wa.me/8801234567890"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-green-500 text-white rounded-xl font-semibold flex items-center gap-3 hover:bg-green-600 transition shadow-lg"
            >
              <SmartphoneIcon />
              হোয়াটসঅ্যাপ
            </motion.a>
          </div>
          
          <p className="text-sm text-green-300 mt-6">
            * কল করার সময় সকাল ৯টা থেকে রাত ৮টা। হোয়াটসঅ্যাপে ২৪/৭ মেসেজ করতে পারবেন।
          </p>
        </div>
      </motion.div>
    </div>
  );
}

// Smartphone Icon Component
const SmartphoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);