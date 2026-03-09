import { useState, useEffect } from 'react';
import { Sparkles, Shield, Clock, Award, Droplets, Car, Wrench, Palette, Truck } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import ReviewCard from '@/components/ReviewCard';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import heroImage from '@/assets/hero-background.jpg';

interface MemberReviewWithName {
  id: string;
  rating: number;
  text: string;
  created_at: string;
  first_name: string;
  last_name: string;
}

const Index = () => {
  const [memberReviews, setMemberReviews] = useState<MemberReviewWithName[]>([]);

  useEffect(() => {
    const fetchMemberReviews = async () => {
      const { data } = await supabase
        .from('member_reviews')
        .select('id, rating, text, created_at, members(first_name, last_name)')
        .order('created_at', { ascending: false })
        .limit(10);

      if (data) {
        setMemberReviews(
          data.map((r: any) => ({
            id: r.id,
            rating: r.rating,
            text: r.text,
            created_at: r.created_at,
            first_name: r.members?.first_name ?? '',
            last_name: r.members?.last_name ?? '',
          }))
        );
      }
    };
    fetchMemberReviews();
  }, []);

  const services = [
    {
      icon: Droplets,
      title: 'Aussenreinigung',
      description: 'Professionelle Handwäsche mit hochwertigen Produkten für streifenfreien Glanz und perfekten Lackschutz.',
    },
    {
      icon: Car,
      title: 'Innenreinigung',
      description: 'Gründliche Aufbereitung von Polstern, Leder und allen Innenraumflächen für ein frisches Fahrgefühl.',
    },
    {
      icon: Sparkles,
      title: 'Politur & Lackkorrektur',
      description: 'Entfernung von Kratzern und Hologrammen für eine spiegelglatte, makellose Lackoberfläche.',
    },
    {
      icon: Shield,
      title: 'Keramikversiegelung',
      description: 'Langanhaltender Schutz für Lack, Felgen und Glas – extremer Glanz und einfache Pflege.',
    },
    {
      icon: Wrench,
      title: 'Felgenreinigung',
      description: 'Intensive Reinigung und Pflege Ihrer Felgen für dauerhaften Schutz und brillanten Glanz.',
    },
    {
      icon: Palette,
      title: 'Fahrzeugaufbereitung',
      description: 'Komplette Aufbereitung für den Verkauf oder einfach für maximalen Werterhalt Ihres Fahrzeugs.',
    },
  ];

  const staticReviews = [
    {
      name: 'Arben K.',
      rating: 5,
      text: 'Absolut professionelle Arbeit! Mein Auto sieht aus wie neu. Die Keramikversiegelung ist jeden Franken wert. Sehr zu empfehlen!',
      date: 'vor 2 Wochen',
    },
    {
      name: 'Sandra M.',
      rating: 5,
      text: 'Hervorragende Innenreinigung und super freundlicher Service. Das Team arbeitet mit viel Liebe zum Detail. Komme definitiv wieder!',
      date: 'vor 1 Monat',
    },
    {
      name: 'Driton S.',
      rating: 5,
      text: 'Beste Autoaufbereitung in der Region! Pünktlich, professionell und das Ergebnis übertrifft alle Erwartungen. Top!',
      date: 'vor 3 Wochen',
    },
  ];

  const formatRelativeDate = (dateStr: string) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays < 1) return 'heute';
    if (diffDays < 7) return `vor ${diffDays} Tagen`;
    if (diffDays < 30) return `vor ${Math.floor(diffDays / 7)} Wochen`;
    if (diffDays < 365) return `vor ${Math.floor(diffDays / 30)} Monaten`;
    return `vor ${Math.floor(diffDays / 365)} Jahren`;
  };

  // Combine: member reviews first, then static
  const allReviews = [
    ...memberReviews.map(r => ({
      name: `${r.first_name} ${r.last_name.charAt(0)}.`,
      rating: r.rating,
      text: r.text,
      date: formatRelativeDate(r.created_at),
      isVerifiedMember: true,
    })),
    ...staticReviews.map(r => ({ ...r, isVerifiedMember: false })),
  ];

  return (
    <div className="min-h-screen">
      {/* Fixed Background Image with Dark Overlay */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <img 
          src={heroImage} 
          alt="Luxus Auto Detailing Background" 
          className="w-full h-full object-cover" 
          style={{
            objectPosition: 'center 70%'
          }} 
          loading="eager"
          fetchPriority="high"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10">
        <Navigation />
        <StickyCTA />
      
        {/* Hero Section */}
        <Hero />

      {/* Services Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="mb-4 text-white drop-shadow-2xl">Unsere Leistungen</h2>
            <p className="text-lg text-white/90 drop-shadow-lg">
              Von der professionellen Handwäsche bis zur Keramikversiegelung – 
              wir bieten das komplette Spektrum für perfekte Fahrzeugpflege
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <div key={service.title} className="animate-fade-up" style={{ animationDelay: `${index * 60}ms` }}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50">
              <Link to="/leistungen">Alle Leistungen ansehen</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-white drop-shadow-2xl">Warum DS-Detailing?</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow-lg">
              Zwei Auto-Enthusiasten mit einer Mission: Perfektion in jedem Detail
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Award,
                title: 'Hochwertige Produkte',
                description: 'Wir verwenden nur hochwertigste Pflegeprodukte für optimale Ergebnisse',
              },
              {
                icon: Clock,
                title: 'Moderne Technik',
                description: 'Neueste Technologie und Verfahren für professionelle Fahrzeugaufbereitung',
              },
              {
                icon: Sparkles,
                title: 'Höchste Präzision',
                description: 'Liebe zum Detail und Perfektion bei jedem Arbeitsschritt',
              },
              {
                icon: Truck,
                title: 'Bring- und Holservice',
                description: 'Bequemer Abhol- und Bringservice für alle Leistungen – wir kümmern uns um alles',
              },
            ].map((item, index) => (
              <div key={item.title} className="text-center animate-fade-up" style={{ animationDelay: `${index * 80}ms` }}>
                <div className="bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl p-8 hover:bg-background/90 transition-all duration-300">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-white drop-shadow-2xl">Das sagen unsere Kunden</h2>
            <p className="text-lg text-white/90 drop-shadow-lg">
              Zufriedene Kunden sind unser bester Beweis für Qualität
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {allReviews.slice(0, 6).map((review, index) => (
              <div key={review.name + index} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                <ReviewCard {...review} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-background/80 backdrop-blur-md border border-border/50 rounded-3xl p-12">
            <h2 className="mb-6">Bereit für die perfekte Pflege?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Reservieren Sie jetzt einen Termin und erleben Sie, wie Ihr Fahrzeug in neuem Glanz erstrahlt
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
                <Link to="/termin">Termin reservieren</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20 hover:border-white/50">
                <Link to="/galerie">Galerie ansehen</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
};

export default Index;
