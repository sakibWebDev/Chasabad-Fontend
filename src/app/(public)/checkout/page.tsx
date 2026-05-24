// app/(public)/checkout/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { clearCart } from '@/lib/features/cart/cartSlice';
import { createOrder } from '@/lib/features/order/orderSlice';
import { 
  Truck, CreditCard, Banknote, Shield, CheckCircle, ArrowLeft, 
  User, LogIn, Wallet, Smartphone, Building2, Lock, AlertCircle,
  ChevronRight, Sparkles, Star, Gift, Clock, Home
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const { items: cartItems, totalPrice, totalQuantity } = useAppSelector((state) => state.cart);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { loading } = useAppSelector((state) => state.order);
  
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [placing, setPlacing] = useState(false);
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);

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

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center py-16">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">কার্ট খালি!</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">দয়া করে প্রথমে পণ্য কার্টে যোগ করুন</p>
            <Link href="/shop/all">
              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition shadow-lg">
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.phone || !formData.address) {
      toast.error('দয়া করে প্রয়োজনীয় তথ্য পূরণ করুন!');
      return;
    }
    
    if (!formData.email) {
      toast.error('দয়া করে ইমেইল ঠিকানা দিন!');
      return;
    }
    
    setPlacing(true);
    
    try {
      const orderData = {
        items: cartItems.map(item => ({
          seedId: String(item.id),
          unit_price: item.price,
          quantity: item.quantity,
          total_price: item.totalPrice,
        })),
        total_amount: cartSummary.subtotal,
        discount: 0,
        tax: 0,
        shipping_cost: cartSummary.shipping,
        grand_total: cartSummary.total,
        payment_method: paymentMethod,
        shipping_address: `${formData.address}, ${formData.area}, ${formData.city}${formData.postalCode ? `, ${formData.postalCode}` : ''}`,
        shipping_phone: formData.phone,
        notes: formData.notes,
      };
      
      const result = await dispatch(createOrder(orderData as any)).unwrap();
      
      if (result) {
        // If SSLCommerz selected, initiate payment
        if (paymentMethod === 'sslcommerz') {
          try {
            const token = localStorage.getItem('accessToken');
            const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/init`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ orderId: result.id })
            });
            
            const paymentResult = await paymentResponse.json();
            
            if (paymentResult.success && paymentResult.gatewayUrl) {
              window.location.href = paymentResult.gatewayUrl;
            } else {
              toast.error(paymentResult.message || 'পেমেন্ট শুরু করতে সমস্যা হয়েছে');
              setPlacing(false);
            }
          } catch (paymentError) {
            console.error('Payment initiation error:', paymentError);
            toast.error('পেমেন্ট শুরু করতে সমস্যা হয়েছে');
            setPlacing(false);
          }
        } else {
          // For COD and bKash (manual), proceed normally
          dispatch(clearCart());
          localStorage.removeItem('localCart');
          
          toast.success('অর্ডার সফলভাবে সম্পন্ন হয়েছে!', {
            icon: '🎉',
            duration: 4000,
          });
          
          router.push(`/order-confirmation?orderId=${result.orderId}`);
        }
      }
      
    } catch (error: any) {
      console.error('Order submission failed:', error);
      toast.error(error?.message || 'অর্ডার সম্পন্ন করতে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
      setPlacing(false);
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case 'cod':
        return <Banknote className="h-5 w-5 text-green-600" />;
      case 'bkash':
        return <Smartphone className="h-5 w-5 text-pink-500" />;
      case 'sslcommerz':
        return <Building2 className="h-5 w-5 text-blue-600" />;
      default:
        return <CreditCard className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPaymentGradient = (method: string) => {
    switch (method) {
      case 'cod':
        return 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800';
      case 'bkash':
        return 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 border-pink-200 dark:border-pink-800';
      case 'sslcommerz':
        return 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800';
      default:
        return 'hover:bg-gray-50 dark:hover:bg-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/cart" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 transition mb-4 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition" />
            কার্টে ফিরুন
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                চেকআউট
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                আপনার অর্ডার সম্পন্ন করতে নিচের তথ্য পূরণ করুন
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
                <span>তথ্য</span>
              </div>
              <ChevronRight className="h-4 w-4" />
              <div className="flex items-center gap-1">
                <span className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs">2</span>
                <span>পেমেন্ট</span>
              </div>
              <ChevronRight className="h-4 w-4" />
              <div className="flex items-center gap-1">
                <span className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs">3</span>
                <span>কনফার্মেশন</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Billing Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <User className="h-5 w-5 text-green-600" />
                    বিলিং তথ্য
                  </h2>
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
              </div>
              
              <div className="p-6 space-y-6">
                {/* Login Prompt */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {isAuthenticated ? <User className="h-4 w-4 text-blue-600" /> : <AlertCircle className="h-4 w-4 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                        {isAuthenticated ? (
                          <>স্বাগতম {user?.name}!</>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">পূর্ণ নাম *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
                      placeholder="আপনার নাম"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ইমেইল *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
                      placeholder="example@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ফোন নম্বর *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
                      placeholder="০১XXXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">শহর *</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ঠিকানা *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
                      placeholder="বাড়ির নম্বর, রাস্তা, এলাকা"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">থানা/এলাকা</label>
                    <input
                      type="text"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
                      placeholder="এলাকার নাম"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">পোস্টাল কোড</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
                      placeholder="১২৩০"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">অর্ডার নোট (ঐচ্ছিক)</label>
                    <textarea
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition resize-none"
                      placeholder="ডেলিভারির জন্য বিশেষ নির্দেশনা..."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-green-600" />
                  পেমেন্ট পদ্ধতি নির্বাচন করুন
                </h3>
                <div className="space-y-3">
                  {/* COD Option */}
                  <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all duration-200 ${paymentMethod === 'cod' ? getPaymentGradient('cod') + ' ring-2 ring-green-500' : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
                    <div className="flex items-center gap-3">
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
                        <p className="font-medium text-gray-900 dark:text-white">ক্যাশ অন ডেলিভারি</p>
                        <p className="text-xs text-gray-500">ডেলিভারির সময় নগদে পেমেন্ট করুন</p>
                      </div>
                    </div>
                    <div className="text-xs text-green-600 font-medium">নিরাপদ</div>
                  </label>
                  
                  {/* bKash/Rocket/Nagad Option */}
                  <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all duration-200 ${paymentMethod === 'bkash' ? getPaymentGradient('bkash') + ' ring-2 ring-pink-500' : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="bkash"
                        checked={paymentMethod === 'bkash'}
                        onChange={() => setPaymentMethod('bkash')}
                        className="w-4 h-4 text-pink-600"
                      />
                      <Smartphone className="h-5 w-5 text-pink-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">bKash / Rocket / Nagad</p>
                        <p className="text-xs text-gray-500">মোবাইল ব্যাংকিং - বিকাশ, রকেট, নগদ</p>
                      </div>
                    </div>
                    <div className="text-xs text-pink-600 font-medium">ফাস্ট পে</div>
                  </label>

                  {/* SSLCommerz Option */}
                  <label className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all duration-200 ${paymentMethod === 'sslcommerz' ? getPaymentGradient('sslcommerz') + ' ring-2 ring-blue-500' : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="sslcommerz"
                        checked={paymentMethod === 'sslcommerz'}
                        onChange={() => setPaymentMethod('sslcommerz')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <Building2 className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">SSLCommerz</p>
                        <p className="text-xs text-gray-500">Credit/Debit Card, Internet Banking, Mobile Banking</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <img src="https://developer.sslcommerz.com/public/img/visa.png" alt="Visa" className="h-6" />
                      <img src="https://developer.sslcommerz.com/public/img/mastercard.png" alt="Mastercard" className="h-6" />
                      <img src="https://developer.sslcommerz.com/public/img/bkash.png" alt="bKash" className="h-6" />
                    </div>
                  </label>

                  {showPaymentAlert && paymentMethod === 'sslcommerz' && (
                    <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs text-blue-700 dark:text-blue-300">
                      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>SSLCommerz এর মাধ্যমে আপনি সকল প্রকার কার্ড, মোবাইল ব্যাংকিং এবং ইন্টারনেট ব্যাংকিং এ পেমেন্ট করতে পারবেন। পেমেন্ট成功后 স্বয়ংক্রিয়ভাবে অর্ডার কনফার্ম হবে।</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6">
                <button
                  type="submit"
                  disabled={placing || loading.create}
                  className="w-full py-3.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2 group"
                >
                  {(placing || loading.create) ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>অর্ডার প্রসেসিং...</span>
                    </>
                  ) : (
                    <>
                      <span>অর্ডার কনফার্ম করুন</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                    </>
                  )}
                </button>
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  অর্ডার কনফার্ম করে আপনি আমাদের 
                  <Link href="/terms" className="text-green-600 hover:underline mx-1">টার্মস অ্যান্ড কন্ডিশন</Link> 
                  এ সম্মত হচ্ছেন
                </p>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl sticky top-24 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-5">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  অর্ডার সামারি
                </h2>
                <p className="text-green-100 text-sm mt-1">{cartSummary.items} টি আইটেম</p>
              </div>
              
              <div className="p-5">
                {/* Cart Items Preview */}
                <div className="max-h-64 overflow-y-auto mb-5 space-y-3 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-start py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">পরিমাণ: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-green-600">৳{item.totalPrice}</p>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">পণ্যের মূল্য</span>
                    <span className="font-medium">৳{cartSummary.subtotal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Truck className="h-3 w-3" />
                      ডেলিভারি চার্জ
                    </span>
                    <span className={cartSummary.shipping === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                      {cartSummary.shipping === 0 ? 'ফ্রি' : `৳${cartSummary.shipping}`}
                    </span>
                  </div>
                  {cartSummary.subtotal < 1000 && cartSummary.subtotal > 0 && (
                    <div className="flex items-center gap-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <Gift className="h-3 w-3 text-amber-600" />
                      <p className="text-xs text-amber-700 dark:text-amber-400">
                        আরও ৳{1000 - cartSummary.subtotal} যোগ করলে ফ্রি ডেলিভারি!
                      </p>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-3 mt-2 border-t-2 border-dashed border-gray-200 dark:border-gray-700">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">মোট</span>
                    <span className="text-2xl font-bold text-green-600">৳{cartSummary.total}</span>
                  </div>
                </div>
                
                <div className="mt-5 space-y-3 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Truck className="h-3 w-3 text-green-600" />
                    </div>
                    <span>২-৩ কার্যদিবসের মধ্যে ডেলিভারি</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="h-3 w-3 text-green-600" />
                    </div>
                    <span>৭ দিনের রিটার্ন পলিসি</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    </div>
                    <span>১০০% মান নিশ্চিত</span>
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center">
                      <Star className="h-5 w-5 text-yellow-500 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">৪.৯ রেটিং</p>
                    </div>
                    <div className="text-center">
                      <Users className="h-5 w-5 text-green-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">৫০০০+ গ্রাহক</p>
                    </div>
                    <div className="text-center">
                      <Shield className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                      <p className="text-xs text-gray-500">নিরাপদ পেমেন্ট</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}

// Missing imports
import { ShoppingBag, Users } from 'lucide-react';