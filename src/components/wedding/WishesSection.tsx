import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { Send, Loader2, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const WishesSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;

    setIsSubmitting(true);

    try {
      // Save to localStorage
      const wishData = {
        id: `wish_web_${Date.now()}`,
        message: formData.message,
        created_at: new Date().toISOString()
      };

      const existingWishes = JSON.parse(localStorage.getItem('wedding_wishes_list') || '[]');
      existingWishes.unshift(wishData);
      localStorage.setItem('wedding_wishes_list', JSON.stringify(existingWishes));

      setFormData({ message: '' });
      setIsSubmitting(false);

      toast({
        title: 'Ucapan Terkirim!',
        description: 'Terima kasih atas doa dan ucapan Anda. Kami sangat menghargainya.',
      });
    } catch (error: any) {
      console.error('Error submitting wish:', error);
      setIsSubmitting(false);
      toast({
        title: 'Error',
        description: error.message || 'Gagal mengirim ucapan',
        variant: 'destructive'
      });
    }
  };

  return (
    <section 
      ref={ref}
      className="relative bg-background py-24 px-6"
    >
      <div className="absolute inset-0 batik-pattern" />

      <div className="relative z-10 max-w-2xl mx-auto">
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

        {/* Form Only */}
        <div 
          className={`transition-all duration-1000 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-card border border-primary/10 rounded-sm p-8 shadow-card max-w-2xl mx-auto">
            <h3 className="font-display text-xl text-secondary mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              Kirim Ucapan & Doa Anda
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none text-base"
                  placeholder="Tulis ucapan, doa, dan harapan terbaik Anda untuk pasangan pengantin..."
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {formData.message.length} / 500 karakter
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.message.trim()}
                className="w-full py-3 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Kirim Ucapan
                  </>
                )}
              </button>

              <p className="text-xs text-center text-muted-foreground pt-2">
                Ucapan Anda akan disimpan dan mempercantik momen spesial kami ✨
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishesSection;
