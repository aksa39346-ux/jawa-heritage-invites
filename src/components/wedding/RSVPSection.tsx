import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { User, Users, Phone, Check, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const RSVPSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    attendance: 'hadir',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to localStorage
      const rsvpData = {
        id: `rsvp_web_${Date.now()}`,
        name: formData.name,
        phone: formData.phone,
        attendance: formData.attendance,
        guests: formData.guests,
        message: formData.message,
        created_at: new Date().toISOString()
      };

      const existingRSVPs = JSON.parse(localStorage.getItem('wedding_rsvp_list') || '[]');
      existingRSVPs.unshift(rsvpData);
      localStorage.setItem('wedding_rsvp_list', JSON.stringify(existingRSVPs));

      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: 'RSVP Terkirim!',
        description: 'Terima kasih atas konfirmasi kehadiran Anda.',
      });
    } catch (error: any) {
      console.error('Error submitting RSVP:', error);
      setIsSubmitting(false);
      toast({
        title: 'Error',
        description: error.message || 'Gagal mengirim RSVP',
        variant: 'destructive'
      });
    }
  };

  return (
    <section 
      ref={ref}
      className="relative bg-secondary py-24 px-6"
    >
      <div className="absolute inset-0 batik-pattern opacity-10" />

      <div className="relative z-10 max-w-xl mx-auto">
        {/* Section Title */}
        <div 
          className={`text-center mb-12 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-display text-3xl md:text-4xl text-secondary-foreground mb-4">
            Konfirmasi Kehadiran
          </h2>
          <p className="text-secondary-foreground/70 max-w-md mx-auto">
            Mohon konfirmasi kehadiran Anda untuk membantu kami dalam mempersiapkan acara
          </p>
        </div>

        {/* Form */}
        <div 
          className={`bg-card rounded-sm p-8 shadow-elegant border border-primary/10 transition-all duration-1000 delay-200 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl text-secondary mb-2">Terima Kasih!</h3>
              <p className="text-muted-foreground">RSVP Anda telah kami terima.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Nama Lengkap *
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="Masukkan nama Anda"
                  />
                </div>
              </div>

              {/* Number of Guests */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Jumlah Tamu *
                </label>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <select
                    required
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors appearance-none"
                  >
                    <option value="1">1 Orang</option>
                    <option value="2">2 Orang</option>
                    <option value="3">3 Orang</option>
                    <option value="4">4 Orang</option>
                    <option value="5">5 Orang</option>
                  </select>
                </div>
              </div>

              {/* Attendance */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-3">
                  Konfirmasi Kehadiran *
                </label>
                <div className="flex gap-4">
                  {[
                    { value: 'hadir', label: 'Hadir' },
                    { value: 'tidak', label: 'Tidak Hadir' },
                    { value: 'mungkin', label: 'Mungkin' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex-1 text-center py-3 border rounded-sm cursor-pointer transition-all ${
                        formData.attendance === option.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value={option.value}
                        checked={formData.attendance === option.value}
                        onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                        className="sr-only"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Phone (Optional) */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  No. WhatsApp (Opsional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
              </div>

              {/* Message (Optional) */}
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Pesan Tambahan (Opsional)
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                  placeholder="Tulis pesan tambahan jika ada..."
                  maxLength={200}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.message.length} / 200 karakter
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-primary-foreground rounded-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  'Kirim Konfirmasi'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
