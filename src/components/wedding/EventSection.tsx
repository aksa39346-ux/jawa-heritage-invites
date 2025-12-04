import { useInView } from '@/hooks/useInView';
import { MapPin, Calendar, Clock, ExternalLink } from 'lucide-react';

const EventSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  const akad = {
    title: 'Akad Nikah',
    day: 'Sabtu',
    date: '21 Juni 2025',
    time: '08:00 - 10:00 WIB',
    venue: 'Pendopo Agung Taman Sari',
    address: 'Jl. Taman Sari No. 1, Yogyakarta',
    mapLink: 'https://maps.google.com',
  };

  const resepsi = {
    title: 'Resepsi Pernikahan',
    day: 'Sabtu',
    date: '21 Juni 2025',
    time: '11:00 - 14:00 WIB',
    venue: 'Ballroom Kraton Heritage',
    address: 'Jl. Malioboro No. 88, Yogyakarta',
    mapLink: 'https://maps.google.com',
  };

  const addToCalendar = (event: typeof akad) => {
    const startDate = new Date('2025-06-21T08:00:00');
    const endDate = new Date('2025-06-21T10:00:00');
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title + ' - Arya & Dewi')}&dates=${startDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}/${endDate.toISOString().replace(/-|:|\.\d\d\d/g, '')}&location=${encodeURIComponent(event.venue + ', ' + event.address)}&details=${encodeURIComponent('Undangan Pernikahan Arya & Dewi')}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const EventCard = ({ event, delay }: { event: typeof akad; delay: string }) => (
    <div 
      className={`group relative bg-card border border-primary/20 rounded-sm p-8 shadow-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 ${delay} ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Corner Decorations */}
      <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-primary/40 rounded-tl-sm" />
      <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-primary/40 rounded-tr-sm" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-primary/40 rounded-bl-sm" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-primary/40 rounded-br-sm" />

      {/* Title */}
      <h3 className="font-display text-2xl md:text-3xl text-primary text-center mb-6">
        {event.title}
      </h3>

      {/* Divider */}
      <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6" />

      {/* Details */}
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <Calendar className="w-5 h-5 text-primary" />
          <span className="text-secondary font-medium">{event.day}, {event.date}</span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Clock className="w-5 h-5 text-primary" />
          <span className="text-muted-foreground">{event.time}</span>
        </div>

        <div className="pt-2">
          <div className="flex items-start justify-center gap-3">
            <MapPin className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-secondary font-medium">{event.venue}</p>
              <p className="text-muted-foreground text-sm">{event.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={event.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 text-secondary rounded-sm text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <MapPin className="w-4 h-4" />
          Buka Maps
        </a>
        <button
          onClick={() => addToCalendar(event)}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-sm text-sm hover:bg-secondary/90 transition-all duration-300"
        >
          <ExternalLink className="w-4 h-4" />
          Simpan Kalender
        </button>
      </div>
    </div>
  );

  return (
    <section 
      ref={ref}
      className="relative bg-background py-24 px-6"
    >
      <div className="absolute inset-0 batik-pattern" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Title */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-display text-3xl md:text-4xl text-secondary mb-4">
            Waktu & Tempat
          </h2>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto" />
        </div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          <EventCard event={akad} delay="delay-200" />
          <EventCard event={resepsi} delay="delay-400" />
        </div>
      </div>
    </section>
  );
};

export default EventSection;
