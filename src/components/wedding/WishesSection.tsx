import { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import { Send, Loader2, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Wish {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
}

const WishesSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [currentPage, setCurrentPage] = useState(0);
  const wishesPerPage = 4;

  const [wishes, setWishes] = useState<Wish[]>([
    { id: 1, name: 'Budi Santoso', message: 'Selamat menempuh hidup baru! Semoga menjadi keluarga sakinah mawaddah warahmah. Barakallahu lakuma wa baraka alaikuma.', timestamp: new Date('2025-06-15') },
    { id: 2, name: 'Siti Nurhaliza', message: 'Bahagia selalu untuk Arya & Dewi! Semoga pernikahan kalian menjadi awal dari kebahagiaan yang tiada henti.', timestamp: new Date('2025-06-14') },
    { id: 3, name: 'Ahmad Fauzi', message: 'Turut berbahagia atas pernikahan kalian. Semoga Allah senantiasa memberikan keberkahan dalam rumah tangga.', timestamp: new Date('2025-06-13') },
    { id: 4, name: 'Ratna Sari', message: 'Congratulations! Wishing you both a lifetime of love and happiness together.', timestamp: new Date('2025-06-12') },
    { id: 5, name: 'Dian Pratama', message: 'Selamat ya! Semoga menjadi pasangan yang saling melengkapi dan selalu dalam lindungan Allah SWT.', timestamp: new Date('2025-06-11') },
  ]);

  const totalPages = Math.ceil(wishes.length / wishesPerPage);
  const displayedWishes = wishes.slice(currentPage * wishesPerPage, (currentPage + 1) * wishesPerPage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newWish: Wish = {
      id: Date.now(),
      name: formData.name,
      message: formData.message,
      timestamp: new Date(),
    };

    setWishes([newWish, ...wishes]);
    setFormData({ name: '', message: '' });
    setIsSubmitting(false);
    setCurrentPage(0);

    toast({
      title: 'Ucapan Terkirim!',
      description: 'Terima kasih atas doa dan ucapan Anda.',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <section 
      ref={ref}
      className="relative bg-background py-24 px-6"
    >
      <div className="absolute inset-0 batik-pattern" />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Title */}
        <div 
          className={`text-center mb-12 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-display text-3xl md:text-4xl text-secondary mb-4">
            Ucapan & Doa
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div 
            className={`transition-all duration-1000 delay-200 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="bg-card border border-primary/10 rounded-sm p-6 shadow-card">
              <h3 className="font-display text-xl text-secondary mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Kirim Ucapan
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="Nama Anda"
                  />
                </div>

                <div>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                    placeholder="Tulis ucapan dan doa Anda..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Kirim Ucapan
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Wishes List */}
          <div 
            className={`transition-all duration-1000 delay-400 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="space-y-4">
              {displayedWishes.map((wish, index) => (
                <div
                  key={wish.id}
                  className="bg-card border border-primary/10 rounded-sm p-4 shadow-card"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-secondary">{wish.name}</h4>
                    <span className="text-xs text-muted-foreground">{formatDate(wish.timestamp)}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{wish.message}</p>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="p-2 border border-border rounded-sm hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm text-muted-foreground">
                  {currentPage + 1} / {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="p-2 border border-border rounded-sm hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishesSection;
