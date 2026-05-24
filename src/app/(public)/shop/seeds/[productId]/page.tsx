// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { RootState } from '@/lib/store/store';
// import { AppDispatch } from '@/lib/store/store';
// import { 
//   fetchSeedById, 
//   clearCurrentSeed,
//   Seed 
// } from '@/lib/features/seeds/seedSlice';
// import { useCart } from '@/lib/hooks/useCart';
// import Loader from '@/components/common/Loader';
// import Button from '@/components/common/Button';
// import styles from '@/styles/seeds.module.css';

// // Metadata for SEO
// export async function generateMetadata({ params }: { params: { productId: string } }) {
//   try {
//     const seed = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seeds/${params.productId}`)
//       .then(res => res.json())
//       .catch(() => null);
    
//     return {
//       title: seed ? `${seed.name} - Seed Shop` : 'Product Not Found',
//       description: seed?.description?.substring(0, 160) || 'Shop high-quality seeds for your garden',
//     };
//   } catch {
//     return {
//       title: 'Product Not Found',
//       description: 'Shop high-quality seeds for your garden',
//     };
//   }
// }

// export default function SeedProductPage() {
//   const params = useParams();
//   const router = useRouter();
//   const productId = params.productId as string;
//   const dispatch = useDispatch<AppDispatch>();
  
//   // Use the cart hook
//   const { 
//     addToCart, 
//     isInCart, 
//     getItemQuantity, 
//     isLoading: cartIsLoading,
//     totalItems,
//     totalPrice 
//   } = useCart();
  
//   const { currentSeed, loading, error } = useSelector(
//     (state: RootState) => state.seeds
//   );

//   const [quantity, setQuantity] = useState(1);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [activeTab, setActiveTab] = useState<'details' | 'specifications' | 'reviews'>('details');
//   const [showSuccess, setShowSuccess] = useState(false);

//   useEffect(() => {
//     if (productId) {
//       dispatch(fetchSeedById(productId));
//     }
    
//     return () => {
//       dispatch(clearCurrentSeed());
//     };
//   }, [dispatch, productId]);

//   // Check if product is already in cart
//   const productInCart = currentSeed ? isInCart(currentSeed.id) : false;
//   const cartQuantity = currentSeed ? getItemQuantity(currentSeed.id) : 0;

//   const handleAddToCart = async () => {
//     if (!currentSeed) return;
    
//     try {
//       await addToCart(
//         {
//           id: currentSeed.id,
//           name: currentSeed.name,
//           price: currentSeed.price,
//           image: currentSeed.imageUrl,
//         },
//         quantity,
//         true
//       );
//       setShowSuccess(true);
//       setTimeout(() => setShowSuccess(false), 3000);
//     } catch (error) {
//       console.error('Failed to add to cart:', error);
//     }
//   };

//   const handleBuyNow = async () => {
//     if (!currentSeed) return;
    
//     try {
//       await addToCart(
//         {
//           id: currentSeed.id,
//           name: currentSeed.name,
//           price: currentSeed.price,
//           image: currentSeed.imageUrl,
//         },
//         quantity,
//         false // Don't show toast for buy now
//       );
//       router.push('/checkout');
//     } catch (error) {
//       console.error('Failed to process buy now:', error);
//     }
//   };

//   const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = parseInt(e.target.value);
//     if (value > 0 && value <= (currentSeed?.inStock ? 99 : 0)) {
//       setQuantity(value);
//     }
//   };

//   const incrementQuantity = () => {
//     if (quantity < 99 && currentSeed?.inStock) {
//       setQuantity(quantity + 1);
//     }
//   };

