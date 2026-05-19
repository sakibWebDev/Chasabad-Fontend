// app/(public)/order-confirmation/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Package, Truck, Calendar, MapPin, Phone, Mail, Download, Printer, Home, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface OrderData {
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    area: string;
    postalCode: string;
  };
  items: OrderItem[];
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  total: number;
  notes: string;
  userId: string | null;
  createdAt: string;
  status?: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
}

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [estimatedDelivery, setEstimatedDelivery] = useState('');

  useEffect(() => {
    if (!orderId) {
      router.push('/');
      return;
    }

    // লোকাল স্টোরেজ থেকে অর্ডার ডাটা লোড করুন
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const foundOrder = orders.find((o: OrderData) => o.orderId === orderId);
    
    if (foundOrder) {
      setOrder(foundOrder);
      
      // estimated delivery date calculate (3-5 days from order date)
      const orderDate = new Date(foundOrder.createdAt);
      const deliveryDate = new Date(orderDate);
      deliveryDate.setDate(orderDate.getDate() + 3);
      setEstimatedDelivery(deliveryDate.toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }));
    }
    
    setLoading(false);
  }, [orderId, router]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (!order) return;
    
    const orderText = `
অর্ডার কনফার্মেশন
==================
অর্ডার আইডি: ${order.orderId}
তারিখ: ${new Date(order.createdAt).toLocaleDateString('bn-BD')}

গ্রাহকের তথ্য:
----------------
নাম: ${order.customer.name}
ইমেইল: ${order.customer.email}
ফোন: ${order.customer.phone}
ঠিকানা: ${order.customer.address}, ${order.customer.area}, ${order.customer.city}

অর্ডারের বিবরণ:
----------------
${order.items.map(item => `${item.name} x ${item.quantity} = ৳${item.totalPrice}`).join('\n')}

বিলিং সামারি:
----------------
পণ্যের মূল্য: ৳${order.subtotal}
ডেলিভারি চার্জ: ${order.shipping === 0 ? 'ফ্রি' : `৳${order.shipping}`}
মোট: ৳${order.total}

পেমেন্ট পদ্ধতি: ${order.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' : 'মোবাইল ব্যাংকিং'}

ধন্যবাদ!
    `;
    
    const blob = new Blob([orderText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `order_${order.orderId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('অর্ডার ডাউনলোড শুরু হয়েছে!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">অর্ডার তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center py-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">অর্ডার পাওয়া যায়নি!</h2>
            <p className="text-gray-500 mb-6">অর্ডার আইডি সঠিক নয় বা অর্ডারটি নেই</p>
            <Link href="/">
              <button className="px-6 py-3 bg-green-600 text-white rounded-xl">
                হোম পেজে যান
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-purple-600 bg-purple-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'confirmed': return 'কনফার্ম করা হয়েছে';
      case 'shipped': return 'শিপিং হয়েছে';
      case 'delivered': return 'ডেলিভারি হয়েছে';
      case 'cancelled': return 'বাতিল করা হয়েছে';
      default: return 'পেন্ডিং';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 print:py-0">
      <div className="max-w-4xl mx-auto px-4">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-bounce">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            অর্ডার সফল হয়েছে!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে। অর্ডার আইডি: <span className="font-bold text-green-600">{order.orderId}</span>
          </p>
        </div>

        {/* Action Buttons - Print & Download */}
        <div className="flex justify-center gap-4 mb-8 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Printer className="h-4 w-4" />
            প্রিন্ট করুন
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <Download className="h-4 w-4" />
            ডাউনলোড করুন
          </button>
        </div>

        {/* Order Status */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm text-gray-500">অর্ডার তারিখ</p>
              <p className="font-semibold">
                {new Date(order.createdAt).toLocaleDateString('bn-BD', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">স্ট্যাটাস</p>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">এস্টিমেটেড ডেলিভারি</p>
              <p className="font-semibold flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {estimatedDelivery}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Package className="h-5 w-5" />
                অর্ডারের বিবরণ
              </h2>
              
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-3 border-b last:border-0">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        পরিমাণ: {item.quantity} x ৳{item.price}
                      </p>
                    </div>
                    <p className="font-semibold">৳{item.totalPrice}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Timeline */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Truck className="h-5 w-5" />
                ডেলিভারি টাইমলাইন
              </h2>
              
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                
                <div className="relative z-10 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                      ✓
                    </div>
                    <div>
                      <p className="font-semibold">অর্ডার কনফার্ম করা হয়েছে</p>
                      <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-white text-sm">
                      1
                    </div>
                    <div>
                      <p className="font-semibold">প্যাকেজিং প্রক্রিয়াধীন</p>
                      <p className="text-sm text-gray-500">আজকের মধ্যেই প্যাক করা হবে</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-white text-sm">
                      2
                    </div>
                    <div>
                      <p className="font-semibold">শিপিং প্রক্রিয়াধীন</p>
                      <p className="text-sm text-gray-500">২-৩ দিনের মধ্যে ডেলিভারি শুরু হবে</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-white text-sm">
                      3
                    </div>
                    <div>
                      <p className="font-semibold">ডেলিভারি সম্পন্ন</p>
                      <p className="text-sm text-gray-500">এস্টিমেটেড: {estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Customer Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Payment Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">পেমেন্ট সামারি</h2>
              
              <div className="space-y-3 pb-4 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">পণ্যের মূল্য</span>
                  <span>৳{order.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ডেলিভারি চার্জ</span>
                  <span className={order.shipping === 0 ? 'text-green-600' : ''}>
                    {order.shipping === 0 ? 'ফ্রি' : `৳${order.shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-3">
                  <span>মোট</span>
                  <span className="text-green-600">৳{order.total}</span>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-500">পেমেন্ট পদ্ধতি</p>
                <p className="font-medium">
                  {order.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' : 'মোবাইল ব্যাংকিং (bKash/Rocket/Nagad)'}
                </p>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">ডেলিভারি তথ্য</h2>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="font-medium">{order.customer.name}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <p>{order.customer.phone}</p>
                  </div>
                </div>
                
                {order.customer.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p>{order.customer.email}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <p>{order.customer.address}</p>
                    <p className="text-sm text-gray-500">
                      {order.customer.area}, {order.customer.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6">
              <h3 className="font-semibold mb-2">সাহায্য প্রয়োজন?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                আপনার অর্ডার নিয়ে কোনো সমস্যা হলে আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।
              </p>
              <Link href="/support">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  যোগাযোগ করুন →
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Action Buttons Bottom */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pb-8 print:hidden">
          <Link href="/">
            <button className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition w-full sm:w-auto">
              <Home className="h-4 w-4" />
              হোম পেজে যান
            </button>
          </Link>
          <Link href="/shop/all">
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-green-600 text-green-600 rounded-xl font-medium hover:bg-green-50 transition w-full sm:w-auto">
              <ShoppingBag className="h-4 w-4" />
              আরও কেনাকাটা করুন
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}