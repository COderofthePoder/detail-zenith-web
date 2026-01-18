import { Sparkles, Shield, Clock, Award, Droplets, Car, Wrench, Palette, Truck } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import ReviewCard from '@/components/ReviewCard';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-background.jpg';

const Index = () => {
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

  const reviews = [
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
            {reviews.map((review, index) => (
              <div key={review.name} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
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
