import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { X } from 'lucide-react';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import gallery6 from '@/assets/gallery-6.jpg';

const GallerySection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: gallery1, alt: 'Prewedding 1', span: 'col-span-1 row-span-1' },
    { src: gallery2, alt: 'Prewedding 2', span: 'col-span-1 row-span-2' },
    { src: gallery3, alt: 'Prewedding 3', span: 'col-span-1 row-span-1' },
    { src: gallery4, alt: 'Prewedding 4', span: 'col-span-1 row-span-1' },
    { src: gallery5, alt: 'Prewedding 5', span: 'col-span-1 row-span-2' },
    { src: gallery6, alt: 'Prewedding 6', span: 'col-span-2 row-span-1 md:col-span-1' },
  ];

  return (
    <section 
      ref={ref}
      className="relative bg-background py-24 px-6"
    >
      <div className="absolute inset-0 batik-pattern" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-display text-3xl md:text-4xl text-secondary mb-4">
            Galeri Kami
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${image.span} relative overflow-hidden rounded-sm cursor-pointer group transition-all duration-1000 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover min-h-[200px] md:min-h-[250px] transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-jawa-black/0 group-hover:bg-jawa-black/30 transition-all duration-300" />
              
              {/* Border Decoration */}
              <div className="absolute inset-2 border border-jawa-gold/0 group-hover:border-jawa-gold/50 transition-all duration-300 rounded-sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-jawa-black/95 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-6 right-6 text-jawa-cream hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] object-contain rounded-sm animate-scale-in"
          />
        </div>
      )}
    </section>
  );
};

export default GallerySection;
