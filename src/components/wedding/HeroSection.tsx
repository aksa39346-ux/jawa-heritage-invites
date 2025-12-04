import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import heroImage from '@/assets/hero-prewedding.jpg';

interface HeroSectionProps {
  onOpenInvitation: () => void;
  isOpened: boolean;
}

const HeroSection = ({ onOpenInvitation, isOpened }: HeroSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContent = () => {
    const element = document.getElementById('pembuka');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    onOpenInvitation();
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-jawa-black/50 via-jawa-black/55 to-jawa-black/70" />
      
      {/* Batik Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] batik-pattern" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Content Box with subtle background */}
        <div className="bg-jawa-black/30 backdrop-blur-sm px-12 py-16 rounded-sm">
        {/* Label */}
        <div 
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="mb-6 font-sans text-base md:text-lg uppercase tracking-[0.3em] text-jawa-cream font-medium text-shadow">
            The Wedding Of
          </p>
        </div>

        {/* Names */}
        <div 
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-jawa-gold text-shadow-lg mb-2 font-semibold">
            Arya
          </h1>
          <p className="font-display text-3xl md:text-4xl text-jawa-cream italic my-4 text-shadow">&</p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-jawa-gold text-shadow-lg font-semibold">
            Dewi
          </h1>
        </div>

        {/* Date */}
        <div 
          className={`mt-10 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-sans text-lg md:text-xl text-jawa-cream tracking-widest text-shadow font-medium">
            Sabtu, 21 Juni 2025
          </p>
        </div>

        {/* CTA Button */}
        <div 
          className={`mt-14 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {!isOpened && (
            <button
              onClick={scrollToContent}
              className="group relative overflow-hidden rounded-sm border-2 border-jawa-gold bg-jawa-gold/20 px-12 py-5 font-sans text-base uppercase tracking-[0.25em] text-jawa-cream backdrop-blur-sm transition-all duration-500 hover:bg-jawa-gold hover:text-jawa-black hover:shadow-gold animate-pulse-soft"
            >
              <span className="relative z-10 font-medium">Buka Undangan</span>
              <div className="absolute inset-0 -translate-x-full bg-jawa-gold transition-transform duration-500 group-hover:translate-x-0" />
            </button>
          )}
        </div>
        </div>

        {/* Scroll Indicator */}
        {isOpened && (
          <div className="absolute bottom-10 animate-bounce">
            <ChevronDown className="h-8 w-8 text-jawa-gold/70" />
          </div>
        )}
      </div>

      {/* Decorative Ornaments */}
      <div className="absolute left-0 top-0 h-32 w-32 opacity-20">
        <svg viewBox="0 0 100 100" className="h-full w-full text-jawa-gold">
          <path
            fill="currentColor"
            d="M0 0 L50 0 Q50 50 0 50 Z"
          />
        </svg>
      </div>
      <div className="absolute right-0 bottom-0 h-32 w-32 rotate-180 opacity-20">
        <svg viewBox="0 0 100 100" className="h-full w-full text-jawa-gold">
          <path
            fill="currentColor"
            d="M0 0 L50 0 Q50 50 0 50 Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
