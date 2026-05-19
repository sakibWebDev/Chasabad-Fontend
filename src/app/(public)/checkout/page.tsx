// app/(public)/checkout/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/lib/hooks/useAppSelector'
import { clearCart } from '@/lib/features/cart/cartSlice';
import { Truck, CreditCard, Banknote, Shield, CheckCircle, ArrowLeft, User, LogIn } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Redux থেকে ডাটা নিন
  const { items: cartItems, totalPrice, totalQuantity } = useAppSelector((state) => state.cart);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [placing, setPlacing] = useState(false);

  // ফর্ম ডাটা - Auth ইউজার থাকলে অটো-ফিল
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Dhaka',
    area: '',
    postalCode: '',
    notes: ''
  });

  // ইউজার লগইন থাকলে তথ্য অটো-ফিল করুন
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      }));
    }
  }, [isAuthenticated, user]);

  // চেকআউটের আগে কার্ট চেক করা
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center py-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">কার্ট খালি!</h2>
            <p className="text-gray-500 mb-6">দয়া করে প্রথমে পণ্য কার্টে যোগ করুন</p>
            <Link href="/shop/all">
              <button className="px-6 py-3 bg-green-600 text-white rounded-xl">
                কেনাকাটা শুরু করুন
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const cartSummary = {
    subtotal: totalPrice,
    shipping: totalPrice > 1000 ? 0 : 60,
    total: totalPrice + (totalPrice > 1000 ? 0 : 60),
    items: totalQuantity
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🟢 অর্ডার সেভ করার ফাংশন
  const saveOrderToLocalStorage = (orderData: any) => {
    try {
      // আগের অর্ডারগুলো লোড করুন
      const previousOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      // নতুন অর্ডার তৈরি করুন
      const newOrder = {
        ...orderData,
        orderId: `ORDER_${Date.now()}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      // নতুন অর্ডার যোগ করুন
      const updatedOrders = [newOrder, ...previousOrders];
      
      // লোকাল স্টোরেজে সেভ করুন
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      
      // শেষ অর্ডারটি আলাদাভাবে সেভ করুন (দ্রুতアクセスのために)
      localStorage.setItem('lastOrder', JSON.stringify(newOrder));
      
      return newOrder.orderId;
    } catch (error) {
      console.error('Failed to save order:', error);
      toast.error('অর্ডার সেভ করতে সমস্যা হয়েছে');
      return null;
    }
  };

  // 🟢 ইমেইল সিমুলেশন ফাংশন (API কলের জন্য)
  const sendOrderConfirmationEmail = async (orderData: any) => {
    // এখানে আপনার ইমেইল API কল করবেন
    console.log('Sending email to:', orderData.customer.email);
    console.log('Order details:', orderData);
    
    // সিমুলেশন - 실제 প্রোডাকশনে ইমেইল সার্ভিস ব্যবহার করবেন
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // 🟢 এসএমএস সিমুলেশন ফাংশন (API কলের জন্য)
  const sendOrderConfirmationSMS = async (orderData: any) => {
    // এখানে আপনার SMS API কল করবেন
    console.log('Sending SMS to:', orderData.customer.phone);
    
    return new Promise((resolve) => setTimeout(resolve, 500));
  };

  // 🟢 অর্ডার সাবমিট হ্যান্ডলার
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ভ্যালিডেশন
    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error('দয়া করে প্রয়োজনীয় তথ্য পূরণ করুন!');
      return;
    }
    
    setPlacing(true);
    
    try {
      // অর্ডার ডাটা প্রস্তুত করুন
      const orderData = {
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          area: formData.area,
          postalCode: formData.postalCode,
        },
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        })),
        paymentMethod: paymentMethod,
        subtotal: cartSummary.subtotal,
        shipping: cartSummary.shipping,
        total: cartSummary.total,
        notes: formData.notes,
        userId: isAuthenticated ? user?.id : null,
        customerType: isAuthenticated ? 'registered' : 'guest',
      };
      
      // 1. অর্ডার লোকাল স্টোরেজে সেভ করুন
      const orderId = saveOrderToLocalStorage(orderData);
      
      if (!orderId) {
        throw new Error('Failed to save order');
      }
      
      // 2. ইমেইল কনফার্মেশন পাঠান (যদি ইমেইল থাকে)
      if (formData.email) {
        await sendOrderConfirmationEmail({ ...orderData, orderId });
      }
      
      // 3. এসএমএস কনফার্মেশন পাঠান
      await sendOrderConfirmationSMS({ ...orderData, orderId });
      
      // 4. কার্ট ক্লিয়ার করুন
      dispatch(clearCart());
      
      // 5. লোকাল স্টোরেজ থেকে কার্ট ক্লিয়ার করুন
      localStorage.removeItem('localCart');
      
      // 6. সাকসেস মেসেজ দেখান
      toast.success('অর্ডার সফলভাবে সম্পন্ন হয়েছে!', {
        icon: '🎉',
        duration: 4000,
      });
      
      // 7. অর্ডার কনফার্মেশন পেজে রিডাইরেক্ট করুন
      router.push(`/order-confirmation?orderId=${orderId}`);
      
    } catch (error) {
      console.error('Order submission failed:', error);
      toast.error('অর্ডার সম্পন্ন করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Link 
          href="/cart" 
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 transition mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          কার্টে ফিরুন
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">চেকআউট</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billing Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">বিলিং তথ্য</h2>
                {!isAuthenticated && (
                  <Link 
                    href="/login?redirect=/checkout"
                    className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                  >
                    <LogIn className="h-3 w-3" />
                    লগইন করুন
                  </Link>
                )}
              </div>
              
              {/* Login Prompt */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                      {isAuthenticated ? (
                        <>আপনি {user?.name} হিসেবে লগইন আছেন</>
                      ) : (
                        <>আপনি অতিথি হিসেবে অর্ডার করছেন</>
                      )}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                      {isAuthenticated ? (
                        <>আপনার সংরক্ষিত ঠিকানা ব্যবহার করা হয়েছে</>
                      ) : (
                        <button 
                          type="button"
                          onClick={() => router.push('/login?redirect=/checkout')}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                        >
                          <LogIn className="h-3 w-3" />
                          লগইন করলে আপনার তথ্য সংরক্ষিত থাকবে
                        </button>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">পূর্ণ নাম *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 dark:bg-gray-700"
                    placeholder="আপনার নাম"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ইমেইল</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 dark:bg-gray-700"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ফোন নম্বর *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 dark:bg-gray-700"
                    placeholder="০১XXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">শহর *</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 dark:bg-gray-700"
                  >
                    <option>Dhaka</option>
                    <option>Chittagong</option>
                    <option>Rajshahi</option>
                    <option>Khulna</option>
                    <option>Sylhet</option>
                    <option>Barishal</option>
                    <option>Rangpur</option>
                    <option>Mymensingh</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">ঠিকানা *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 dark:bg-gray-700"
                    placeholder="বাড়ির নম্বর, রাস্তা, এলাকা"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">থানা/এলাকা</label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 dark:bg-gray-700"
                    placeholder="এলাকার নাম"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">পোস্টাল কোড</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 dark:bg-gray-700"
                    placeholder="১২৩০"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">অর্ডার নোট (ঐচ্ছিক)</label>
                  <textarea
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 dark:bg-gray-700"
                    placeholder="ডেলিভারির জন্য বিশেষ নির্দেশনা..."
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t dark:border-gray-700">
                <h3 className="font-semibold mb-3">পেমেন্ট পদ্ধতি</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="w-4 h-4 text-green-600"
                    />
                    <Banknote className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">ক্যাশ অন ডেলিভারি</p>
                      <p className="text-xs text-gray-500">ডেলিভারির সময় নগদে পেমেন্ট করুন</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <input
                      type="radio"
                      name="payment"
                      value="bkash"
                      checked={paymentMethod === 'bkash'}
                      onChange={() => setPaymentMethod('bkash')}
                      className="w-4 h-4 text-green-600"
                    />
                    <CreditCard className="h-5 w-5 text-pink-500" />
                    <div>
                      <p className="font-medium">bKash / Rocket / Nagad</p>
                      <p className="text-xs text-gray-500">মোবাইল ব্যাংকিং</p>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={placing}
                className="w-full mt-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {placing ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    অর্ডার প্রসেসিং...
                  </span>
                ) : (
                  'অর্ডার কনফার্ম করুন'
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">অর্ডার সামারি</h2>
              
              {/* Cart Items Preview */}
              <div className="max-h-48 overflow-y-auto mb-4 space-y-2">
                {cartItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x {item.quantity}</span>
                    <span>৳{item.totalPrice}</span>
                  </div>
                ))}
                {cartItems.length > 3 && (
                  <p className="text-xs text-gray-500">+ আরও {cartItems.length - 3} টি আইটেম</p>
                )}
              </div>
              
              <div className="space-y-3 pb-4 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">পণ্যের মূল্য</span>
                  <span>৳{cartSummary.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ডেলিভারি চার্জ</span>
                  <span className={cartSummary.shipping === 0 ? 'text-green-600' : ''}>
                    {cartSummary.shipping === 0 ? 'ফ্রি' : `৳${cartSummary.shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3">
                  <span>মোট</span>
                  <span className="text-green-600">৳{cartSummary.total}</span>
                </div>
              </div>
              
              <div className="mt-4 space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span>২-৩ কার্যদিবসের মধ্যে ডেলিভারি</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>৭ দিনের রিটার্ন পলিসি</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>১০০% মান নিশ্চিত</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}