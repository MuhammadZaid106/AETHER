import { HeroPinned } from "@/components/home/HeroPinned";
import { CategoryRail } from "@/components/home/CategoryRail";
import { FlashSale } from "@/components/home/FlashSale";
import { BentoGrid } from "@/components/home/BentoGrid";
import { TrendingCarousel } from "@/components/home/TrendingCarousel";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { StatsSection } from "@/components/home/StatsSection";
import { BrandStrip } from "@/components/home/BrandStrip";
import { TestimonialStack } from "@/components/home/TestimonialStack";
import { CTABanner } from "@/components/home/CTABanner";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 1. GSAP ScrollTrigger Pinned Hero */}
      <HeroPinned />

      {/* 2. Snap Scroll Category Rail */}
      <CategoryRail />

      {/* 3. Hourly Flash Event */}
      <FlashSale />

      {/* 4. Bento Grid Curated Edits */}
      <BentoGrid />

      {/* 5. Horizontal Scroll Spotlight Carousel */}
      <TrendingCarousel />

      {/* 6. Video Showcase Film Reveal */}
      <VideoShowcase />

      {/* 7. Stats Section with Counters */}
      <StatsSection />

      {/* 8. Infinite Brands marquee */}
      <BrandStrip />

      {/* 9. GSAP Stacking Review Cards */}
      <TestimonialStack />

      {/* 10. Kinetic Full-bleed CTA */}
      <CTABanner />

      {/* 11. Subscription input */}
      <Newsletter />
    </div>
  );
}
