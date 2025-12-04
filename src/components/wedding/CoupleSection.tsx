import { useInView } from '@/hooks/useInView';
import { Instagram } from 'lucide-react';
import groomImage from '@/assets/groom-portrait.jpg';
import brideImage from '@/assets/bride-portrait.jpg';

const CoupleSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const groom = {
    name: 'Arya Wijaya Kusuma',
    fullTitle: 'Putra dari',
    father: 'Bpk. Surya Wijaya',
    mother: 'Ibu Ratna Dewi',
    city: 'Yogyakarta',
    instagram: '@aryawj',
    image: groomImage,
  };

  const bride = {
    name: 'Dewi Ayu Paramitha',
    fullTitle: 'Putri dari',
    father: 'Bpk. Bambang Sutrisno',
    mother: 'Ibu Sri Rahayu',
    city: 'Solo',
    instagram: '@dewiayup',
    image: brideImage,
  };

  return (
    <section 
      ref={ref}
      className="relative bg-card py-24 px-6"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 batik-pattern" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-display text-3xl md:text-4xl text-secondary mb-4">
            Mempelai
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* Couple Cards */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
          {/* Groom */}
          <div 
            className={`text-center transition-all duration-1000 delay-200 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative inline-block mb-8">
              {/* Frame Ornament */}
              <div className="absolute -inset-4 border-2 border-primary/30 rounded-sm" />
              <div className="absolute -inset-6 border border-primary/20 rounded-sm" />
              
              {/* Image */}
              <div className="relative w-64 h-80 overflow-hidden rounded-sm">
                <img 
                  src={groom.image}
                  alt={groom.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Corner Ornaments */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-primary" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-primary" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-primary" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-primary" />
            </div>

            <h3 className="font-display text-2xl md:text-3xl text-primary mb-3">
              {groom.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-2">{groom.fullTitle}</p>
            <p className="text-secondary font-medium mb-1">
              {groom.father} & {groom.mother}
            </p>
            <p className="text-muted-foreground text-sm mb-4">{groom.city}</p>
            
            <a 
              href={`https://instagram.com/${groom.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span className="text-sm">{groom.instagram}</span>
            </a>
          </div>

          {/* Bride */}
          <div 
            className={`text-center transition-all duration-1000 delay-400 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative inline-block mb-8">
              {/* Frame Ornament */}
              <div className="absolute -inset-4 border-2 border-primary/30 rounded-sm" />
              <div className="absolute -inset-6 border border-primary/20 rounded-sm" />
              
              {/* Image */}
              <div className="relative w-64 h-80 overflow-hidden rounded-sm">
                <img 
                  src={bride.image}
                  alt={bride.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Corner Ornaments */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-primary" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-primary" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-primary" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-primary" />
            </div>

            <h3 className="font-display text-2xl md:text-3xl text-primary mb-3">
              {bride.name}
            </h3>
            <p className="text-muted-foreground text-sm mb-2">{bride.fullTitle}</p>
            <p className="text-secondary font-medium mb-1">
              {bride.father} & {bride.mother}
            </p>
            <p className="text-muted-foreground text-sm mb-4">{bride.city}</p>
            
            <a 
              href={`https://instagram.com/${bride.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span className="text-sm">{bride.instagram}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoupleSection;
