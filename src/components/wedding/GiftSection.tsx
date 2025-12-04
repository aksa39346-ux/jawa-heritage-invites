import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { Copy, Check, CreditCard, QrCode } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const GiftSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const bankAccounts = [
    {
      bank: 'Bank Central Asia (BCA)',
      accountNumber: '1234567890',
      accountName: 'Arya Wijaya Kusuma',
    },
    {
      bank: 'Bank Mandiri',
      accountNumber: '0987654321',
      accountName: 'Dewi Ayu Paramitha',
    },
  ];

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast({
      title: 'Berhasil disalin!',
      description: 'Nomor rekening telah disalin ke clipboard.',
    });
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section 
      ref={ref}
      className="relative bg-card py-24 px-6"
    >
      <div className="absolute inset-0 batik-pattern" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section Title */}
        <div 
          className={`text-center mb-12 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-display text-3xl md:text-4xl text-secondary mb-4">
            Hadiah Pernikahan
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Doa restu Anda adalah hadiah terindah. Namun jika ingin memberikan hadiah, kami menyediakan informasi berikut.
          </p>
        </div>

        {/* Gift Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {bankAccounts.map((account, index) => (
            <div
              key={index}
              className={`bg-background border-2 border-primary/20 rounded-sm p-6 transition-all duration-1000 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Bank Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-secondary">{account.bank}</p>
                  <p className="text-sm text-muted-foreground">{account.accountName}</p>
                </div>
              </div>

              {/* Account Number */}
              <div className="bg-card border border-border rounded-sm p-4 flex items-center justify-between">
                <span className="font-mono text-lg text-secondary tracking-wider">
                  {account.accountNumber}
                </span>
                <button
                  onClick={() => copyToClipboard(account.accountNumber, index)}
                  className="p-2 hover:bg-primary/10 rounded-sm transition-colors"
                >
                  {copiedIndex === index ? (
                    <Check className="w-5 h-5 text-primary" />
                  ) : (
                    <Copy className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* QRIS */}
        <div 
          className={`mt-8 bg-background border-2 border-primary/20 rounded-sm p-8 text-center transition-all duration-1000 delay-300 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <QrCode className="w-6 h-6 text-primary" />
            <h3 className="font-display text-xl text-secondary">QRIS</h3>
          </div>
          
          {/* Placeholder QR Code */}
          <div className="w-48 h-48 mx-auto bg-card border border-border rounded-sm flex items-center justify-center">
            <div className="text-center">
              <QrCode className="w-16 h-16 text-primary/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">QR Code QRIS</p>
            </div>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Scan untuk melakukan pembayaran via QRIS
          </p>
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
