import { useState, useEffect } from 'react';
import { CheckCircle, MessageCircle, Gift, Phone, MapPin, Trash2, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface RSVPSubmission {
  id: string;
  name: string;
  phone: string;
  attendance: string;
  guests: string;
  message?: string;
  created_at: string;
}

interface WishSubmission {
  id: string;
  message: string;
  created_at: string;
}

const Guest = () => {
  const [activeSection, setActiveSection] = useState<'rsvp' | 'wishes' | 'gifts'>('rsvp');
  const [rsvpForm, setRsvpForm] = useState({ name: '', phone: '', attendance: '', guests: '1' });
  const [wishesForm, setWishesForm] = useState({ message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [rsvpList, setRsvpList] = useState<RSVPSubmission[]>([]);
  const [wishsList, setWishsList] = useState<WishSubmission[]>([]);
  const [hasSupabase, setHasSupabase] = useState(true);

  // Load data from localStorage
  useEffect(() => {
    try {
      const savedRSVP = localStorage.getItem('wedding_rsvp_list');
      const savedWishes = localStorage.getItem('wedding_wishes_list');
      
      if (savedRSVP) setRsvpList(JSON.parse(savedRSVP));
      if (savedWishes) setWishsList(JSON.parse(savedWishes));
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
      setIsLoading(false);
    }
  }, []);

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rsvpForm.name.trim() || !rsvpForm.attendance) {
      toast({ title: 'Error', description: 'Please fill in required fields', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const newRsvp: RSVPSubmission = {
        id: `rsvp_guest_${Date.now()}`,
        name: rsvpForm.name,
        phone: rsvpForm.phone,
        attendance: rsvpForm.attendance,
        guests: rsvpForm.guests,
        created_at: new Date().toISOString()
      };

      const updated = [newRsvp, ...rsvpList];
      setRsvpList(updated);
      localStorage.setItem('wedding_rsvp_list', JSON.stringify(updated));
      
      toast({ 
        title: 'Success!',
        description: 'RSVP submitted successfully!'
      });
      setRsvpForm({ name: '', phone: '', attendance: '', guests: '1' });
    } catch (error: any) {
      console.error('Error submitting RSVP:', error);
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to submit RSVP', 
        variant: 'destructive' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWishesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!wishesForm.message.trim()) {
      toast({ title: 'Error', description: 'Please enter your message', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    try {
      const newWish: WishSubmission = {
        id: `wish_guest_${Date.now()}`,
        message: wishesForm.message,
        created_at: new Date().toISOString()
      };

      const updated = [newWish, ...wishsList];
      setWishsList(updated);
      localStorage.setItem('wedding_wishes_list', JSON.stringify(updated));
      
      toast({ 
        title: 'Success!',
        description: 'Wishes submitted successfully!'
      });
      setWishesForm({ message: '' });
    } catch (error: any) {
      console.error('Error submitting wish:', error);
      toast({ 
        title: 'Error', 
        description: error.message || 'Failed to submit wish', 
        variant: 'destructive' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteRSVP = async (id: string) => {
    try {
      const updated = rsvpList.filter(item => item.id !== id);
      setRsvpList(updated);
      localStorage.setItem('wedding_rsvp_list', JSON.stringify(updated));
      toast({ title: 'Deleted', description: 'RSVP removed' });
    } catch (error: any) {
      console.error('Error deleting RSVP:', error);
      toast({ title: 'Error', description: 'Failed to delete RSVP', variant: 'destructive' });
    }
  };

  const deleteWish = async (id: string) => {
    try {
      const updated = wishsList.filter(item => item.id !== id);
      setWishsList(updated);
      localStorage.setItem('wedding_wishes_list', JSON.stringify(updated));
      toast({ title: 'Deleted', description: 'Wish removed' });
    } catch (error: any) {
      console.error('Error deleting wish:', error);
      toast({ title: 'Error', description: 'Failed to delete wish', variant: 'destructive' });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAttendanceLabel = (value: string) => {
    const labels: { [key: string]: string } = {
      'yes': '✓ Will Attend',
      'no': '✗ Cannot Attend',
      'maybe': '? Maybe'
    };
    return labels[value] || value;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Guest Portal</h1>
          <p className="text-gray-600">Share your wishes and confirm your attendance</p>
        </div>

        {/* Configuration Warning */}

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setActiveSection('rsvp')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              activeSection === 'rsvp'
                ? 'bg-rose-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-rose-300'
            }`}
          >
            <CheckCircle size={20} />
            RSVP
          </button>
          <button
            onClick={() => setActiveSection('wishes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              activeSection === 'wishes'
                ? 'bg-rose-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-rose-300'
            }`}
          >
            <MessageCircle size={20} />
            Wishes
          </button>
          <button
            onClick={() => setActiveSection('gifts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              activeSection === 'gifts'
                ? 'bg-rose-600 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-rose-300'
            }`}
          >
            <Gift size={20} />
            Gift Info
          </button>
        </div>

        {/* Content Sections */}
        {activeSection === 'rsvp' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* RSVP Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Your Attendance</h2>
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={rsvpForm.name}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={rsvpForm.phone}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Will You Attend? *</label>
                  <select
                    value={rsvpForm.attendance}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, attendance: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                    disabled={isSubmitting}
                  >
                    <option value="">Select an option</option>
                    <option value="yes">Yes, I will attend</option>
                    <option value="no">No, I cannot attend</option>
                    <option value="maybe">Maybe</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                  <select
                    value={rsvpForm.guests}
                    onChange={(e) => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                    disabled={isSubmitting}
                  >
                    {[1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n.toString()}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-700 disabled:bg-gray-400 transition"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                </button>
              </form>
            </div>

            {/* RSVP List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Confirmations ({rsvpList.length})</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {rsvpList.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No confirmations yet</p>
                ) : (
                  rsvpList.map(rsvp => (
                    <div key={rsvp.id} className="p-3 bg-rose-50 rounded border border-rose-200">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-800">{rsvp.name}</h4>
                          <p className="text-sm text-gray-600">{getAttendanceLabel(rsvp.attendance)} • {rsvp.guests} {rsvp.guests === '1' ? 'guest' : 'guests'}</p>
                        </div>
                        <button
                          onClick={() => deleteRSVP(rsvp.id)}
                          className="text-rose-600 hover:text-rose-800 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">{formatDate(rsvp.created_at)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'wishes' && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Wishes Form */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Send Your Wishes</h2>
              <form onSubmit={handleWishesSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Message *</label>
                  <textarea
                    value={wishesForm.message}
                    onChange={(e) => setWishesForm({ message: e.target.value.slice(0, 500) })}
                    maxLength={500}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 resize-none"
                    disabled={isSubmitting}
                    placeholder="Share your wishes and prayers..."
                  />
                  <p className="text-xs text-gray-500 mt-1">{wishesForm.message.length}/500 characters</p>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-700 disabled:bg-gray-400 transition"
                >
                  {isSubmitting ? 'Sending...' : 'Send Wishes'}
                </button>
              </form>
            </div>

            {/* Wishes List */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">All Wishes ({wishsList.length})</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {wishsList.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No wishes yet. Be the first!</p>
                ) : (
                  wishsList.map(wish => (
                    <div key={wish.id} className="p-3 bg-rose-50 rounded border border-rose-200">
                      <div className="flex justify-between items-start gap-2">
                        <p className="text-gray-700 text-sm flex-1">{wish.message}</p>
                        <button
                          onClick={() => deleteWish(wish.id)}
                          className="text-rose-600 hover:text-rose-800 transition flex-shrink-0"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{formatDate(wish.created_at)}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'gifts' && (
          <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Gift Information</h2>
            
            <div className="space-y-6">
              {/* Bank Transfer */}
              <div className="p-4 border-l-4 border-rose-600 bg-rose-50">
                <h3 className="font-semibold text-gray-800 mb-2">Bank Transfer</h3>
                <div className="space-y-1 text-gray-700">
                  <p><span className="font-medium">Bank:</span> BCA / Mandiri / BNI</p>
                  <p><span className="font-medium">Account Name:</span> [Couple Name]</p>
                  <p><span className="font-medium">Account Number:</span> XXXXX-XXXXX</p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone size={18} className="text-rose-600" />
                    <span>+62 XXX-XXXX-XXXX</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MessageCircle size={18} className="text-rose-600" />
                    <span>WhatsApp: +62 XXX-XXXX-XXXX</span>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <MapPin size={18} className="text-rose-600" />
                  Gift Delivery Address
                </h3>
                <p className="text-gray-700">
                  [Full Address Here]<br />
                  [City, Province, Postal Code]
                </p>
              </div>

              <p className="text-sm text-gray-600 italic text-center">
                Thank you for your generous gift! Your support means the world to us. 🙏
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guest;
