import { useInView } from '@/hooks/useInView';

const OpeningSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.3 });

  return (
    <section 
      id="pembuka"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center bg-background py-24 px-6 batik-pattern"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Ornament Top */}
        <div 
          className={`mb-12 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <svg className="w-40 h-auto mx-auto text-primary" viewBox="0 0 200 40">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              d="M0,20 Q50,0 100,20 Q150,40 200,20"
            />
            <circle cx="100" cy="20" r="4" fill="currentColor" />
            <circle cx="80" cy="18" r="2" fill="currentColor" />
            <circle cx="120" cy="22" r="2" fill="currentColor" />
          </svg>
        </div>

        {/* Bismillah */}
        <div 
          className={`mb-8 transition-all duration-1000 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-display text-3xl md:text-4xl text-primary mb-4">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
          </p>
        </div>

        {/* Opening Text */}
        <div 
          className={`space-y-6 transition-all duration-1000 delay-400 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-sans text-lg md:text-xl text-secondary leading-relaxed">
            Assalamualaikum Warahmatullahi Wabarakatuh
          </p>

          <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan 
            pernikahan putra-putri kami. Merupakan suatu kehormatan dan kebahagiaan bagi kami 
            apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
          </p>
        </div>

        {/* Ornament Bottom */}
        <div 
          className={`mt-12 transition-all duration-1000 delay-600 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <svg className="w-40 h-auto mx-auto text-primary rotate-180" viewBox="0 0 200 40">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              d="M0,20 Q50,0 100,20 Q150,40 200,20"
            />
            <circle cx="100" cy="20" r="4" fill="currentColor" />
            <circle cx="80" cy="18" r="2" fill="currentColor" />
            <circle cx="120" cy="22" r="2" fill="currentColor" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default OpeningSection;
