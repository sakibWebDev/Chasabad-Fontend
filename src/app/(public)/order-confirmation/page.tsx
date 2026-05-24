// app/(public)/order-confirmation/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { getOrderByOrderId, clearCurrentOrder } from '@/lib/features/order/orderSlice';
import { 
  CheckCircle, Package, Truck, Calendar, MapPin, Phone, Mail, 
  Download, Printer, Home, ShoppingBag, Loader2, Clock, 
  CreditCard, Banknote, Shield, Star, Award, Gift, 
  ChevronRight, FileText, Share2, Sparkles, Heart 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const orderId = searchParams.get('orderId');
  const printRef = useRef<HTMLDivElement>(null);
  
  const { currentOrder: order, loading } = useAppSelector((state) => state.order);
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!orderId) {
      router.push('/');
      return;
    }
    dispatch(getOrderByOrderId(orderId));
    
    return () => {
      dispatch(clearCurrentOrder());
    };
  }, [dispatch, orderId, router]);

  useEffect(() => {
    if (order?.createdAt) {
      const orderDate = new Date(order.createdAt);
      const deliveryDate = new Date(orderDate);
      deliveryDate.setDate(orderDate.getDate() + 3);
      setEstimatedDelivery(deliveryDate.toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }));
    }
  }, [order]);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;
    
    const originalTitle = document.title;
    document.title = `Order_${order?.orderId}`;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Order ${order?.orderId}</title>
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; padding: 40px; }
              .header { text-align: center; margin-bottom: 30px; }
              .order-details { margin-bottom: 30px; }
              table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
              .total { font-size: 18px; font-weight: bold; color: #059669; }
              @media print {
                .no-print { display: none; }
                body { padding: 0; }
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
    
    document.title = originalTitle;
    toast.success('প্রিন্ট করা শুরু হয়েছে!');
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    try {
      const htmlContent = generateHTMLForPDF();
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `order_${order?.orderId}.html`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('অর্ডার ডাউনলোড শুরু হয়েছে!');
    } catch (error) {
      toast.error('ডাউনলোড করতে সমস্যা হয়েছে');
    } finally {
      setIsDownloading(false);
    }
  };

  const generateHTMLForPDF = () => {
    if (!order) return '';
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Order ${order.orderId}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            padding: 40px;
            min-height: 100vh;
          }
          .invoice-container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #059669, #10b981);
            color: white;
            padding: 40px;
            text-align: center;
          }
          .header h1 { font-size: 32px; margin-bottom: 10px; }
          .content { padding: 40px; }
          .order-id { font-size: 24px; color: #059669; font-weight: bold; }
          .status-badge {
            display: inline-block;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
          }
          .status-delivered { background: #d1fae5; color: #065f46; }
          .status-processing { background: #fef3c7; color: #92400e; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th { background: #f3f4f6; padding: 12px; text-align: left; }
          td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
          .total-section {
            background: #f9fafb;
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
          }
          .footer {
            background: #f9fafb;
            padding: 30px;
            text-align: center;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="invoice-container">
          <div class="header">
            <h1>🎉 অর্ডার কনফার্মেশন</h1>
            <p>আপনার অর্ডার সফলভাবে সম্পন্ন হয়েছে</p>
          </div>
          <div class="content">
            <div style="text-align: center; margin-bottom: 30px;">
              <div class="order-id">Order #${order.orderId}</div>
              <p style="color: #6b7280; margin-top: 10px;">
                তারিখ: ${new Date(order.createdAt).toLocaleDateString('bn-BD')}
              </p>
            </div>
            
            <h3 style="margin-bottom: 15px;">📦 অর্ডারের বিবরণ</h3>
            <table>
              <thead>
                <tr><th>পণ্য</th><th>পরিমাণ</th><th>দাম</th><th>মোট</th></tr>
              </thead>
              <tbody>
                ${order.items?.map((item: any) => `
                  <tr><td>${item.name}</td><td>${item.quantity}</td><td>৳${item.unit_price}</td><td>৳${item.total_price}</td></tr>
                `).join('')}
              </tbody>
            </table>
            
            <div class="total-section">
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span>পণ্যের মূল্য:</span><span>৳${order.total_amount}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span>ডেলিভারি চার্জ:</span><span>${order.shipping_cost === 0 ? 'ফ্রি' : `৳${order.shipping_cost}`}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 20px; font-weight: bold; color: #059669; margin-top: 10px; padding-top: 10px; border-top: 2px solid #e5e7eb;">
                <span>মোট:</span><span>৳${order.grand_total}</span>
              </div>
            </div>
          </div>
          <div class="footer">
            <p>© 2024 Chashi Vai - Krishi Bhandar</p>
            <p>সকল প্রকার কৃষি উপকরণের জন্য চাষী ভাই আপ্নার বিশ্বস্ত সঙ্গী</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Order ${order?.orderId}`,
          text: `আমার অর্ডার #${order?.orderId} সফলভাবে সম্পন্ন হয়েছে!`,
          url: window.location.href,
        });
        toast.success('শেয়ার করা হয়েছে!');
      } catch (error) {
        toast.error('শেয়ার করতে সমস্যা হয়েছে');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('লিংক কপি করা হয়েছে!');
    }
  };

  if (loading.detail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="w-20 h-20 text-green-600 animate-spin mx-auto mb-6" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="w-8 h-8 text-green-800 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">অর্ডার তথ্য লোড হচ্ছে...</p>
          <p className="text-sm text-gray-400 mt-2">দয়া করে অপেক্ষা করুন</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center py-16">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 max-w-md mx-auto">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-12 w-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">অর্ডার পাওয়া যায়নি!</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">অর্ডার আইডি সঠিক নয় বা অর্ডারটি নেই</p>
            <Link href="/">
              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition shadow-lg">
                হোম পেজে যান
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status?: string) => {
    switch (status?.toUpperCase()) {
      case 'PROCESSING': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'SHIPPED': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'DELIVERED': return 'bg-green-100 text-green-700 border-green-200';
      case 'CANCELLED': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status?.toUpperCase()) {
      case 'PROCESSING': return <Clock className="h-4 w-4" />;
      case 'SHIPPED': return <Truck className="h-4 w-4" />;
      case 'DELIVERED': return <CheckCircle className="h-4 w-4" />;
      case 'CANCELLED': return <Shield className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getStatusText = (status?: string) => {
    switch (status?.toUpperCase()) {
      case 'PROCESSING': return 'প্রসেসিং এ আছে';
      case 'SHIPPED': return 'শিপিং হয়েছে';
      case 'DELIVERED': return 'ডেলিভারি হয়েছে';
      case 'CANCELLED': return 'বাতিল করা হয়েছে';
      default: return 'পেন্ডিং';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Success Header Animation */}
        <div className="text-center mb-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg animate-bounce">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
            অর্ডার সফল হয়েছে!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            আপনার অর্ডারটি সফলভাবে সম্পন্ন হয়েছে
          </p>
          <div className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
            <Sparkles className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              অর্ডার আইডি: {order.orderId}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 no-print">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-200 hover:border-green-300 group"
          >
            <Printer className="h-4 w-4 text-gray-600 group-hover:text-green-600" />
            <span className="text-gray-700 dark:text-gray-300 group-hover:text-green-600">প্রিন্ট করুন</span>
          </button>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-200 hover:border-green-300 group"
          >
            <Download className="h-4 w-4 text-gray-600 group-hover:text-green-600" />
            <span className="text-gray-700 dark:text-gray-300 group-hover:text-green-600">
              {isDownloading ? 'ডাউনলোড হচ্ছে...' : 'PDF ডাউনলোড'}
            </span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-all duration-200 hover:border-green-300 group"
          >
            <Share2 className="h-4 w-4 text-gray-600 group-hover:text-green-600" />
            <span className="text-gray-700 dark:text-gray-300 group-hover:text-green-600">শেয়ার করুন</span>
          </button>
        </div>

        {/* Main Content for Print */}
        <div ref={printRef} className="space-y-6">
          
          {/* Order Status Card */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <Truck className="h-5 w-5" />
                অর্ডার স্ট্যাটাস
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-10 w-10 text-green-600 bg-green-100 rounded-full p-2" />
                  <div>
                    <p className="text-sm text-gray-500">অর্ডার তারিখ</p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {new Date(order.createdAt).toLocaleDateString('bn-BD', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">বর্তমান স্ট্যাটাস</p>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Gift className="h-10 w-10 text-orange-600 bg-orange-100 rounded-full p-2" />
                  <div>
                    <p className="text-sm text-gray-500">এস্টিমেটেড ডেলিভারি</p>
                    <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Order Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                  <h2 className="text-white font-semibold flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    অর্ডারের বিবরণ
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3">
                    {order.items?.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition px-3 rounded-lg">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            পরিমাণ: {item.quantity} × ৳{item.unit_price}
                          </p>
                        </div>
                        <p className="font-bold text-green-600 text-lg">৳{item.total_price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Delivery Timeline */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                  <h2 className="text-white font-semibold flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    ডেলিভারি টাইমলাইন
                  </h2>
                </div>
                <div className="p-6">
                  <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-emerald-500 to-gray-200 dark:to-gray-700"></div>
                    
                    {[
                      { step: 1, title: 'অর্ডার কনফার্ম করা হয়েছে', date: order.createdAt, icon: CheckCircle, completed: true },
                      { step: 2, title: 'প্যাকেজিং প্রক্রিয়াধীন', date: null, icon: Package, completed: ['PROCESSING', 'SHIPPED', 'DELIVERED'].includes(order.status?.toUpperCase()) },
                      { step: 3, title: 'শিপিং প্রক্রিয়াধীন', date: null, icon: Truck, completed: ['SHIPPED', 'DELIVERED'].includes(order.status?.toUpperCase()), tracking: order.tracking_number },
                      { step: 4, title: 'ডেলিভারি সম্পন্ন', date: null, icon: Home, completed: order.status?.toUpperCase() === 'DELIVERED' },
                    ].map((step, idx) => (
                      <div key={idx} className="relative z-10 mb-8 last:mb-0">
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-sm transition-all duration-300 ${
                            step.completed ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg' : 'bg-gray-300 dark:bg-gray-600'
                          }`}>
                            {step.completed ? <CheckCircle className="h-6 w-6" /> : <span className="font-bold">{step.step}</span>}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 dark:text-white">{step.title}</p>
                            {step.date && <p className="text-sm text-gray-500">{new Date(step.date).toLocaleString()}</p>}
                            {step.tracking && (
                              <p className="text-xs text-green-600 mt-1 font-mono">ট্র্যাকিং নং: {step.tracking}</p>
                            )}
                          </div>
                          {step.completed && <ChevronRight className="h-5 w-5 text-green-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Payment Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                  <h2 className="text-white font-semibold flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    পেমেন্ট সামারি
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-3 pb-4 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">পণ্যের মূল্য</span>
                      <span className="font-medium">৳{order.total_amount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">ডেলিভারি চার্জ</span>
                      <span className={order.shipping_cost === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                        {order.shipping_cost === 0 ? 'ফ্রি' : `৳${order.shipping_cost}`}
                      </span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between items-center text-green-600">
                        <span>ছাড়</span>
                        <span>- ৳{order.discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-3 mt-2 border-t-2 border-dashed border-gray-200 dark:border-gray-700">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">মোট</span>
                      <span className="text-2xl font-bold text-green-600">৳{order.grand_total}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      {order.payment_method === 'cod' ? (
                        <>
                          <Banknote className="h-4 w-4 text-green-600" />
                          <span className="text-gray-700 dark:text-gray-300">পেমেন্ট পদ্ধতি: <strong>ক্যাশ অন ডেলিভারি</strong></span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4 text-pink-500" />
                          <span className="text-gray-700 dark:text-gray-300">পেমেন্ট পদ্ধতি: <strong>{order.payment_method?.toUpperCase()}</strong></span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4">
                  <h2 className="text-white font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    ডেলিভারি তথ্য
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">প্রাপকের নাম</p>
                        <p className="font-medium text-gray-900 dark:text-white">{order.user?.name || 'Customer'}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">ফোন নম্বর</p>
                        <p className="font-medium text-gray-900 dark:text-white">{order.shipping_phone}</p>
                      </div>
                    </div>
                    
                    {(order.user?.email ) && (
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Mail className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">ইমেইল</p>
                          <p className="font-medium text-gray-900 dark:text-white break-all">{order.user?.email}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">ডেলিভারি ঠিকানা</p>
                        <p className="font-medium text-gray-900 dark:text-white">{order.shipping_address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rewards Card */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-3xl p-6 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="h-8 w-8 text-amber-600" />
                  <h3 className="font-bold text-amber-800 dark:text-amber-300">পয়েন্ট অর্জন করুন!</h3>
                </div>
                <p className="text-sm text-amber-700 dark:text-amber-400 mb-3">
                  এই অর্ডারের জন্য আপনি <strong>{Math.floor(order.grand_total / 10)} পয়েন্ট</strong> পাবেন!
                </p>
                <Link href="/rewards">
                  <button className="text-sm text-amber-700 dark:text-amber-400 font-medium hover:text-amber-800 flex items-center gap-1">
                    আরও জানুন <ChevronRight className="h-3 w-3" />
                  </button>
                </Link>
              </div>

              {/* Need Help */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-3xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="h-8 w-8 text-blue-600" />
                  <h3 className="font-bold text-blue-800 dark:text-blue-300">সাহায্য প্রয়োজন?</h3>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-400 mb-4">
                                  আপনার অর্ডার নিয়ে কোনো সমস্যা হলে আমাদের সাপোর্ট টিম ২৪/৭ সময় উপলব্ধ।
                                </p>
                <div className="flex gap-3">
                  <Link href="/support" className="flex-1">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition">
                      যোগাযোগ করুন
                    </button>
                  </Link>
                  <a href="tel:+8801234567890">
                    <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-50 transition">
                      কল করুন
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Promotional Banner */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-6 text-white text-center no-print">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                <div>
                  <h3 className="font-bold text-lg">আপনার পরবর্তী অর্ডারে ১০% ছাড়!</h3>
                  <p className="text-green-100 text-sm">আপনার পরবর্তী কেনাকাটায় কুপন কোড: <span className="font-mono font-bold">WELCOME10</span></p>
                </div>
              </div>
              <Link href="/shop/all">
                <button className="px-6 py-2 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition shadow-lg">
                  কেনাকাটা চালিয়ে যান
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pb-8 no-print">
          <Link href="/">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition shadow-lg w-full sm:w-auto">
              <Home className="h-4 w-4" />
              হোম পেজে যান
            </button>
          </Link>
          <Link href="/shop">
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-green-600 text-green-600 rounded-xl font-medium hover:bg-green-50 transition w-full sm:w-auto">
              <ShoppingBag className="h-4 w-4" />
              আরও কেনাকাটা করুন
            </button>
          </Link>
          <Link href="/orders">
            <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition w-full sm:w-auto">
              <FileText className="h-4 w-4" />
              আমার অর্ডার সমূহ
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}