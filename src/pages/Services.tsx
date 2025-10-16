import { 
  Droplets, Car, Sparkles, Shield, Wrench, Wind, 
  Brush, Palette, ClipboardCheck, Gauge 
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: Droplets,
      title: 'Aussenreinigung & Handwäsche',
      description: 'Professionelle Fahrzeugwäsche mit pH-neutralen Premium-Shampoos. Schonende Reinigung ohne Kratzer, streifenfreier Glanz und optimaler Schutz für Ihren Lack. Inklusive Felgen-, Glas- und Türfalzreinigung.',
      features: ['pH-neutrale Premium-Produkte', 'Kratzfreie Two-Bucket-Methode', 'Felgen & Türfalzen', 'Streifenfreie Trocknung'],
    },
    {
      icon: Car,
      title: 'Innenreinigung & Aufbereitung',
      description: 'Gründliche Reinigung und Auffrischung des gesamten Innenraums. Von Polstern über Armaturenbrett bis zu den kleinsten Ritzen – wir sorgen für ein hygienisches, frisches Fahrgefühl.',
      features: ['Tiefenreinigung aller Flächen', 'Polster & Teppichpflege', 'Geruchsneutralisation', 'Kunststoffpflege'],
    },
    {
      icon: Sparkles,
      title: 'Politur & Lackkorrektur',
      description: 'Professionelle Beseitigung von Kratzern, Hologrammen und Lackdefekten. Mehrstufige Politur für spiegelglatten Glanz und perfekte Vorbereitung für Versiegelungen.',
      features: ['Mehrstufige Politur', 'Kratzerentfernung', 'Hologrammbeseitigung', 'Spiegelglanz-Finish'],
    },
    {
      icon: Shield,
      title: 'Keramikversiegelung',
      description: 'Langanhaltender Schutz für Lack, Felgen und Glas. Extreme Hydrophobie, einfachste Reinigung und intensiver Glanz für Jahre. Professionelle Applikation mit garantierter Haltbarkeit.',
      features: ['Lack-Versiegelung (bis 5 Jahre)', 'Felgen-Versiegelung', 'Glas-Versiegelung', 'Hydrophober Effekt'],
    },
    {
      icon: Wrench,
      title: 'Felgenreinigung & Pflege',
      description: 'Intensive Reinigung und Pflege Ihrer Felgen. Entfernung von Bremsstaub, Flugrost und hartnäckigen Verschmutzungen. Optional mit Keramikversiegelung für dauerhaften Schutz.',
      features: ['Bremsstaub-Entfernung', 'Flugrost-Behandlung', 'Felgen-Versiegelung (optional)', 'Glanzpolitur'],
    },
    {
      icon: Palette,
      title: 'Fahrzeugaufbereitung für Verkauf',
      description: 'Komplette Aufbereitung Ihres Fahrzeugs für den bestmöglichen Verkaufspreis. Innen und außen perfekt präsentiert – so überzeugen Sie potenzielle Käufer.',
      features: ['Komplette Innen- & Aussenreinigung', 'Politur & Auffrischung', 'Geruchsbeseitigung', 'Verkaufsoptimierung'],
    },
    {
      icon: Wind,
      title: 'Window Tinting (Scheibentönung)',
      description: 'Professionelle Scheibentönung nach Schweizer Vorschriften. Optimaler UV-Schutz, erhöhte Privatsphäre und eleganter Look. Blasenfreie Applikation mit Garantie.',
      features: ['CH-konforme Tönung', 'UV-Schutz 99%', 'Blasenfreie Montage', 'Mehrjährige Garantie'],
    },
    {
      icon: Brush,
      title: 'Leder/Alcantara/Polster-Aufbereitung',
      description: 'Spezialbehandlung für Leder, Alcantara und Stoffpolster. Reinigung, Pflege und Imprägnierung für langanhaltenden Schutz und gepflegtes Aussehen.',
      features: ['Lederreinigung & -pflege', 'Alcantara-Behandlung', 'Fleckenentfernung', 'Imprägnierung'],
    },
    {
      icon: Gauge,
      title: 'Lenkradaufbereitung',
      description: 'Spezielle Behandlung für abgenutzte Lenkräder. Reinigung, Auffrischung und Schutz für Leder-, Alcantara- und Kunstleder-Lenkräder.',
      features: ['Leder-Auffrischung', 'Alcantara-Reinigung', 'Farbauffrischung', 'Schutzversiegelung'],
    },
    {
      icon: ClipboardCheck,
      title: 'MFK-Vorbereitung & Wäsche',
      description: 'Perfekte Vorbereitung für die MFK-Prüfung. Inklusive gründlicher Motorwäsche, Unterbodenwäsche und Komplettaufbereitung – so bestehen Sie die Prüfung problemlos.',
      features: ['Motorwäsche', 'Unterbodenwäsche', 'Komplette Fahrzeugwäsche', 'MFK-optimierte Aufbereitung'],
    },
  ];

  return (
    <>
      <Navigation />
      <StickyCTA />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="mb-6">
              Unsere <span className="text-gradient">Leistungen</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Professionelle Fahrzeugpflege auf höchstem Niveau – von der Basis-Reinigung bis zur Premium-Versiegelung
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div
                key={service.title}
                className="card-shine border border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-6">Interesse an unseren Leistungen?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Kontaktieren Sie uns für ein unverbindliches Angebot oder buchen Sie direkt Ihren Wunschtermin
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
                <Link to="/kontakt">Jetzt Termin buchen</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-foreground/20 hover:bg-foreground/10">
                <a href="tel:+41765493697">+41 76 549 36 97</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Services;
