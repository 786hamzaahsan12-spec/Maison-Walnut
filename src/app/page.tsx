import HeroSlider from "@/components/HeroSlider";
import FeaturedCollections from "@/components/FeaturedCollections";
import ProductSection from "@/components/ProductSection";
import BrandStory from "@/components/BrandStory";
import WhyChooseUs from "@/components/WhyChooseUs";
import PromoBanner from "@/components/PromoBanner";
import Testimonials from "@/components/Testimonials";
import InspirationGallery from "@/components/InspirationGallery";
import FAQ from "@/components/FAQ";
import NewsletterSection from "@/components/NewsletterSection";
import { bestsellers, newArrivals } from "@/data/products";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <FeaturedCollections />
      <ProductSection id="bestsellers" eyebrow="Bestsellers" title="Our most loved pieces" products={bestsellers()} href="/collections?tag=bestseller" tinted />
      <ProductSection id="new" eyebrow="New Arrivals" title="Fresh to the showroom" products={newArrivals()} href="/collections?tag=new" />
      <BrandStory />
      <WhyChooseUs />
      <PromoBanner />
      <Testimonials />
      <InspirationGallery />
      <FAQ />
      <NewsletterSection />
    </>
  );
}