//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div className={styles.loadingContainer}>
//         <Loader />
//         <p>Loading product details...</p>
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className={styles.errorContainer}>
//         <div className={styles.errorCard}>
//           <div className={styles.errorIcon}>⚠️</div>
//           <h2>Failed to Load Product</h2>
//           <p className={styles.errorMessage}>{typeof error === 'string' ? error : error.message}</p>
//           <div className={styles.errorActions}>
//             <Button onClick={() => window.location.reload()} variant="primary">
//               Try Again
//             </Button>
//             <Button onClick={() => router.push('/shop')} variant="secondary">
//               Back to Shop
//             </Button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Not found state
//   if (!currentSeed && !loading) {
//     return (
//       <div className={styles.notFoundContainer}>
//         <div className={styles.notFoundCard}>
//           <div className={styles.notFoundIcon}>🌱</div>
//           <h2>Product Not Found</h2>
//           <p>The seed product you're looking for doesn't exist or has been removed.</p>
//           <Button onClick={() => router.push('/shop')} variant="primary">
//             Browse Seeds
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   const productImages = currentSeed?.images || [currentSeed?.imageUrl || '/placeholder.jpg'];

//   return (
//     <div className={styles.pageContainer}>
//       {/* Success Notification */}
//       {showSuccess && (
//         <div className={styles.successNotification}>
//           <span>✓</span> Added to cart successfully!
//         </div>
//       )}

//       {/* Mini Cart Summary */}
//       {totalItems > 0 && (
//         <div className={styles.miniCartSummary}>
//           <Link href="/cart" className={styles.cartSummaryLink}>
//             🛒 {totalItems} item(s) - ${totalPrice.toFixed(2)}
//           </Link>
//         </div>
//       )}

//       {/* Cart Status Badge */}
//       {productInCart && (
//         <div className={styles.cartStatus}>
//           <span className={styles.cartStatusIcon}>✓</span>
//           Already in cart: {cartQuantity} item(s)
//           <Link href="/cart" className={styles.viewCartLink}>View Cart →</Link>
//         </div>
//       )}

//       {/* Breadcrumb */}
//       <div className={styles.breadcrumb}>
//         <Link href="/">Home</Link>
//         <span className={styles.separator}>/</span>
//         <Link href="/shop">Shop</Link>
//         <span className={styles.separator}>/</span>
//         <Link href="/shop/seeds">Seeds</Link>
//         <span className={styles.separator}>/</span>
//         <span className={styles.current}>{currentSeed?.name}</span>
//       </div>

//       {/* Product Main Section */}
//       <div className={styles.productMain}>
//         {/* Image Gallery */}
//         <div className={styles.imageGallery}>
//           <div className={styles.mainImageContainer}>
//             <div className={styles.mainImage}>
//               <img
//                 src={productImages[selectedImage]}
//                 alt={currentSeed?.name}
//                 className={styles.mainImageImg}
//               />
//             </div>
//           </div>
          
//           {productImages.length > 1 && (
//             <div className={styles.thumbnailList}>
//               {productImages.map((img, idx) => (
//                 <button
//                   key={idx}
//                   className={`${styles.thumbnail} ${selectedImage === idx ? styles.activeThumbnail : ''}`}
//                   onClick={() => setSelectedImage(idx)}
//                 >
//                   <img src={img} alt={`${currentSeed?.name} view ${idx + 1}`} />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Product Info */}
//         <div className={styles.productInfo}>
//           {/* Badges */}
//           <div className={styles.badges}>
//             {currentSeed?.inStock && <span className={styles.inStockBadge}>In Stock</span>}
//             {currentSeed?.oldPrice && <span className={styles.saleBadge}>Sale</span>}
//             {currentSeed?.isNew && <span className={styles.newBadge}>New</span>}
//             {productInCart && <span className={styles.inCartBadge}>In Cart ({cartQuantity})</span>}
//           </div>

//           <h1 className={styles.productTitle}>{currentSeed?.name}</h1>
          
//           {/* Rating */}
//           <div className={styles.ratingSection}>
//             <div className={styles.stars}>
//               {[...Array(5)].map((_, i) => (
//                 <span key={i} className={i < (currentSeed?.rating || 0) ? styles.starFilled : styles.starEmpty}>
//                   ★
//                 </span>
//               ))}
//             </div>
//             <span className={styles.reviewCount}>({currentSeed?.reviewCount || 0} reviews)</span>
//             <span className={styles.sku}>SKU: {currentSeed?.sku || productId}</span>
//           </div>

