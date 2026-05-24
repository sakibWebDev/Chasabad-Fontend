'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Link from 'next/link';
import { 
  Star, ShoppingCart, Heart, Truck, Shield, Clock, 
  Sprout, Droplet, Tractor, ChevronRight,
  CheckCircle, Minus, Plus, Package, RotateCcw,
  Share2, MessageCircle, AlertCircle, Thermometer,
  Sun, Calendar, 
} from 'lucide-react';
import { AppDispatch, RootState } from '@/lib/store/store';
import { fetchSeedById, clearSelectedSeed, } from '@/lib/features/seeds/seedSlice';
import { useCart } from '@/lib/hooks/useCart';
import { useWishlist } from '@/lib/hooks/useWishlist';
import { addItem, removeItem } from '@/lib/features/cart/cartSlice';



// Helper function to map difficulty to Bangla
const getDifficultyText = (difficulty: string) => {
  const map: { [key: string]: string } = {
    'easy': 'সহজ',
    'medium': 'মাঝারি',
    'hard': 'কঠিন'
  };
  return map[difficulty] || difficulty;
};

// Helper function to format price
const formatPrice = (price: number) => {
  return `৳${price.toLocaleString('bn-BD')}`;
};

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const productId = params.productId as string;
  
  // Redux state থেকে প্রোডাক্ট নিন
  const { selectedSeed: product, loading, error } = useSelector(
    (state: RootState) => state.seeds
  );
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'details' | 'farming' | 'reviews'>('details');
  
  const { addToCart, isInCart } = useCart();
  const { isInWishlist } = useWishlist();
  
  // API থেকে প্রোডাক্ট লোড করুন
  useEffect(() => {
    if (productId) {
      dispatch(fetchSeedById(productId));
    }
    
    return () => {
      dispatch(clearSelectedSeed());
    };
  }, [dispatch, productId]);
  
  // Loading state
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
  
  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center py-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">প্রোডাক্ট লোড করতে ব্যর্থ!</h2>
            <p className="text-gray-500 mb-6">{error}</p>
            <button 
              onClick={() => dispatch(fetchSeedById(productId))}
              className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700"
            >
              পুনরায় চেষ্টা করুন
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Not found state
  if (!product && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center py-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
            <Sprout className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">প্রোডাক্ট পাওয়া যায়নি!</h2>
            <p className="text-gray-500 mb-6">আপনার অনুসন্ধান করা প্রোডাক্টটি বিদ্যমান নেই</p>
            <Link href="/shop">
              <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700">
                শপিং শুরু করুন
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  // Get product images
  const productImages = product?.image_gallery || (product?.image ? [product.image] : []);
  const mainImage = product?.image || '/placeholder.jpg';
  
  const handleAddToCart = async () => {
    if (!product) return;
    
    await addToCart({
      id: product.id,
      name: product.name,
      price: product.market_price || product.seed_cost || 0,
      image: product.image,
    }, quantity, true);
  };
  
  const handleBuyNow = async () => {
    if (!product) return;
    
    await addToCart({
      id: product.id,
      name: product.name,
      price: product.market_price || product.seed_cost || 0,
      image: product.image,
    }, quantity, false);
    router.push('/checkout');
  };
const handleToggleWishlist = async () => {
  if (!product) return;

  const productId = Number(product.id);

  if (isInWishlist(productId)) {
    removeItem(productId);
  } else {
    addItem({
      id: productId,
      name: product.name,
      price: product.market_price || product.seed_cost || 0
    });
  }
};
  
  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };
  
  const renderStars = (rating?: number, totalReviews?: number) => {
    const avgRating = rating || 0;
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < Math.floor(avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
        ))}
        <span className="text-sm text-gray-600 ml-2">{avgRating}</span>
        {totalReviews !== undefined && (
          <span className="text-sm text-gray-400 ml-1">({totalReviews} রিভিউ)</span>
        )}
      </div>
    );
  };
  
  const currentPrice = product?.market_price || product?.seed_cost || 0;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-emerald-600">হোম</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/shop" className="hover:text-emerald-600">শপ</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href={`/shop/${product?.category}`} className="hover:text-emerald-600">
            {product?.category === 'seeds' ? 'বীজ' : 'পণ্য'}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-emerald-600 font-medium">{product?.name}</span>
        </div>
        
        {/* Product Main Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Product Images */}
            <div>
              <div className="relative h-96 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                {mainImage ? (
                  <img 
                    src={mainImage} 
                    alt={product?.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Sprout className="h-32 w-32 text-green-500" />
                )}
                {product?.organic_certified && (
                  <span className="absolute top-4 right-4 text-xs font-medium px-3 py-1 rounded-full bg-green-500 text-white">
                    জৈব
                  </span>
                )}
                {product?.export_potential && (
                  <span className="absolute top-4 left-4 text-xs font-medium px-3 py-1 rounded-full bg-blue-500 text-white">
                    রপ্তানি যোগ্য
                  </span>
                )}
              </div>
              
              {/* Thumbnails */}
              {productImages.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition flex-shrink-0 ${
                        selectedImage === idx ? 'border-emerald-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={img} alt={`${product?.name} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div>
              <div className="mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  {product?.name}
                </h1>
                {product?.name_en && (
                  <p className="text-gray-500 dark:text-gray-400">{product.name_en}</p>
                )}
                {product?.scientific_name && (
                  <p className="text-sm text-gray-400 italic">{product.scientific_name}</p>
                )}
              </div>
              
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                {renderStars(4.5, 120)}
                <button className="text-sm text-gray-500 hover:text-emerald-600 flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" />
                  রিভিউ দিন
                </button>
              </div>
              
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="text-3xl font-bold text-emerald-600">{formatPrice(currentPrice)}</span>
                {product?.seed_cost && product.market_price && product.market_price > product.seed_cost && (
                  <>
                    <span className="text-lg text-gray-400 line-through">{formatPrice(product.seed_cost)}</span>
                    <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                      {Math.round(((product.seed_cost - currentPrice) / product.seed_cost) * 100)}% ছাড়
                    </span>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <div className="flex items-center gap-1 text-sm">
                  <Package className="h-4 w-4 text-gray-400" />
                  <span className="text-green-600">স্টকে আছে</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <RotateCcw className="h-4 w-4 text-gray-400" />
                  <span>৭ দিন রিটার্ন পলিসি</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Shield className="h-4 w-4 text-gray-400" />
                  <span>গুণগত মানের গ্যারান্টি</span>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {product?.special_notes || `${product?.name} - উচ্চ মানের বীজ যা থেকে ভালো ফলন পাওয়া যায়।`}
              </p>
              
              {/* Key Specifications */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {product?.germination_days && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-emerald-600" />
                    <span>অঙ্কুরোদগম: {product.germination_days} দিন</span>
                  </div>
                )}
                {product?.maturity_days && (
                  <div className="flex items-center gap-2 text-sm">
                    <Sprout className="h-4 w-4 text-emerald-600" />
                    <span>ফলন সময়: {product.maturity_days} দিন</span>
                  </div>
                )}
                {product?.difficulty && (
                  <div className="flex items-center gap-2 text-sm">
                    <Tractor className="h-4 w-4 text-emerald-600" />
                    <span>চাষের জটিলতা: {getDifficultyText(product.difficulty)}</span>
                  </div>
                )}
                {product?.sunlight && (
                  <div className="flex items-center gap-2 text-sm">
                    <Sun className="h-4 w-4 text-emerald-600" />
                    <span>সূর্যের আলো: {product.sunlight}</span>
                  </div>
                )}
              </div>
              
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
                    className="p-2 hover:bg-gray-100 rounded-r-lg"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500">প্যাকেট</span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={isInCart(product?.id || '')}
                  className={`flex-1 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${
                    isInCart(product?.id || '')
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {isInCart(product?.id || '') ? 'কার্টে আছে' : 'কার্টে যোগ করুন'}
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
                  <Heart className={`h-5 w-5 ${isInWishlist(Number(product?.id)) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                </button>
                <button className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition">
                  <Share2 className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              {/* Delivery Info */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-emerald-600" />
                  <span>ফ্রি ডেলিভারি ৳1000 এর বেশি অর্ডারে</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  <span>অর্ডার করার ২৪-৪৮ ঘন্টার মধ্যে ডেলিভারি</span>
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
              বিস্তারিত তথ্য
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
              রিভিউ
            </button>
          </div>
          
          <div className="p-6">
            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">পণ্যের বিবরণ</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product?.special_notes || `${product?.name} একটি উন্নত মানের বীজ যা থেকে ভালো ফলন পাওয়া যায়।`}
                  </p>
                </div>
                
                {/* Benefits */}
                {(product?.benefits_bn?.length > 0 || product?.benefits?.length > 0) && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">সুবিধাসমূহ</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {(product?.benefits_bn || product?.benefits || []).map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Full Specifications */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">পূর্ণ স্পেসিফিকেশন</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product?.germination_days && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium text-gray-600">অঙ্কুরোদগম সময়</span>
                          <span className="text-gray-800">{product.germination_days} দিন</span>
                        </div>
                      )}
                      {product?.maturity_days && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium text-gray-600">ফলন সময়</span>
                          <span className="text-gray-800">{product.maturity_days} দিন</span>
                        </div>
                      )}
                      {product?.spacing && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium text-gray-600">বীজের দূরত্ব</span>
                          <span className="text-gray-800">{product.spacing}</span>
                        </div>
                      )}
                      {product?.depth_cm && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium text-gray-600">বীজ রোপণের গভীরতা</span>
                          <span className="text-gray-800">{product.depth_cm} সেমি</span>
                        </div>
                      )}
                      {product?.sunlight && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium text-gray-600">সূর্যের প্রয়োজন</span>
                          <span className="text-gray-800">{product.sunlight}</span>
                        </div>
                      )}
                      {product?.watering && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium text-gray-600">পানির প্রয়োজন</span>
                          <span className="text-gray-800">{product.watering}</span>
                        </div>
                      )}
                      {product?.soil_type && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium text-gray-600">মাটির ধরন</span>
                          <span className="text-gray-800">{product.soil_type}</span>
                        </div>
                      )}
                      {product?.ph_min && product?.ph_max && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium text-gray-600">মাটির pH মান</span>
                          <span className="text-gray-800">{product.ph_min} - {product.ph_max}</span>
                        </div>
                      )}
                      {product?.temperature_min && product?.temperature_max && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium text-gray-600">তাপমাত্রা</span>
                          <span className="text-gray-800">{product.temperature_min}°C - {product.temperature_max}°C</span>
                        </div>
                      )}
                      {product?.origin_country && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium text-gray-600">উৎপত্তি দেশ</span>
                          <span className="text-gray-800">{product.origin_country}</span>
                        </div>
                      )}
                      {product?.variety_type && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="font-medium text-gray-600">বীজের ধরন</span>
                          <span className="text-gray-800">{product.variety_type}</span>
                        </div>
                      )}
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
                
                {/* Farming Instructions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product?.soil_type && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                          <Tractor className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">মাটি তৈরি</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {product.soil_type} মাটি ব্যবহার করুন। মাটির pH মান {product.ph_min}-{product.ph_max} এর মধ্যে রাখুন।
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {product?.watering && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                          <Droplet className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">সেচ ব্যবস্থাপনা</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {product.watering}। নিয়মিত পানি দিন কিন্তু ড্রেনেজ ভালো রাখুন।
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {product?.sunlight && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                          <Sun className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">রোদের প্রয়োজন</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {product.sunlight} সূর্যের আলো প্রয়োজন।
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {product?.temperature_min && product?.temperature_max && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                          <Thermometer className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">তাপমাত্রা নিয়ন্ত্রণ</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {product.temperature_min}°C - {product.temperature_max}°C তাপমাত্রা উপযুক্ত।
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Precautions */}
                {(product?.precautions_bn?.length > 0 || product?.precautions?.length > 0) && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3">সতর্কতা</h3>
                    <ul className="space-y-2">
                      {(product?.precautions_bn || product?.precautions || []).map((precaution, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-600">
                          <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                          {precaution}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* How to Use / Growing Steps */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">চাষের ধাপসমূহ</h3>
                  <ol className="space-y-3 list-decimal list-inside">
                    <li className="text-gray-600">উর্বর মাটি নির্বাচন করুন এবং জৈব সার মিশিয়ে তৈরি করুন</li>
                    <li className="text-gray-600">{product?.depth_cm || 1-2} সেমি গভীরে বীজ বপন করুন</li>
                    <li className="text-gray-600">নিয়মিত পানি দিন তবে পানি জমতে দেবেন না</li>
                    <li className="text-gray-600">{product?.germination_days || 7-14} দিনের মধ্যে চারা গজাবে</li>
                    <li className="text-gray-600">{product?.maturity_days || 60-90} দিনের মধ্যে ফল সংগ্রহ করুন</li>
                  </ol>
                </div>
              </div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">গ্রাহক রিভিউ</h3>
                    <p className="text-gray-500">গ্রাহকদের মতামত</p>
                  </div>
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                    রিভিউ দিন
                  </button>
                </div>
                
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">কোন রিভিউ নেই</p>
                  <p className="text-sm text-gray-400">এই পণ্যটিতে প্রথম রিভিউ দিন</p>
                </div>
              </div>
            )}
          </div>
        </div>
       
      </div>
       <p>other product</p>
    </div>
  );
}