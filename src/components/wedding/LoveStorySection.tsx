import { useInView } from '@/hooks/useInView';
import { Heart } from 'lucide-react';

const LoveStorySection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const milestones = [
    {
      date: 'Mei 2020',
      title: 'Pertama Bertemu',
      description: 'Dipertemukan dalam acara seminar budaya di Keraton Yogyakarta. Pandangan pertama yang tak terlupakan.',
    },
    {
      date: 'September 2020',
      title: 'Mulai Menjalin Hubungan',
      description: 'Setelah beberapa bulan saling mengenal, kami memutuskan untuk memulai perjalanan cinta bersama.',
    },
    {
      date: 'Desember 2023',
      title: 'Lamaran',
      description: 'Di tengah keindahan Candi Prambanan saat sunset, ia berlutut dan mengucapkan kata-kata yang mengubah segalanya.',
    },
    {
      date: 'Juni 2025',
      title: 'Menuju Pernikahan',
      description: 'Dengan restu keluarga dan doa, kami siap memulai babak baru kehidupan sebagai pasangan.',
    },
  ];

  return (
    <section 
      ref={ref}
      className="relative bg-card py-24 px-6"
    >
      <div className="absolute inset-0 batik-pattern" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section Title */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-display text-3xl md:text-4xl text-secondary mb-4">
            Kisah Cinta Kami
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary to-primary/20 hidden md:block" />

          {milestones.map((milestone, index) => (
            <div 
              key={index}
              className={`relative mb-12 last:mb-0 transition-all duration-1000 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Mobile Layout */}
              <div className="md:hidden">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-3 h-3 mt-2 rounded-full bg-primary" />
                  <div>
                    <span className="text-primary font-medium text-sm">{milestone.date}</span>
                    <h3 className="font-display text-xl text-secondary mt-1 mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className={`hidden md:flex items-center gap-8 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}>
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <span className="text-primary font-medium text-sm">{milestone.date}</span>
                  <h3 className="font-display text-xl md:text-2xl text-secondary mt-1 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-sm ml-auto">
                    {milestone.description}
                  </p>
                </div>

                {/* Center Icon */}
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" fill="currentColor" />
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveStorySection;
