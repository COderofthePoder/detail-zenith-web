import { 
  Droplets, Car, Sparkles, Shield, Wrench, 
  Brush, Palette, ClipboardCheck, Gauge, ShieldAlert 
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import lamboBackground from '@/assets/Lambo_Fertig_Background.jpeg';

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const categories = [
    { id: 'all', label: 'Alle Leistungen' },
    { id: 'cleaning', label: 'Reinigung' },
    { id: 'paint', label: 'Lackpflege' },
    { id: 'interior', label: 'Innenraum' },
    { id: 'special', label: 'Spezial' },
  ];

  const services = [
    {
      icon: Droplets,
      title: 'Aussenreinigung & Handwäsche',
      description: 'Professionelle Fahrzeugwäsche mit pH-neutralen Shampoos. Schonende Reinigung ohne Kratzer, streifenfreier Glanz und optimaler Schutz für Ihren Lack. Inklusive Felgen-, Glas- und Türfalzreinigung.',
      detailedDescription: 'Unsere professionelle Handwäsche ist weit mehr als eine normale Autowäsche. Wir verwenden ausschließlich pH-neutrale Qualitäts-Shampoos, die Ihren Lack schonend reinigen ohne die Schutzschichten anzugreifen. Mit der bewährten Two-Bucket-Methode vermeiden wir Kratzer und Swirls. Jede Wäsche beinhaltet eine intensive Felgenreinigung, Glasreinigung und die oft vergessenen Türfalze. Das Ergebnis: Ein strahlender, streifenfreier Glanz und optimaler Schutz für Ihren Lack.',
      features: ['pH-neutrale Qualitätsprodukte', 'Kratzfreie Two-Bucket-Methode', 'Felgen & Türfalzen', 'Streifenfreie Trocknung'],
      category: 'cleaning',
    },
    {
      icon: ClipboardCheck,
      title: 'MFK-Vorbereitung & Wäsche',
      description: 'Perfekte Vorbereitung für die MFK-Prüfung. Inklusive gründlicher Motorwäsche, Unterbodenwäsche und Komplettaufbereitung – so bestehen Sie die Prüfung problemlos.',
      detailedDescription: 'Bereiten Sie Ihr Fahrzeug optimal auf die MFK-Prüfung vor. Unsere MFK-Vorbereitung umfasst eine professionelle Motorwäsche, gründliche Unterbodenwäsche und eine komplette Fahrzeugaufbereitung innen und außen. Wir reinigen alle prüfungsrelevanten Bereiche gründlich und sorgen dafür, dass Ihr Fahrzeug in bestem Zustand zur Prüfung erscheint. Mit unserer Vorbereitung maximieren Sie Ihre Chancen auf eine problemlose MFK-Abnahme.',
      features: ['Motorwäsche', 'Unterbodenwäsche', 'Komplette Fahrzeugwäsche', 'MFK-optimierte Aufbereitung'],
      category: 'cleaning',
    },
    {
      icon: Sparkles,
      title: 'Politur & Lackkorrektur',
      description: 'Professionelle Beseitigung von Kratzern, Hologrammen und Lackdefekten. Mehrstufige Politur für spiegelglatten Glanz und perfekte Vorbereitung für Versiegelungen.',
      detailedDescription: 'Unsere professionelle Lackkorrektur entfernt Kratzer, Hologramme, Swirls und andere Lackdefekte mit modernster Poliertechnik. Wir arbeiten in mehreren Stufen – von der groben Schnittbearbeitung bis zur Feinstpolitur – um eine perfekt spiegelglatte Oberfläche zu erzielen. Diese Behandlung ist ideal als Vorbereitung für eine Keramikversiegelung und bringt den ursprünglichen Glanz Ihres Lacks zurück. Jede Politur wird individuell auf Lackzustand und -härte abgestimmt.',
      features: ['Mehrstufige Politur', 'Kratzerentfernung', 'Hologrammbeseitigung', 'Spiegelglanz-Finish'],
      category: 'paint',
    },
    {
      icon: Shield,
      title: 'Keramikversiegelung',
      description: 'Langanhaltender Schutz für Lack, Felgen und Glas. Extreme Hydrophobie, einfachste Reinigung und intensiver Glanz für Jahre. Professionelle Applikation mit garantierter Haltbarkeit.',
      detailedDescription: 'Die Keramikversiegelung ist der ultimative Schutz für Ihr Fahrzeug. Sie bildet eine extrem harte, glasartige Schutzschicht auf dem Lack, die bis zu 5 Jahre hält. Die Versiegelung schützt vor UV-Strahlung, Umwelteinflüssen, Vogelkot, Insekten und leichten Kratzern. Dank der extremen Hydrophobie perlen Wasser und Schmutz einfach ab – die Reinigung wird zum Kinderspiel. Wir versiegeln auf Wunsch auch Felgen und Glas für rundum perfekten Schutz und intensiven Glanz.',
      features: ['Lack-Versiegelung (bis 5 Jahre)', 'Felgen-Versiegelung', 'Glas-Versiegelung', 'Hydrophober Effekt'],
      category: 'paint',
    },
    {
      icon: Wrench,
      title: 'Felgenreinigung & Pflege',
      description: 'Intensive Reinigung und Pflege Ihrer Felgen. Entfernung von Bremsstaub, Flugrost und hartnäckigen Verschmutzungen. Optional mit Keramikversiegelung für dauerhaften Schutz.',
      detailedDescription: 'Felgen sind permanenten Belastungen ausgesetzt – Bremsstaub, Flugrost und Straßenschmutz setzen ihnen zu. Unsere intensive Felgenreinigung entfernt selbst hartnäckigste Verschmutzungen schonend aber gründlich. Wir verwenden spezielle Felgenreiniger, die auch in schwer zugängliche Bereiche vordringen. Optional bieten wir eine Keramikversiegelung für Felgen an, die dauerhaften Schutz bietet und die Reinigung künftig deutlich erleichtert. Für langanhaltenden Glanz und perfekte Optik.',
      features: ['Bremsstaub-Entfernung', 'Flugrost-Behandlung', 'Felgen-Versiegelung (optional)', 'Glanzpolitur'],
      category: 'paint',
    },
    {
      icon: Car,
      title: 'Innenreinigung & Aufbereitung',
      description: 'Gründliche Reinigung und Auffrischung des gesamten Innenraums. Von Polstern über Armaturenbrett bis zu den kleinsten Ritzen – wir sorgen für ein hygienisches, frisches Fahrgefühl.',
      detailedDescription: 'Ein sauberer Innenraum ist essenziell für Ihr Wohlbefinden und den Werterhalt Ihres Fahrzeugs. Unsere Innenraumaufbereitung ist eine Tiefenreinigung aller Flächen – von Polstern über Armaturenbrett bis in die kleinsten Ritzen. Wir verwenden spezielle Reiniger für jeden Materialtyp und neutralisieren unangenehme Gerüche nachhaltig. Teppiche und Polster werden intensiv gereinigt, Kunststoffteile aufgefrischt und gepflegt. Das Ergebnis ist ein hygienisch sauberer, frisch duftender Innenraum wie am ersten Tag.',
      features: ['Tiefenreinigung aller Flächen', 'Polster & Teppichpflege', 'Geruchsneutralisation', 'Kunststoffpflege'],
      category: 'interior',
    },
    {
      icon: Brush,
      title: 'Leder/Alcantara/Polster-Aufbereitung',
      description: 'Spezialbehandlung für Leder, Alcantara und Stoffpolster. Reinigung, Pflege und Imprägnierung für langanhaltenden Schutz und gepflegtes Aussehen.',
      detailedDescription: 'Hochwertige Materialien wie Leder und Alcantara benötigen spezielle Pflege. Unsere Materialaufbereitung beginnt mit einer schonenden aber gründlichen Reinigung, gefolgt von intensiver Pflege mit hochwertigen Produkten. Leder wird genährt und geschmeidig gehalten, Alcantara erhält seine samtige Haptik zurück. Hartnäckige Flecken werden professionell entfernt. Abschließend erfolgt eine Imprägnierung, die vor Verschmutzungen und Verschleiß schützt. Ihre Polster sehen aus wie neu und bleiben es länger.',
      features: ['Lederreinigung & -pflege', 'Alcantara-Behandlung', 'Fleckenentfernung', 'Imprägnierung'],
      category: 'interior',
    },
    {
      icon: Gauge,
      title: 'Lenkradaufbereitung',
      description: 'Spezielle Behandlung für abgenutzte Lenkräder. Reinigung, Auffrischung und Schutz für Leder-, Alcantara- und Kunstleder-Lenkräder.',
      detailedDescription: 'Das Lenkrad ist der am meisten beanspruchte Teil im Innenraum. Unsere Lenkradaufbereitung haucht abgenutzten, speckigen oder verfärbten Lenkrädern neues Leben ein. Wir reinigen gründlich, frischen Farben auf und tragen spezielle Pflegeprodukte auf, die das Material schützen und geschmeidig halten. Egal ob Leder, Alcantara oder Kunstleder – wir behandeln jeden Materialtyp mit den passenden Produkten. Das Ergebnis: Ein Lenkrad, das sich wieder angenehm anfühlt und makellos aussieht.',
      features: ['Leder-Auffrischung', 'Alcantara-Reinigung', 'Farbauffrischung', 'Schutzversiegelung'],
      category: 'interior',
    },
    {
      icon: Palette,
      title: 'Fahrzeugaufbereitung für Verkauf',
      description: 'Komplette Aufbereitung Ihres Fahrzeugs für den bestmöglichen Verkaufspreis. Innen und außen perfekt präsentiert – so überzeugen Sie potenzielle Käufer.',
      detailedDescription: 'Der erste Eindruck zählt – besonders beim Fahrzeugverkauf. Unsere Verkaufsaufbereitung ist ein Komplettpaket, das Ihr Fahrzeug innen und außen in Bestform bringt. Wir polieren den Lack auf Hochglanz, reinigen und pflegen den Innenraum gründlich, beseitigen Gerüche und kümmern uns um alle Details. Studien zeigen: Professionell aufbereitete Fahrzeuge erzielen deutlich höhere Verkaufspreise und verkaufen sich schneller. Investieren Sie in eine professionelle Aufbereitung – sie zahlt sich aus.',
      features: ['Komplette Innen- & Aussenreinigung', 'Politur & Auffrischung', 'Geruchsbeseitigung', 'Verkaufsoptimierung'],
      category: 'special',
    },
    {
      icon: ShieldAlert,
      title: 'Steinschlagreparatur & Scheibentausch',
      description: 'Steinschlag in der Frontscheibe? Kein Stress – wir tauschen sie schnell und professionell! Profitieren Sie von Cashback, Selbstbehalt-Übernahme und weiteren starken Aktionen.',
      detailedDescription: 'Ein Steinschlag in der Frontscheibe ist ärgerlich, aber kein Grund zur Sorge. Wir tauschen Ihre beschädigte Scheibe schnell, professionell und unkompliziert. Das Beste daran: Sie profitieren von attraktiven Vorteilen wie Cashback-Aktionen und wir übernehmen Ihren Selbstbehalt. Vereinbaren Sie jetzt einen Termin und fahren Sie schon bald wieder mit klarer Sicht!',
      features: ['Cashback sichern', 'Selbstbehalt wird übernommen', 'Schneller Scheibentausch', 'Weitere starke Aktionen'],
      category: 'special',
    },
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  // Reset page when category changes
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(0);
  };

  // Pagination
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentServices = filteredServices.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {/* Fixed Background Image with Dark Overlay */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <img 
          src={lamboBackground} 
          alt="Lamborghini Background" 
          className="w-full h-full object-cover" 
          style={{
            objectPosition: 'center 75%'
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
      <section className="pt-32 pb-12 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="mb-6">
              Unsere <span className="text-gradient">Leistungen</span>
            </h1>
            <p className="text-xl text-white drop-shadow-lg">
              Professionelle Fahrzeugpflege auf höchstem Niveau – von der Basis-Reinigung bis zur Keramikversiegelung
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'bg-secondary hover:bg-secondary/80 text-foreground'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid with Pagination */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto relative">
            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentServices.map((service, index) => (
                <div
                  key={service.title}
                  onClick={() => setSelectedService(service)}
                  className="h-full card-shine border border-border rounded-2xl p-6 sm:p-8 hover:border-primary/50 transition-all duration-300 animate-fade-up cursor-pointer hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                        <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold mb-3">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{service.description}</p>
                    </div>
                    <div className="mt-auto">
                      <div className="h-px bg-border mb-4" />
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                            <span className="text-foreground/80">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-16 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary/90 hover:bg-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-glow border-2 border-primary"
                  aria-label="Vorherige Seite"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages - 1}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-16 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary/90 hover:bg-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-glow border-2 border-primary"
                  aria-label="Nächste Seite"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </>
            )}

            {/* Page Indicator */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentPage
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-border hover:bg-border/60'
                    }`}
                    aria-label={`Gehe zu Seite ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl p-8 md:p-12">
            <h2 className="mb-6">Interesse an unseren Leistungen?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Kontaktieren Sie uns für ein unverbindliches Angebot oder buchen Sie direkt Ihren Wunschtermin
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
                <Link to="/kontakt">Jetzt Termin buchen</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Detail Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          {selectedService && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <selectedService.icon className="w-8 h-8 text-primary" />
                  </div>
                  <DialogTitle className="text-3xl">{selectedService.title}</DialogTitle>
                </div>
                <DialogDescription className="text-base text-muted-foreground">
                  {selectedService.description}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">Detaillierte Beschreibung</h4>
                  <p className="text-foreground/80 leading-relaxed">
                    {selectedService.detailedDescription}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4">Leistungsumfang</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedService.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span className="text-foreground/90">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="text-lg font-semibold mb-4">Interesse geweckt?</h4>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="flex-1">
                      <Link to="/kontakt">Jetzt Termin buchen</Link>
                    </Button>
                    <Button asChild variant="outline" className="flex-1">
                      <a href="tel:+41765493697">Anrufen: +41 76 549 36 97</a>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
      </div>
    </>
  );
};

export default Services;
