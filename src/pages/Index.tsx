import { useState, useEffect } from 'react';
import HeroSection from '@/components/wedding/HeroSection';
import OpeningSection from '@/components/wedding/OpeningSection';
import CoupleSection from '@/components/wedding/CoupleSection';
import EventSection from '@/components/wedding/EventSection';
import CountdownSection from '@/components/wedding/CountdownSection';
import LoveStorySection from '@/components/wedding/LoveStorySection';
import GallerySection from '@/components/wedding/GallerySection';
import RSVPSection from '@/components/wedding/RSVPSection';
import GiftSection from '@/components/wedding/GiftSection';
import WishesSection from '@/components/wedding/WishesSection';
import FooterSection from '@/components/wedding/FooterSection';
import { Music, Music2 } from 'lucide-react';

const Index = () => {
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const handleOpenInvitation = () => {
    setIsInvitationOpened(true);
    setIsMusicPlaying(true);
  };

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <>
      {/* SEO Meta */}
      <title>Undangan Pernikahan Arya & Dewi | 21 Juni 2025</title>
      <meta name="description" content="Kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam pernikahan Arya Wijaya Kusuma & Dewi Ayu Paramitha pada Sabtu, 21 Juni 2025 di Yogyakarta." />

      <main className="relative overflow-x-hidden">
        {/* Hero Section - Always visible */}
        <HeroSection 
          onOpenInvitation={handleOpenInvitation} 
          isOpened={isInvitationOpened} 
        />

        {/* Content Sections - Show after invitation is opened */}
        {isInvitationOpened && (
          <>
            <OpeningSection />
            <CoupleSection />
            <EventSection />
            <CountdownSection />
            <LoveStorySection />
            <GallerySection />
            <RSVPSection />
            <GiftSection />
            <WishesSection />
            <FooterSection />
          </>
        )}

        {/* Music Toggle Button */}
        {isInvitationOpened && (
          <button
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary/90 text-primary-foreground rounded-full shadow-gold flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-110"
            aria-label={isMusicPlaying ? 'Pause music' : 'Play music'}
          >
            {isMusicPlaying ? (
              <Music className="w-5 h-5 animate-pulse" />
            ) : (
              <Music2 className="w-5 h-5" />
            )}
          </button>
        )}
      </main>
    </>
  );
};

export default Index;
