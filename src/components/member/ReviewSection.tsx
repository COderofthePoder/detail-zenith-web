import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star, MessageSquare, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import type { MemberBooking } from '@/hooks/useMember';

interface Review {
  id: string;
  booking_id: string;
  rating: number;
  text: string;
  created_at: string;
}

interface ReviewSectionProps {
  memberId: string;
  bookings: MemberBooking[];
  reviews: Review[];
  onReviewSubmitted: () => void;
}

const ReviewSection = ({ memberId, bookings, reviews, onReviewSubmitted }: ReviewSectionProps) => {
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const reviewedBookingIds = new Set(reviews.map(r => r.booking_id));
  const unreviewedBookings = bookings.filter(b => !reviewedBookingIds.has(b.id));

  const handleSubmit = async () => {
    if (!activeBookingId || !text.trim()) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from('member_reviews').insert({
        member_id: memberId,
        booking_id: activeBookingId,
        rating,
        text: text.trim(),
      });
      if (error) throw error;
      toast({ title: 'Bewertung abgegeben!', description: 'Vielen Dank für dein Feedback.' });
      setActiveBookingId(null);
      setText('');
      setRating(5);
      onReviewSubmitted();
    } catch {
      toast({ title: 'Fehler', description: 'Bewertung konnte nicht gespeichert werden.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <Card className="border-border/50 bg-card/80">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Bewertungen
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Existing reviews */}
        {reviews.length > 0 && (
          <div className="space-y-3 mb-4">
            {reviews.map((review) => {
              const booking = bookings.find(b => b.id === review.booking_id);
              return (
                <div key={review.id} className="p-4 rounded-xl bg-muted/20 border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">{booking?.service_description ?? 'Detailing'}</p>
                    <div className="flex items-center gap-1">
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Bewertet
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                  <p className="text-xs text-muted-foreground/60 mt-2">{formatDate(review.created_at)}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Unreviewed bookings */}
        {unreviewedBookings.length > 0 ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground font-medium">Noch nicht bewertet:</p>
            {unreviewedBookings.map((booking) => (
              <div key={booking.id}>
                {activeBookingId === booking.id ? (
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-4">
                    <p className="text-sm font-medium">{booking.service_description}</p>
                    {/* Star rating */}
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={`w-7 h-7 ${
                              star <= (hoverRating || rating)
                                ? 'fill-primary text-primary'
                                : 'text-muted-foreground/30'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <Textarea
                      placeholder="Wie war dein Erlebnis? Teile deine Erfahrung..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      rows={3}
                      className="bg-background/50"
                    />
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSubmit}
                        disabled={!text.trim() || submitting}
                        className="bg-primary hover:bg-primary/90"
                        size="sm"
                      >
                        {submitting ? 'Wird gesendet...' : 'Bewertung abgeben'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => { setActiveBookingId(null); setText(''); setRating(5); }}
                      >
                        Abbrechen
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border/30">
                    <div>
                      <p className="text-sm font-medium">{booking.service_description}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(booking.booked_at)}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="gap-1 border-primary/30 text-primary hover:bg-primary/10"
                      onClick={() => { setActiveBookingId(booking.id); setRating(5); setText(''); }}
                    >
                      <Star className="w-3.5 h-3.5" />
                      Bewerten
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nach deiner ersten Buchung kannst du hier eine Bewertung abgeben.
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default ReviewSection;
