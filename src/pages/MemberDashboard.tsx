import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMember } from '@/hooks/useMember';
import { LogOut, Star, Gift, Receipt, TrendingUp, Calendar, Sparkles, Crown } from 'lucide-react';
import LoadingScreen from '@/components/LoadingScreen';

const MemberDashboard = () => {
  const navigate = useNavigate();
  const { user, member, stampCard, bookings, loading, signOut, availableFreeWashes, totalSpent } = useMember();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/mitglieder/login');
    }
  }, [loading, user, navigate]);

  if (loading) return <LoadingScreen />;
  if (!member) return null;

  const stamps = stampCard?.stamps ?? 0;
  const stampSlots = Array.from({ length: 10 }, (_, i) => i < stamps);

  const formatPrice = (price: number) => `CHF ${price.toLocaleString('de-CH', { minimumFractionDigits: 0 })}`;
  const formatDate = (date: string) => new Date(date).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <>
      <Navigation />
      <section className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Hallo, <span className="text-primary">{member.first_name}</span>!
              </h1>
              <p className="text-muted-foreground mt-1">Willkommen in deinem Mitgliederbereich</p>
            </div>
            <Button variant="outline" onClick={signOut} className="gap-2">
              <LogOut className="w-4 h-4" />
              Abmelden
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-border/50 bg-card/80">
              <CardContent className="p-4 text-center">
                <Receipt className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{bookings.length}</p>
                <p className="text-xs text-muted-foreground">Buchungen</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/80">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{formatPrice(totalSpent)}</p>
                <p className="text-xs text-muted-foreground">Gesamtausgaben</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/80">
              <CardContent className="p-4 text-center">
                <Star className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{stamps}/10</p>
                <p className="text-xs text-muted-foreground">Stempel</p>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/80">
              <CardContent className="p-4 text-center">
                <Gift className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{availableFreeWashes}</p>
                <p className="text-xs text-muted-foreground">Gratis-Wäschen</p>
              </CardContent>
            </Card>
          </div>

          {/* Stamp Card */}
          <Card className="border-primary/30 bg-gradient-to-br from-card to-card/80 mb-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-primary" />
                Stempelkarte
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Sammle 10 Stempel und erhalte eine Gratis-Wäsche!
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-3 mb-4">
                {stampSlots.map((filled, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-all ${
                      filled
                        ? 'bg-primary/20 border-primary shadow-[0_0_10px_hsl(30_100%_50%/0.3)]'
                        : 'border-border/50 bg-muted/30'
                    }`}
                  >
                    {filled ? (
                      <Sparkles className="w-6 h-6 text-primary" />
                    ) : (
                      <span className="text-muted-foreground/40 text-sm font-bold">{i + 1}</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Noch <span className="text-primary font-semibold">{10 - stamps}</span> Stempel bis zur Gratis-Wäsche
                </p>
                {availableFreeWashes > 0 && (
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    <Gift className="w-3 h-3 mr-1" />
                    {availableFreeWashes}x einlösbar
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Member Benefits */}
          <Card className="border-border/50 bg-card/80 mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Deine Mitglieder-Vorteile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-center">
                  <Gift className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">Stempelkarte</h3>
                  <p className="text-xs text-muted-foreground mt-1">Jede 10. Wäsche gratis</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-center">
                  <Star className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">Exklusive Rabatte</h3>
                  <p className="text-xs text-muted-foreground mt-1">Spezialangebote nur für Mitglieder</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-center">
                  <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h3 className="font-semibold text-sm">Prioritäts-Termine</h3>
                  <p className="text-xs text-muted-foreground mt-1">Bevorzugte Terminvergabe</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Booking History */}
          <Card className="border-border/50 bg-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-primary" />
                Buchungsverlauf
              </CardTitle>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">Noch keine Buchungen vorhanden.</p>
                  <Button asChild className="mt-4 bg-primary hover:bg-primary/90">
                    <Link to="/termin">Ersten Termin buchen</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border/30"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{booking.service_description}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(booking.booked_at)}</p>
                      </div>
                      <div className="text-right">
                        {booking.was_free_wash ? (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Gratis</Badge>
                        ) : (
                          <p className="font-semibold text-primary">{formatPrice(booking.total_price)}</p>
                        )}
                        {booking.discount_applied > 0 && (
                          <p className="text-xs text-green-400">-{formatPrice(booking.discount_applied)} Rabatt</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default MemberDashboard;
