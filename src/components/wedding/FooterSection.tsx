import { Heart } from 'lucide-react';

const FooterSection = () => {
  return (
    <footer className="relative bg-secondary py-16 px-6">
      {/* Batik Pattern */}
      <div className="absolute inset-0 batik-pattern opacity-5" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Ornament */}
        <div className="mb-8">
          <svg className="w-24 h-auto mx-auto text-primary" viewBox="0 0 100 30">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              d="M0,15 Q25,0 50,15 Q75,30 100,15"
            />
            <circle cx="50" cy="15" r="3" fill="currentColor" />
          </svg>
        </div>

        {/* Names */}
        <h2 className="font-display text-3xl md:text-4xl text-primary mb-4">
          Arya & Dewi
        </h2>

        {/* Message */}
        <p className="text-secondary-foreground/80 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>

        {/* Thank You */}
        <div className="border-t border-primary/20 pt-8">
          <p className="font-display text-xl text-secondary-foreground mb-2">
            Terima Kasih
          </p>
          <p className="text-secondary-foreground/60 text-sm">
            Atas doa dan restu yang telah diberikan
          </p>
        </div>

        {/* Love Icon */}
        <div className="mt-8 flex items-center justify-center gap-2 text-primary">
          <div className="w-8 h-px bg-primary/30" />
          <Heart className="w-5 h-5" fill="currentColor" />
          <div className="w-8 h-px bg-primary/30" />
        </div>

        {/* Copyright */}
        <p className="mt-8 text-secondary-foreground/40 text-xs">
          © 2025 | Made with love for Arya & Dewi
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
