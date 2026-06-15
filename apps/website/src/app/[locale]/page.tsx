import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import DonateSection from "@/components/home/DonateSection";
import AdvertisementSection from "@/components/home/AdvertisementSection";
import SponsorsSection from "@/components/home/SponsorsSection";
import EventsPreview from "@/components/home/EventsPreview";
import NewsSection from "@/components/home/NewsSection";
import LiveButton from "@/components/home/LiveButton";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <DonateSection />
        <AdvertisementSection />
        <SponsorsSection />
        <EventsPreview />
        <NewsSection />
        <LiveButton />
      </main>
      <Footer />
    </>
  );
}
