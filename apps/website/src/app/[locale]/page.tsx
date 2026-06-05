import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import EventsPreview from "@/components/home/EventsPreview";
import LiveSection from "@/components/home/LiveSection";
import DonateSection from "@/components/home/DonateSection";
import GalleryPreview from "@/components/home/GalleryPreview";
import NewsSection from "@/components/home/NewsSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <EventsPreview />
        <LiveSection />
        <DonateSection />
        <GalleryPreview />
        <NewsSection />
      </main>
      <Footer />
    </>
  );
}