//           {/* Price */}
//           <div className={styles.priceSection}>
//             <div className={styles.currentPrice}>${currentSeed?.price?.toFixed(2)}</div>
//             {currentSeed?.oldPrice && (
//               <div className={styles.oldPrice}>${currentSeed.oldPrice.toFixed(2)}</div>
//             )}
//             {currentSeed?.oldPrice && (
//               <div className={styles.discount}>
//                 Save ${(currentSeed.oldPrice - (currentSeed.price || 0)).toFixed(2)}
//               </div>
//             )}
//           </div>

//           {/* Short Description */}
//           <div className={styles.shortDescription}>
//             <p>{currentSeed?.shortDescription || currentSeed?.description?.substring(0, 200)}</p>
//           </div>

//           {/* Key Features */}
//           {currentSeed?.features && currentSeed.features.length > 0 && (
//             <div className={styles.features}>
//               <h3>Key Features:</h3>
//               <ul>
//                 {currentSeed.features.map((feature, idx) => (
//                   <li key={idx}>{feature}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Quantity and Add to Cart */}
//           <div className={styles.cartSection}>
//             <div className={styles.quantitySelector}>
//               <label>Quantity:</label>
//               <div className={styles.quantityControls}>
//                 <button 
//                   onClick={decrementQuantity} 
//                   disabled={quantity <= 1 || !currentSeed?.inStock}
//                   className={styles.qtyBtn}
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={quantity}
//                   onChange={handleQuantityChange}
//                   min="1"
//                   max="99"
//                   disabled={!currentSeed?.inStock}
//                   className={styles.qtyInput}
//                 />
//                 <button 
//                   onClick={incrementQuantity} 
//                   disabled={quantity >= 99 || !currentSeed?.inStock}
//                   className={styles.qtyBtn}
//                 >
//                   +
//                 </button>
//               </div>
//               <span className={styles.stockInfo}>
//                 {currentSeed?.inStock ? `${currentSeed.stockCount || 99}+ available` : 'Out of stock'}
//               </span>
//             </div>

//             <div className={styles.actionButtons}>
//               <Button 
//                 onClick={handleAddToCart} 
//                 disabled={!currentSeed?.inStock || cartIsLoading}
//                 className={styles.addToCartBtn}
//                 variant="primary"
//                 size="large"
//               >
//                 {cartIsLoading 
//                   ? 'Adding...' 
//                   : productInCart 
//                     ? `Add More (${cartQuantity} in cart)` 
//                     : currentSeed?.inStock 
//                       ? 'Add to Cart' 
//                       : 'Out of Stock'}
//               </Button>

//               <Button 
//                 variant="outline" 
//                 size="large"
//                 className={styles.buyNowBtn}
//                 onClick={handleBuyNow}
//                 disabled={!currentSeed?.inStock}
//               >
//                 Buy Now
//               </Button>
//             </div>
//           </div>

//           {/* Delivery Info */}
//           <div className={styles.deliveryInfo}>
//             <div className={styles.deliveryItem}>
//               <span>🚚</span>
//               <span>Free shipping on orders over $50</span>
//             </div>
//             <div className={styles.deliveryItem}>
//               <span>↺</span>
//               <span>30-day return policy</span>
//             </div>
//             <div className={styles.deliveryItem}>
//               <span>✓</span>
//               <span>100% satisfaction guarantee</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Product Details Tabs */}
//       <div className={styles.productTabs}>
//         <div className={styles.tabHeaders}>
//           <button 
//             className={`${styles.tabButton} ${activeTab === 'details' ? styles.activeTab : ''}`}
//             onClick={() => setActiveTab('details')}
//           >
//             Product Details
//           </button>
//           <button 
//             className={`${styles.tabButton} ${activeTab === 'specifications' ? styles.activeTab : ''}`}
//             onClick={() => setActiveTab('specifications')}
//           >
//             Specifications
//           </button>
//           <button 
//             className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.activeTab : ''}`}
//             onClick={() => setActiveTab('reviews')}
//           >
//             Customer Reviews ({currentSeed?.reviews?.length || 0})
//           </button>
//         </div>

//         <div className={styles.tabContent}>
//           {activeTab === 'details' && (
//             <div className={styles.detailsTab}>
//               <div className={styles.description}>
//                 <h3>Description</h3>
//                 <p>{currentSeed?.description}</p>
//               </div>
              
