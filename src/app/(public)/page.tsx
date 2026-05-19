'use client'

import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import SpecialOfferBanner from '@/components/home/SpecialOfferBanner';
import TrendingProducts from '@/components/home/TrendingProducts';
import SeasonalProducts from '@/components/home/SeasonalProducts';
import ExpertTipsSection from '@/components/home/ExpertTipsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import StatisticsSection from '@/components/home/StatisticsSection';
import InteractiveTools from '@/components/home/InteractiveTools';
import BrandPartners from '@/components/home/BrandPartners';
import NewsletterSection from '@/components/home/NewsletterSection';
import AppPromotion from '@/components/home/AppPromotion';



export default function Home() {
    return (
        <div>
            <HeroSection />
            <TrendingProducts />
            <SeasonalProducts />
      {/* <CategoriesSection /> */}
      <SpecialOfferBanner /> 
      <FeaturesSection />
      <ExpertTipsSection />
      <TestimonialsSection />
      <StatisticsSection />
      <InteractiveTools />
      <BrandPartners />
      <NewsletterSection />
      <AppPromotion />
        </div>
    );
}
