import { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';

const CountdownSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const weddingDate = new Date('2025-06-21T08:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeBlock = ({ value, label, delay }: { value: number; label: string; delay: string }) => (
    <div 
      className={`text-center transition-all duration-1000 ${delay} ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="relative">
        {/* Background Card */}
        <div className="w-20 h-24 md:w-28 md:h-32 bg-card border border-primary/20 rounded-sm flex items-center justify-center shadow-card">
          <span className="font-display text-4xl md:text-5xl text-primary">
            {String(value).padStart(2, '0')}
          </span>
        </div>
        
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-primary/50" />
        <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-primary/50" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-primary/50" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-primary/50" />
      </div>
      <p className="mt-3 text-sm md:text-base text-muted-foreground tracking-wider uppercase">
        {label}
      </p>
    </div>
  );

  return (
    <section 
      ref={ref}
      className="relative bg-secondary py-24 px-6 overflow-hidden"
    >
      {/* Batik Pattern */}
      <div className="absolute inset-0 batik-pattern opacity-10" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Title */}
        <div 
          className={`text-center mb-12 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-display text-3xl md:text-4xl text-secondary-foreground mb-4">
            Menghitung Hari
          </h2>
          <p className="text-secondary-foreground/70">
            Menuju hari bahagia kami
          </p>
        </div>

        {/* Countdown */}
        <div className="flex justify-center gap-4 md:gap-8">
          <TimeBlock value={timeLeft.days} label="Hari" delay="delay-100" />
          <TimeBlock value={timeLeft.hours} label="Jam" delay="delay-200" />
          <TimeBlock value={timeLeft.minutes} label="Menit" delay="delay-300" />
          <TimeBlock value={timeLeft.seconds} label="Detik" delay="delay-400" />
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