//               {currentSeed?.growingInstructions && (
//                 <div className={styles.growingInstructions}>
//                   <h3>Growing Instructions</h3>
//                   <p>{currentSeed.growingInstructions}</p>
//                 </div>
//               )}
              
//               {currentSeed?.benefits && currentSeed.benefits.length > 0 && (
//                 <div className={styles.benefits}>
//                   <h3>Benefits</h3>
//                   <ul>
//                     {currentSeed.benefits.map((benefit, idx) => (
//                       <li key={idx}>{benefit}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           )}

//           {activeTab === 'specifications' && (
//             <div className={styles.specificationsTab}>
//               <table className={styles.specsTable}>
//                 <tbody>
//                   <tr>
//                     <td className={styles.specLabel}>Seed Type</td>
//                     <td>{currentSeed?.type || 'Heirloom'}</td>
//                   </tr>
//                   <tr>
//                     <td className={styles.specLabel}>Germination Time</td>
//                     <td>{currentSeed?.germinationTime || '7-14 days'}</td>
//                   </tr>
//                   <tr>
//                     <td className={styles.specLabel}>Harvest Time</td>
//                     <td>{currentSeed?.harvestTime || '60-90 days'}</td>
//                   </tr>
//                   <tr>
//                     <td className={styles.specLabel}>Sun Requirements</td>
//                     <td>{currentSeed?.sunRequirements || 'Full sun'}</td>
//                   </tr>
//                   <tr>
//                     <td className={styles.specLabel}>Water Needs</td>
//                     <td>{currentSeed?.waterNeeds || 'Moderate'}</td>
//                   </tr>
//                   <tr>
//                     <td className={styles.specLabel}>Soil Type</td>
//                     <td>{currentSeed?.soilType || 'Well-draining, fertile soil'}</td>
//                   </tr>
//                   <tr>
//                     <td className={styles.specLabel}>Planting Season</td>
//                     <td>{currentSeed?.plantingSeason || 'Spring'}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {activeTab === 'reviews' && (
//             <div className={styles.reviewsTab}>
//               {currentSeed?.reviews && currentSeed.reviews.length > 0 ? (
//                 <div className={styles.reviewsList}>
//                   {currentSeed.reviews.map((review) => (
//                     <div key={review.id} className={styles.reviewItem}>
//                       <div className={styles.reviewHeader}>
//                         <strong>{review.userName}</strong>
//                         <div className={styles.reviewStars}>
//                           {[...Array(5)].map((_, i) => (
//                             <span key={i} className={i < review.rating ? styles.starFilled : styles.starEmpty}>
//                               ★
//                             </span>
//                           ))}
//                         </div>
//                         <span className={styles.reviewDate}>
//                           {new Date(review.date).toLocaleDateString()}
//                         </span>
//                       </div>
//                       <p className={styles.reviewComment}>{review.comment}</p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className={styles.noReviews}>
//                   <p>No reviews yet. Be the first to review this product!</p>
//                   <Button variant="primary">Write a Review</Button>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Related Products */}
//       {currentSeed?.relatedProducts && currentSeed.relatedProducts.length > 0 && (
//         <div className={styles.relatedProducts}>
//           <h2 className={styles.sectionTitle}>You May Also Like</h2>
//           <div className={styles.relatedGrid}>
//             {currentSeed.relatedProducts.map((product) => (
//               <Link href={`/shop/seeds/${product.id}`} key={product.id} className={styles.relatedCard}>
//                 <div className={styles.relatedImage}>
//                   <img src={product.imageUrl} alt={product.name} />
//                 </div>
//                 <h3>{product.name}</h3>
//                 <div className={styles.relatedPrice}>${product.price?.toFixed(2)}</div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // Generate static paths for SSG (optional)
// export async function generateStaticParams() {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seeds`);
//     const seeds = await response.json();
    
//     return seeds.map((seed: Seed) => ({
//       productId: seed.id,
//     }));
//   } catch (error) {
//     return [];
//   }
// }

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <div>
      <h1>Dynamic Page</h1>
      <p>This page is rendered dynamically on the server for each request.</p>
    </div>
  );
}