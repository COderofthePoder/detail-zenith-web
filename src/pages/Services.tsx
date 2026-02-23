import { 
  Droplets, Car, Sparkles, Shield, Wrench, 
  Package, PackageCheck, Crown, Lightbulb, 
  Zap, Wind, Dog, Sun
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
  const [selectedService, setSelectedService] = useState<any>(null);

  const categories = [
    { id: 'all', label: 'Alle Pakete' },
    { id: 'komplett', label: 'Komplettpakete' },
    { id: 'aussen', label: 'Aussen' },
    { id: 'innen', label: 'Innen' },
    { id: 'politur', label: 'Politur' },
    { id: 'versiegelung', label: 'Versiegelung' },
    { id: 'zusatz', label: 'Zusatzleistungen' },
  ];

  const services = [
    {
      icon: Droplets,
      title: 'Aussenpflege Standard',
      description: 'Gründliche Handwäsche mit pH-neutralen Produkten, intensive Felgenreinigung, Scheibenreinigung innen & aussen, Reifenpflege und sanfte Wachsauffrischung.',
      detailedDescription: 'Unsere Aussenpflege Standard ist die perfekte Wahl für alle, die eine saubere und gepflegte Optik möchten. Die professionelle Handwäsche erfolgt mit pH-neutralen Shampoos, die Ihren Lack schonend reinigen. Die intensive Felgenreinigung entfernt Bremsstaub und hartnäckige Verschmutzungen. Scheiben werden innen und aussen kristallklar gereinigt. Abgerundet wird die Behandlung mit Reifenpflege und einer sanften Wachsauffrischung für Glanz und Schutz.',
      features: ['Professionelle Handwäsche', 'Intensive Felgenreinigung', 'Scheibenreinigung innen & aussen', 'Reifenpflege & Wachsauffrischung'],
      category: 'aussen',
    },
    {
      icon: Sparkles,
      title: 'Innen Premium',
      description: 'Tiefenreinigung aller Sitzflächen, Teppiche und Himmel. Inklusive Lederpflege und Entfernung hartnäckiger Verschmutzungen für gründliche Auffrischung.',
      detailedDescription: 'Die Premium-Innenraumaufbereitung ist eine intensive Tiefenreinigung Ihres gesamten Innenraums. Alle Sitzflächen werden gründlich gereinigt – egal ob Textil oder Leder. Teppiche, Fussmatten und sogar der Himmel werden professionell behandelt. Ledersitze erhalten eine spezielle Pflegebehandlung, die das Material nährt und geschmeidig hält. Hartnäckige Verschmutzungen, Staub und Schmutz in allen Ritzen werden restlos entfernt.',
      features: ['Tiefenreinigung Sitzflächen & Teppiche', 'Himmel-Reinigung', 'Lederpflege professionell', 'Entfernung hartnäckiger Verschmutzungen'],
      category: 'innen',
    },
    {
      icon: Car,
      title: 'Innen Basic',
      description: 'Gründliches Staubsaugen, Reinigung und Pflege von Cockpit, Armaturen und Türverkleidungen. Glasreinigung innen für frischen, hygienischen Innenraum.',
      detailedDescription: 'Die Basic-Innenreinigung ist ideal für den Alltag und hält Ihren Innenraum frisch und hygienisch. Es wird gründlich gestaubsaugt – Teppiche, Sitze und Kofferraum werden von Staub und Schmutz befreit. Cockpit, Armaturen und Türverkleidungen werden sorgfältig gereinigt und gepflegt. Die Glasreinigung innen sorgt für klare Sicht.',
      features: ['Gründliches Staubsaugen komplett', 'Cockpit & Armaturen-Reinigung', 'Türverkleidungen-Pflege', 'Glasreinigung innen'],
      category: 'innen',
    },
    {
      icon: Zap,
      title: 'Dreistufige Politur (Showroom-Finish)',
      description: 'Intensive Lackkorrektur für höchste Ansprüche. Entfernt tiefe Kratzer, maximale Glätte und Hochglanzfinish. Perfekt für Premium-Fahrzeuge.',
      detailedDescription: 'Die dreistufige Politur ist unsere Königsklasse der Lackaufbereitung. In drei intensiven Arbeitsschritten entfernen wir tiefe Kratzer, Hologramme und Swirls vollständig. Durch mehrstufiges Schleifen und Polieren erreichen wir maximale Glätte und einen Hochglanz, der seinesgleichen sucht.',
      features: ['Tiefe Kratzerentfernung', 'Maximale Lackglätte', 'Hochglanzfinish', 'Ideal für Premium-Fahrzeuge'],
      category: 'politur',
    },
    {
      icon: Lightbulb,
      title: 'Zweistufige Politur (Kratzerkorrektur & Glanz)',
      description: 'Entfernt mittlere Kratzer, Hologramme und leichte Swirls. Tiefenglanz und perfekte Vorbereitung für Versiegelungen.',
      detailedDescription: 'Die zweistufige Politur bietet eine professionelle Kratzerkorrektur in zwei Schritten. Im ersten Schritt werden mittlere Kratzer, Hologramme und leichte Swirls entfernt. Der zweite Schritt bringt den Tiefenglanz zurück und bereitet den Lack optimal für Versiegelungen vor.',
      features: ['Mittlere Kratzerentfernung', 'Hologramm-Beseitigung', 'Tiefenglanz', 'Vorbereitung für Versiegelung'],
      category: 'politur',
    },
    {
      icon: Sparkles,
      title: 'Einstufige Politur (Glanzauffrischung)',
      description: 'Entfernung leichter Kratzer, Oxidation und kleiner Gebrauchsspuren. Bringt den Lack zurück zum strahlenden Glanz und schützt die Oberfläche.',
      detailedDescription: 'Die einstufige Politur ist die ideale Glanzauffrischung für Ihren Lack. Sie entfernt leichte Kratzer, Oxidation und kleine Gebrauchsspuren effektiv. Der Lack wird aufgefrischt und zurück zum strahlenden Glanz gebracht.',
      features: ['Leichte Kratzerentfernung', 'Oxidations-Beseitigung', 'Glanzauffrischung', 'Lackschutz & -pflege'],
      category: 'politur',
    },
    {
      icon: Shield,
      title: 'Keramikversiegelung (3 Jahre)',
      description: 'Extra langer Schutz für Ihren Lack. Sorgt für dauerhaft tiefen Glanz, minimiert Kratzer- und Witterungsschäden. Wasser- und schmutzabweisend.',
      detailedDescription: 'Die 3-Jahres-Keramikversiegelung bietet extra langen Schutz für Ihren Lack. Die hochwertige Versiegelung bildet eine extrem harte Schutzschicht, die dauerhaft tiefen Glanz garantiert und Kratzer sowie Witterungsschäden minimiert.',
      features: ['3 Jahre Schutz', 'UV-beständig', 'Wasser- & schmutzabweisend', 'Minimiert Kratzer'],
      category: 'versiegelung',
    },
    {
      icon: Shield,
      title: 'Keramikversiegelung (1 Jahr)',
      description: 'Hochwertiger Langzeitschutz für Ihren Lack. Wasser- und schmutzabweisend, UV-beständig, erleichtert die Pflege erheblich.',
      detailedDescription: 'Die 1-Jahres-Keramikversiegelung ist der perfekte Langzeitschutz für Ihren Lack. Sie bildet eine harte Schutzschicht, die vor UV-Strahlung, Umwelteinflüssen, Vogelkot und Insekten schützt.',
      features: ['1 Jahr Schutz', 'UV-beständig', 'Hydrophober Effekt', 'Erleichterte Pflege'],
      category: 'versiegelung',
    },
    {
      icon: Wrench,
      title: 'Felgenversiegelung (pro Satz)',
      description: 'Schützt Felgen vor Bremsstaub, Schmutz und Korrosion. Erleichtert die Reinigung erheblich und erhält den Glanz dauerhaft.',
      detailedDescription: 'Die Felgenversiegelung schützt Ihre Felgen dauerhaft vor Bremsstaub, Schmutz und Korrosion. Felgen sind permanenten Belastungen ausgesetzt – unsere Versiegelung bildet eine schützende Barriere, die die Reinigung deutlich erleichtert.',
      features: ['Schutz vor Bremsstaub', 'Korrosionsschutz', 'Erleichterte Reinigung', 'Dauerhafter Glanz'],
      category: 'versiegelung',
    },
    {
      icon: Crown,
      title: 'Komplett Deluxe',
      description: 'Das ultimative Premium-Paket für höchste Ansprüche. Komplette Innenraumaufbereitung, professionelle Aussenpflege und dreistufige Politur für Showroom-Finish.',
      detailedDescription: 'Unser Deluxe-Paket ist die Königsklasse der Fahrzeugaufbereitung. Es kombiniert intensive Innenraumreinigung aller Sitzflächen, Teppiche und Flächen mit professioneller Aussenpflege inklusive Handwäsche, Felgen- und Scheibenreinigung. Das Highlight: Eine dreistufige Politur mit intensiver Lackkorrektur.',
      features: ['Innenraumtiefenreinigung Premium', 'Komplette Aussenpflege Standard', 'Dreistufige Politur (Showroom-Finish)', 'Hochglanzfinish & Lackkorrektur'],
      category: 'komplett',
    },
    {
      icon: PackageCheck,
      title: 'Komplett Premium',
      description: 'Premium-Komplettpaket für anspruchsvolle Fahrzeugpflege. Umfassende Innenraumaufbereitung plus professionelle Aussenpflege für ein rundum gepflegtes Fahrzeug.',
      detailedDescription: 'Das Premium-Paket bietet eine umfassende Aufbereitung Ihres Fahrzeugs. Die Innenraumaufbereitung umfasst Tiefenreinigung aller Sitzflächen, Teppiche und Himmel, inklusive Lederpflege. Die Aussenpflege beinhaltet gründliche Handwäsche, intensive Felgenreinigung und Reifenpflege.',
      features: ['Innenraumtiefenreinigung Premium', 'Lederpflege & Fleckenentfernung', 'Aussenpflege Standard komplett', 'Felgen- & Scheibenreinigung'],
      category: 'komplett',
    },
    {
      icon: Package,
      title: 'Komplett Basic',
      description: 'Perfektes Einstiegspaket für gründliche Reinigung innen und aussen. Ideal für alle, die ein gepflegtes Gesamtbild suchen.',
      detailedDescription: 'Das Basic-Paket kombiniert unsere bewährte Innenreinigung mit professioneller Aussenpflege. Innen wird gründlich gestaubsaugt, Cockpit und Armaturen gereinigt. Aussen erfolgt eine gründliche Handwäsche mit Felgenreinigung und Wachsauffrischung.',
      features: ['Innenreinigung Basic komplett', 'Aussenpflege Standard', 'Cockpit & Armaturen-Pflege', 'Wachsauffrischung'],
      category: 'komplett',
    },
    {
      icon: Wrench,
      title: 'Motorraumreinigung',
      description: 'Gründliche Reinigung des Motorraums. Entfernung von Staub, Schmutz, Öl- und Fettablagerungen. Sorgt für sauberes Erscheinungsbild und Werterhalt.',
      detailedDescription: 'Die Motorraumreinigung sorgt für ein sauberes Erscheinungsbild unter der Haube. Wir entfernen gründlich Staub, Schmutz, Öl- und Fettablagerungen. Empfindliche Bauteile werden geschützt.',
      features: ['Gründliche Reinigung', 'Öl- & Fettentfernung', 'Schutz empfindlicher Bauteile', 'Werterhalt'],
      category: 'zusatz',
    },
    {
      icon: Dog,
      title: 'Tierhaarentfernung',
      description: 'Professionelle Entfernung hartnäckiger Tierhaare aus Sitzen, Teppichen und Polstern. Sorgt für sauberes, hygienisches Interieur.',
      detailedDescription: 'Tierhaare können hartnäckig sein und sich tief in Polstern, Sitzen und Teppichen festsetzen. Unsere professionelle Tierhaarentfernung nutzt spezielle Techniken und Werkzeuge, um selbst die hartnäckigsten Haare restlos zu entfernen.',
      features: ['Professionelle Entfernung', 'Sitze, Teppiche & Polster', 'Hygienisches Interieur', 'Werterhalt'],
      category: 'zusatz',
    },
    {
      icon: Wind,
      title: 'Cabrioverdeck-Reinigung & Imprägnierung',
      description: 'Reinigung, Pflege und Imprägnierung von Stoff- oder Textilverdecken. Schützt vor Witterung und erhält die Optik.',
      detailedDescription: 'Cabrioverdecke aus Stoff oder Textil benötigen spezielle Pflege. Unsere Behandlung umfasst gründliche Reinigung, intensive Pflege und abschliessende Imprägnierung. Die Imprägnierung schützt vor Witterungseinflüssen, Nässe und UV-Strahlung.',
      features: ['Reinigung & Pflege', 'Imprägnierung', 'Witterungsschutz', 'Optik-Erhalt'],
      category: 'zusatz',
    },
    {
      icon: Sun,
      title: 'Scheinwerfer-Aufbereitung',
      description: 'Wiederherstellung von Klarheit und Glanz der Scheinwerfer. Verbessert Optik und Lichtleistung erheblich.',
      detailedDescription: 'Vergilbte oder matte Scheinwerfer beeinträchtigen nicht nur die Optik, sondern auch die Lichtleistung. Unsere Scheinwerfer-Aufbereitung stellt die ursprüngliche Klarheit und den Glanz wieder her.',
      features: ['Klarheits-Wiederherstellung', 'Glanzpolitur', 'Verbesserte Lichtleistung', 'Optik-Aufwertung'],
      category: 'zusatz',
    },
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <>
      {/* Fixed Background Image with Dark Overlay */}
      <div className="fixed inset-0 w-full h-screen z-0">
        <img 
          src={lamboBackground} 
          alt="Lamborghini Background" 
          className="w-full h-full object-cover" 
          style={{ objectPosition: 'center 75%' }} 
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
                Unsere <span className="text-gradient">Pakete</span>
              </h1>
              <p className="text-xl text-white drop-shadow-lg mb-8">
                Professionelle Fahrzeugpflege auf höchstem Niveau – von der Basisreinigung bis zur Premium-Komplettaufbereitung
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
                  onClick={() => setActiveCategory(category.id)}
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

        {/* Services Grid */}
        <section className="py-16 md:py-24 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {filteredServices.map((service, index) => (
                <div
                  key={service.title}
                  onClick={() => setSelectedService(service)}
                  className="card-shine border border-border rounded-2xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300 animate-fade-up cursor-pointer hover:scale-[1.02] flex flex-col"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{service.description}</p>
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
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 relative">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto bg-background/80 backdrop-blur-md border border-border/50 rounded-2xl p-8 md:p-12">
              <h2 className="mb-6">Interesse an unseren Paketen?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Kontaktieren Sie uns für ein unverbindliches Angebot oder reservieren Sie direkt Ihren Wunschtermin
              </p>
              <div className="flex justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
                  <Link to="/termin">Jetzt Termin reservieren</Link>
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
                      {selectedService.features.map((feature: string) => (
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
                        <Link to="/termin">Jetzt Termin reservieren</Link>
                      </Button>
                      <Button asChild variant="outline" className="flex-1">
                        <a href="https://api.whatsapp.com/send/?phone=41765493697&text&type=phone_number&app_absent=0" target="_blank" rel="noopener">WhatsApp: +41 76 549 36 97</a>
                      </Button>
                      <Button asChild variant="outline" className="flex-1">
                        <a href="https://api.whatsapp.com/send/?phone=41792610998&text&type=phone_number&app_absent=0" target="_blank" rel="noopener">WhatsApp: +41 79 261 09 98</a>
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
