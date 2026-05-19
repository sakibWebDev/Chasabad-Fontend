// app/product/[productId]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, ShoppingCart, Heart, Truck, Shield, Clock, 
  Sprout, Droplet, Sun, Thermometer, Tractor, 
  CheckCircle, Minus, Plus, Leaf, Award, 
  ChevronRight, Share2, MessageCircle, ThumbsUp,
  TrendingUp, Calendar, Package, RotateCcw
} from 'lucide-react';
import { useCart } from '@/lib/hooks/useCart';
import { useWishlist } from '@/lib/hooks/useWishlist';
import toast from 'react-hot-toast';

// প্রোডাক্ট টাইপ
interface Product {
  id: number;
  name: string;
  nameEn: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  stock: number;
  category: string;
  subCategory: string;
  badge: string;
  isOrganic: boolean;
  isPremium: boolean;
  image: string;
  images: string[];
  description: string;
  benefits: string[];
  howToUse: string[];
  specifications: {
    [key: string]: string;
  };
  farmingTips: {
    title: string;
    description: string;
    icon: any;
  }[];
}

// ডেমো প্রোডাক্ট ডাটা (API থেকে আসবে)
const demoProduct: Product = {
  id: 1,
  name: 'জৈব টমেটো বীজ',
  nameEn: 'Organic Tomato Seeds',
  price: 45,
  originalPrice: 60,
  rating: 4.8,
  reviews: 234,
  stock: 150,
  category: 'seeds',
  subCategory: 'vegetables',
  badge: 'বেস্টসেলার',
  isOrganic: true,
  isPremium: true,
  image: '/images/tomato-seeds.jpg',
  images: ['/images/tomato-1.jpg', '/images/tomato-2.jpg', '/images/tomato-3.jpg'],
  description: 'উচ্চ মানের জৈব টমেটো বীজ যা থেকে উৎপাদিত টমেটো অত্যন্ত পুষ্টিকর ও রোগ প্রতিরোধ ক্ষমতা সম্পন্ন। এই বীজ থেকে উৎপাদিত টমেটো বড়, রসালো এবং মিষ্টি স্বাদের হয়ে থাকে। বাগানে সহজেই চাষ করা যায় এবং ফলনও বেশি হয়ে থাকে।',
  benefits: [
    '১০০% জৈব ও রাসায়নিক মুক্ত',
    'রোগ প্রতিরোধ ক্ষমতা সম্পন্ন',
    'অত্যন্ত পুষ্টিকর ও স্বাস্থ্যকর',
    'বড় ও রসালো টমেটো',
    'দীর্ঘক্ষণ তাজা থাকে',
  ],
  howToUse: [
    'বীজ ৬-৮ ঘন্টা পানিতে ভিজিয়ে রাখুন',
    'উর্বর মাটিতে ১-২ সেমি গভীরে বপন করুন',
    'নিয়মিত পানি দিন কিন্তু ড্রেনেজ ভালো রাখুন',
    '১০-১৫ দিনের মধ্যে চারা গজাবে',
    'চারাগুলো ২-৩ ফুট দূরে রোপণ করুন',
  ],
  specifications: {
    'প্রকার': 'জৈব হাইব্রিড',
    'ফলন সময়': '৬০-৭০ দিন',
    'বীজের আয়ু': '২ বছর',
    'উপযুক্ত মৌসুম': 'শীত ও বসন্ত',
    'উচ্চতা': '৩-৪ ফুট',
    'ফলের রং': 'লাল',
  },
  farmingTips: [
    {
      title: 'মাটি প্রস্তুতি',
      description: 'জৈব সার ও কম্পোস্ট মিশিয়ে মাটি তৈরি করুন। মাটির PH ৬.০-৬.৮ হওয়া ভালো।',
      icon: Tractor,
    },
    {
      title: 'সেচ ব্যবস্থাপনা',
      description: 'সপ্তাহে ২-৩ বার পানি দিন। ফুল আসার সময় পানি বেশি প্রয়োজন।',
      icon: Droplet,
    },
    {
      title: 'সার ব্যবস্থাপনা',
      description: 'জৈব সার, ভার্মিকম্পোস্ট ও NPK সার সঠিক মাত্রায় প্রয়োগ করুন।',
      icon: Leaf,
    },
    {
      title: 'রোগ বালাই দমন',
      description: 'নিয়মিত গাছ পর্যবেক্ষণ করুন। প্রাকৃতিক পদ্ধতিতে পোকা দমন করুন।',
      icon: Shield,
    },
  ],
};

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.productId;
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'farming' | 'reviews'>('details');
  const [reviews, setReviews] = useState<any[]>([]);
  
  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  
  // Redux থেকে প্রোডাক্ট লোড করুন
  const products = useSelector((state: any) => state.product?.list || []);
  
  useEffect(() => {
    // API থেকে প্রোডাক্ট লোড করার সিমুলেশন
    const fetchProduct = async () => {
      setLoading(true);
      // এখানে আপনার API কল করবেন
      // const res = await axios.get(`/api/products/${productId}`);
      // setProduct(res.data);
      
      // ডেমো ডাটা ব্যবহার
      setTimeout(() => {
        setProduct(demoProduct);
        setLoading(false);
      }, 500);
    };
    
    fetchProduct();
    window.scrollTo(0, 0);
  }, [productId]);
  
  const handleAddToCart = () => {
    if (product && !isInCart(product.id)) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
      }, false);
      toast.success(`${product.name} কার্টে যোগ হয়েছে!`, {
        icon: '🛒',
        duration: 2000,
      });
    } else {
      toast.error('পণ্যটি ইতিমধ্যে কার্টে আছে');
    }
  };
  
  const handleBuyNow = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
      }, false);
      router.push('/checkout');
    }
  };
  
  const handleToggleWishlist = () => {
    if (product) {
      toggleItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        rating: product.rating,
        sold: product.reviews,
        category: product.category,
        badge: product.badge,
        image: null,
      });
    }
  };
  
  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };
  
  const formatPrice = (price: number) => {
    return `৳${price.toLocaleString('bn-BD')}`;
  };
  
  const renderStars = (rating: number, totalReviews?: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
        ))}
        <span className="text-sm text-gray-600 ml-2">{rating}</span>
        {totalReviews && (
          <span className="text-sm text-gray-400 ml-1">({totalReviews} রিভিউ)</span>
        )}
      </div>
    );
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">প্রোডাক্ট তথ্য লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center py-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">প্রোডাক্ট পাওয়া যায়নি!</h2>
            <p className="text-gray-500 mb-6">আপনার অনুসন্ধান করা প্রোডাক্টটি বিদ্যমান নেই</p>
            <Link href="/shop">
              <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl">
                শপিং শুরু করুন
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-emerald-600">হোম</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/shop" className="hover:text-emerald-600">শপ</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/shop/${product.category}`} className="hover:text-emerald-600">
            {product.category === 'seeds' ? 'বীজ' : product.category === 'plants' ? 'চারা' : 'সরঞ্জাম'}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-emerald-600 font-medium">{product.name}</span>
        </div>
        
        {/* Product Main Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div>
              <div className="relative h-96 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl flex items-center justify-center mb-4">
                <Sprout className="h-32 w-32 text-green-500" />
                {product.badge && (
                  <span className="absolute top-4 left-4 text-xs font-medium px-3 py-1 rounded-full bg-emerald-600 text-white">
                    {product.badge}
                  </span>
                )}
                {product.isOrganic && (
                  <span className="absolute top-4 right-4 text-xs font-medium px-3 py-1 rounded-full bg-green-500 text-white">
                    জৈব
                  </span>
                )}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      selectedImage === idx ? 'border-emerald-500' : 'border-gray-200'
                    }`}
                  >
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <Sprout className="h-8 w-8 text-gray-400" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <div className="mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">{product.nameEn}</p>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                {renderStars(product.rating, product.reviews)}
                <button className="text-sm text-gray-500 hover:text-emerald-600 flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  রিভিউ দিন
                </button>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-emerald-600">{formatPrice(product.price)}</span>
                <span className="text-lg text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% ছাড়
                </span>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 text-sm">
                  <Package className="h-4 w-4 text-gray-400" />
                  <span className={product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-orange-500' : 'text-red-500'}>
                    {product.stock > 50 ? 'স্টকে আছে' : product.stock > 0 ? `শেষ ${product.stock}টি` : 'স্টক আউট'}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <RotateCcw className="h-4 w-4 text-gray-400" />
                  <span>৭ দিন রিটার্ন পলিসি</span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {product.description}
              </p>
              
              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-gray-700">পরিমাণ:</span>
                <div className="flex items-center gap-3 border rounded-lg">
                  <button
                    onClick={() => updateQuantity(quantity - 1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 rounded-l-lg disabled:opacity-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="p-2 hover:bg-gray-100 rounded-r-lg disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">{product.stock}টি উপলব্ধ</span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={isInCart(product.id)}
                  className={`flex-1 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
                    isInCart(product.id)
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {isInCart(product.id) ? 'কার্টে আছে' : 'কার্টে যোগ করুন'}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition flex items-center justify-center gap-2"
                >
                  এখনই কিনুন
                </button>
                <button
                  onClick={handleToggleWishlist}
                  className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                </button>
                <button className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                  <Share2 className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              {/* Delivery Info */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-emerald-600" />
                  <span>ফ্রি ডেলিভারি {formatPrice(1000)} এর বেশি অর্ডারে</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  <span>অর্ডার করার ২৪ ঘন্টার মধ্যে ডেলিভারি</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="border-b flex flex-wrap">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-3 font-medium transition ${
                activeTab === 'details'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-emerald-600'
              }`}
            >
              পণ্যের বিবরণ
            </button>
            <button
              onClick={() => setActiveTab('farming')}
              className={`px-6 py-3 font-medium transition ${
                activeTab === 'farming'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-emerald-600'
              }`}
            >
              চাষাবাদ নির্দেশনা
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 font-medium transition ${
                activeTab === 'reviews'
                  ? 'text-emerald-600 border-b-2 border-emerald-600'
                  : 'text-gray-500 hover:text-emerald-600'
              }`}
            >
              রিভিউ ({product.reviews})
            </button>
          </div>
          
          <div className="p-6">
            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">পণ্যের বিবরণ</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">সুবিধাসমূহ</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {product.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">স্পেসিফিকেশন</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b last:border-0">
                          <span className="font-medium text-gray-600">{key}</span>
                          <span className="text-gray-800">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Farming Tips Tab */}
            {activeTab === 'farming' && (
              <div className="space-y-6">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-4 flex items-center gap-2">
                    <Sprout className="h-6 w-6" />
                    চাষাবাদের সঠিক পদ্ধতি
                  </h3>
                  <p className="text-green-700 dark:text-green-300">
                    সঠিক পদ্ধতিতে চাষ করলে ফলন অনেক ভালো হয়। নিচের নির্দেশনাগুলো অনুসরণ করুন।
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.farmingTips.map((tip, idx) => {
                    const Icon = tip.icon;
                    return (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                            <Icon className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{tip.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">কীভাবে ব্যবহার করবেন</h3>
                  <ol className="space-y-2 list-decimal list-inside">
                    {product.howToUse.map((step, idx) => (
                      <li key={idx} className="text-gray-600">{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">গ্রাহক রিভিউ</h3>
                    <p className="text-gray-500">{product.reviews}টি রিভিউ</p>
                  </div>
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                    রিভিউ দিন
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* Sample Review */}
                  <div className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <span className="font-bold text-emerald-600">একে</span>
                        </div>
                        <div>
                          <p className="font-semibold">আব্দুল্লাহ আল মামুন</p>
                          <div className="flex items-center gap-1">
                            {renderStars(5)}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">২ দিন আগে</span>
                    </div>
                    <p className="text-gray-600">অনেক ভালো বীজ। গাছ দ্রুত বাড়ছে এবং ফলনও ভালো হয়েছে। সবাইকে সুপারিশ করছি।</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Related Products Section */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">সম্পর্কিত পণ্য</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <p> I loved you sir </p>
            {/* এখানে রিলেটেড প্রোডাক্ট দেখাবে */}
          </div>
        </div>
      </div>
    </div>
  );
}