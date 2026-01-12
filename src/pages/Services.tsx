import { 
  Droplets, Car, Sparkles, Shield, Wrench, 
  Package, PackageCheck, Crown, Lightbulb, 
  Zap, Wind, Dog, Sun, Truck, Bus as BusIcon, CarFront
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import lamboBackground from '@/assets/Lambo_Fertig_Background.jpeg';

// Vehicle class definitions with price multipliers and emojis
type VehicleClass = 'kleinwagen' | 'limousine' | 'kombi' | 'coupe' | 'cabrio' | 'suv' | 'pickup' | 'minivan' | 'bus';

const vehicleClasses: { id: VehicleClass; label: string; multiplier: number; emoji: string }[] = [
  { id: 'kleinwagen', label: 'Kleinwagen', multiplier: 0.85, emoji: '🚗' },
  { id: 'limousine', label: 'Limousine', multiplier: 1.0, emoji: '🚘' },
  { id: 'coupe', label: 'Coupé', multiplier: 1.0, emoji: '🏎️' },
  { id: 'cabrio', label: 'Cabrio', multiplier: 1.05, emoji: '🛞' },
  { id: 'kombi', label: 'Kombi', multiplier: 1.1, emoji: '🚙' },
  { id: 'suv', label: 'SUV', multiplier: 1.2, emoji: '🚜' },
  { id: 'pickup', label: 'Pickup', multiplier: 1.25, emoji: '🛻' },
  { id: 'minivan', label: 'Minivan', multiplier: 1.25, emoji: '🚐' },
  { id: 'bus', label: 'Bus', multiplier: 1.4, emoji: '🚌' },
];

// Helper function to calculate adjusted price
const adjustPrice = (priceString: string, multiplier: number): string => {
  // Check if price already contains vehicle class info (like "Kleinwagen: CHF 850 / ...")
  if (priceString.includes('Kleinwagen') || priceString.includes('Mittelklasse') || priceString.includes('SUV:')) {
    return priceString; // Return original for multi-class pricing
  }
  
  // Parse price ranges like "CHF 80 – 150" or single prices like "CHF 300"
  const priceRegex = /CHF\s*([\d']+)\s*(?:–\s*([\d']+))?/g;
  
  return priceString.replace(priceRegex, (match, min, max) => {
    const minPrice = Math.round(parseInt(min.replace(/'/g, '')) * multiplier);
    const formattedMin = minPrice >= 1000 ? minPrice.toLocaleString('de-CH').replace(',', "'") : minPrice.toString();
    
    if (max) {
      const maxPrice = Math.round(parseInt(max.replace(/'/g, '')) * multiplier);
      const formattedMax = maxPrice >= 1000 ? maxPrice.toLocaleString('de-CH').replace(',', "'") : maxPrice.toString();
      return `CHF ${formattedMin} – ${formattedMax}`;
    }
    return `CHF ${formattedMin}`;
  });
};

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const mobileCardRef = useRef<HTMLDivElement>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleClass>('limousine');

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
    // Aussenpflege
    {
      icon: Droplets,
      title: 'Aussenpflege Standard',
      description: 'Gründliche Handwäsche mit pH-neutralen Produkten, intensive Felgenreinigung, Scheibenreinigung innen & aussen, Reifenpflege und sanfte Wachsauffrischung.',
      detailedDescription: 'Unsere Aussenpflege Standard ist die perfekte Wahl für alle, die eine saubere und gepflegte Optik möchten. Die professionelle Handwäsche erfolgt mit pH-neutralen Shampoos, die Ihren Lack schonend reinigen. Die intensive Felgenreinigung entfernt Bremsstaub und hartnäckige Verschmutzungen. Scheiben werden innen und aussen kristallklar gereinigt. Abgerundet wird die Behandlung mit Reifenpflege und einer sanften Wachsauffrischung für Glanz und Schutz.',
      detailedPrice: 'CHF 80 – 150',
      features: ['Professionelle Handwäsche', 'Intensive Felgenreinigung', 'Scheibenreinigung innen & aussen', 'Reifenpflege & Wachsauffrischung'],
      category: 'aussen',
    },
    
    // Innenraumaufbereitung
    {
      icon: Sparkles,
      title: 'Innen Premium',
      description: 'Tiefenreinigung aller Sitzflächen, Teppiche und Himmel. Inklusive Lederpflege und Entfernung hartnäckiger Verschmutzungen für gründliche Auffrischung.',
      detailedDescription: 'Die Premium-Innenraumaufbereitung ist eine intensive Tiefenreinigung Ihres gesamten Innenraums. Alle Sitzflächen werden gründlich gereinigt – egal ob Textil oder Leder. Teppiche, Fussmatten und sogar der Himmel werden professionell behandelt. Ledersitze erhalten eine spezielle Pflegebehandlung, die das Material nährt und geschmeidig hält. Hartnäckige Verschmutzungen, Staub und Schmutz in allen Ritzen werden restlos entfernt. Ihr Innenraum wird hygienisch sauber und erstrahlt in neuem Glanz.',
      detailedPrice: 'CHF 99 – 199',
      features: ['Tiefenreinigung Sitzflächen & Teppiche', 'Himmel-Reinigung', 'Lederpflege professionell', 'Entfernung hartnäckiger Verschmutzungen'],
      category: 'innen',
    },
    {
      icon: Car,
      title: 'Innen Basic',
      description: 'Gründliches Staubsaugen, Reinigung und Pflege von Cockpit, Armaturen und Türverkleidungen. Glasreinigung innen für frischen, hygienischen Innenraum.',
      detailedDescription: 'Die Basic-Innenreinigung ist ideal für den Alltag und hält Ihren Innenraum frisch und hygienisch. Es wird gründlich gestaubsaugt – Teppiche, Sitze und Kofferraum werden von Staub und Schmutz befreit. Cockpit, Armaturen und Türverkleidungen werden sorgfältig gereinigt und gepflegt. Die Glasreinigung innen sorgt für klare Sicht. Perfekt für alle, die regelmässig für Ordnung und Sauberkeit sorgen möchten.',
      detailedPrice: 'CHF 79 – 119',
      features: ['Gründliches Staubsaugen komplett', 'Cockpit & Armaturen-Reinigung', 'Türverkleidungen-Pflege', 'Glasreinigung innen'],
      category: 'innen',
    },
    
    // Politur & Lackaufbereitung
    {
      icon: Zap,
      title: 'Dreistufige Politur (Showroom-Finish)',
      description: 'Intensive Lackkorrektur für höchste Ansprüche. Entfernt tiefe Kratzer, maximale Glätte und Hochglanzfinish. Perfekt für Premium-Fahrzeuge.',
      detailedDescription: 'Die dreistufige Politur ist unsere Königsklasse der Lackaufbereitung. In drei intensiven Arbeitsschritten entfernen wir tiefe Kratzer, Hologramme und Swirls vollständig. Durch mehrstufiges Schleifen und Polieren erreichen wir maximale Glätte und einen Hochglanz, der seinesgleichen sucht. Diese Behandlung ist perfekt für Präsentationsfahrzeuge oder Premium-Fahrzeuge, die perfekt aussehen sollen. Der Lack erstrahlt wie neu.',
      detailedPrice: 'Kleinwagen: CHF 850 / Mittelklasse: CHF 950 / SUV: CHF 1\'090',
      features: ['Tiefe Kratzerentfernung', 'Maximale Lackglätte', 'Hochglanzfinish', 'Ideal für Premium-Fahrzeuge'],
      category: 'politur',
    },
    {
      icon: Lightbulb,
      title: 'Zweistufige Politur (Kratzerkorrektur & Glanz)',
      description: 'Entfernt mittlere Kratzer, Hologramme und leichte Swirls. Tiefenglanz und perfekte Vorbereitung für Versiegelungen.',
      detailedDescription: 'Die zweistufige Politur bietet eine professionelle Kratzerkorrektur in zwei Schritten. Im ersten Schritt werden mittlere Kratzer, Hologramme und leichte Swirls entfernt. Der zweite Schritt bringt den Tiefenglanz zurück und bereitet den Lack optimal für Versiegelungen vor. Diese Behandlung ist ideal für Fahrzeuge, die bereits sichtbare Gebrauchsspuren aufweisen und eine deutliche Aufwertung benötigen.',
      detailedPrice: 'Kleinwagen: CHF 650 / Mittelklasse: CHF 750 / SUV: CHF 850',
      features: ['Mittlere Kratzerentfernung', 'Hologramm-Beseitigung', 'Tiefenglanz', 'Vorbereitung für Versiegelung'],
      category: 'politur',
    },
    {
      icon: Sparkles,
      title: 'Einstufige Politur (Glanzauffrischung)',
      description: 'Entfernung leichter Kratzer, Oxidation und kleiner Gebrauchsspuren. Bringt den Lack zurück zum strahlenden Glanz und schützt die Oberfläche.',
      detailedDescription: 'Die einstufige Politur ist die ideale Glanzauffrischung für Ihren Lack. Sie entfernt leichte Kratzer, Oxidation und kleine Gebrauchsspuren effektiv. Der Lack wird aufgefrischt, zurück zum strahlenden Glanz gebracht und gleichzeitig geschützt und gepflegt. Diese Behandlung eignet sich perfekt für Fahrzeuge, die regelmässig gepflegt werden und nur leichte Auffrischung benötigen.',
      detailedPrice: 'Kleinwagen: CHF 390 / Mittelklasse: CHF 450 / SUV: CHF 520',
      features: ['Leichte Kratzerentfernung', 'Oxidations-Beseitigung', 'Glanzauffrischung', 'Lackschutz & -pflege'],
      category: 'politur',
    },
    
    // Versiegelungen
    {
      icon: Shield,
      title: 'Keramikversiegelung (3 Jahre)',
      description: 'Extra langer Schutz für Ihren Lack. Sorgt für dauerhaft tiefen Glanz, minimiert Kratzer- und Witterungsschäden. Wasser- und schmutzabweisend.',
      detailedDescription: 'Die 3-Jahres-Keramikversiegelung bietet extra langen Schutz für Ihren Lack. Die hochwertige Versiegelung bildet eine extrem harte Schutzschicht, die dauerhaft tiefen Glanz garantiert und Kratzer sowie Witterungsschäden minimiert. UV-Strahlung, Vogelkot und Insekten können Ihrem Lack nichts mehr anhaben. Dank der extremen Hydrophobie perlen Wasser und Schmutz einfach ab – die Reinigung wird zum Kinderspiel.',
      detailedPrice: 'CHF 600',
      features: ['3 Jahre Schutz', 'UV-beständig', 'Wasser- & schmutzabweisend', 'Minimiert Kratzer'],
      category: 'versiegelung',
    },
    {
      icon: Shield,
      title: 'Keramikversiegelung (1 Jahr)',
      description: 'Hochwertiger Langzeitschutz für Ihren Lack. Wasser- und schmutzabweisend, UV-beständig, erleichtert die Pflege erheblich.',
      detailedDescription: 'Die 1-Jahres-Keramikversiegelung ist der perfekte Langzeitschutz für Ihren Lack. Sie bildet eine harte Schutzschicht, die vor UV-Strahlung, Umwelteinflüssen, Vogelkot und Insekten schützt. Die Versiegelung ist extrem hydrophob – Wasser und Schmutz perlen einfach ab. Die Pflege wird deutlich erleichtert, und Ihr Fahrzeug behält den tiefen Glanz über ein Jahr lang.',
      detailedPrice: 'CHF 300',
      features: ['1 Jahr Schutz', 'UV-beständig', 'Hydrophober Effekt', 'Erleichterte Pflege'],
      category: 'versiegelung',
    },
    {
      icon: Wrench,
      title: 'Felgenversiegelung (pro Satz)',
      description: 'Schützt Felgen vor Bremsstaub, Schmutz und Korrosion. Erleichtert die Reinigung erheblich und erhält den Glanz dauerhaft.',
      detailedDescription: 'Die Felgenversiegelung schützt Ihre Felgen dauerhaft vor Bremsstaub, Schmutz und Korrosion. Felgen sind permanenten Belastungen ausgesetzt – unsere Versiegelung bildet eine schützende Barriere, die die Reinigung deutlich erleichtert. Bremsstaub und Verschmutzungen haften kaum noch an der Oberfläche. Der Glanz bleibt länger erhalten, und Ihre Felgen sehen dauerhaft wie neu aus.',
      detailedPrice: 'CHF 150',
      features: ['Schutz vor Bremsstaub', 'Korrosionsschutz', 'Erleichterte Reinigung', 'Dauerhafter Glanz'],
      category: 'versiegelung',
    },
    
    // Komplettpakete
    {
      icon: Crown,
      title: 'Komplett Deluxe',
      description: 'Das ultimative Premium-Paket für höchste Ansprüche. Komplette Innenraumaufbereitung, professionelle Aussenpflege und dreistufige Politur für Showroom-Finish.',
      detailedDescription: 'Unser Deluxe-Paket ist die Königsklasse der Fahrzeugaufbereitung. Es kombiniert intensive Innenraumreinigung aller Sitzflächen, Teppiche und Flächen mit professioneller Aussenpflege inklusive Handwäsche, Felgen- und Scheibenreinigung. Das Highlight: Eine dreistufige Politur mit intensiver Lackkorrektur für höchste Ansprüche, die tiefe Kratzer entfernt und maximale Glätte erreicht. Ihr Fahrzeug erstrahlt in neuem Glanz – innen wie aussen perfekt.',
      detailedPrice: 'CHF 1\'150 – 1\'200',
      features: ['Innenraumtiefenreinigung Premium', 'Komplette Aussenpflege Standard', 'Dreistufige Politur (Showroom-Finish)', 'Hochglanzfinish & Lackkorrektur'],
      category: 'komplett',
    },
    {
      icon: PackageCheck,
      title: 'Komplett Premium',
      description: 'Premium-Komplettpaket für anspruchsvolle Fahrzeugpflege. Umfassende Innenraumaufbereitung plus professionelle Aussenpflege für ein rundum gepflegtes Fahrzeug.',
      detailedDescription: 'Das Premium-Paket bietet eine umfassende Aufbereitung Ihres Fahrzeugs. Die Innenraumaufbereitung umfasst Tiefenreinigung aller Sitzflächen (Textil oder Leder), Teppiche und Himmel, inklusive Lederpflege und Entfernung hartnäckiger Verschmutzungen. Die Aussenpflege beinhaltet gründliche Handwäsche, intensive Felgenreinigung, Scheibenreinigung innen & aussen, Reifenpflege und sanfte Wachsauffrischung. Ideal für alle, die ihrem Fahrzeug eine Rundum-Erneuerung gönnen möchten.',
      detailedPrice: 'CHF 169 – 310',
      features: ['Innenraumtiefenreinigung Premium', 'Lederpflege & Fleckenentfernung', 'Aussenpflege Standard komplett', 'Felgen- & Scheibenreinigung'],
      category: 'komplett',
    },
    {
      icon: Package,
      title: 'Komplett Basic',
      description: 'Perfektes Einstiegspaket für gründliche Reinigung innen und aussen. Ideal für alle, die ein gepflegtes Gesamtbild zum attraktiven Preis suchen.',
      detailedDescription: 'Das Basic-Paket kombiniert unsere bewährte Innenreinigung mit professioneller Aussenpflege. Innen wird gründlich gestaubsaugt, Cockpit und Armaturen gereinigt und gepflegt, Glasreinigung durchgeführt. Aussen erfolgt eine gründliche Handwäsche mit pH-neutralen Produkten, intensive Felgenreinigung, Scheibenreinigung und Reifenpflege. Abgerundet wird das Paket mit einer sanften Wachsauffrischung für Glanz und Schutz. Das perfekte Paket für den Alltag.',
      detailedPrice: 'CHF 149 – 240',
      features: ['Innenreinigung Basic komplett', 'Aussenpflege Standard', 'Cockpit & Armaturen-Pflege', 'Wachsauffrischung'],
      category: 'komplett',
    },
    
    // Zusatzleistungen
    {
      icon: Wrench,
      title: 'Motorraumreinigung',
      description: 'Gründliche Reinigung des Motorraums. Entfernung von Staub, Schmutz, Öl- und Fettablagerungen. Sorgt für sauberes Erscheinungsbild und Werterhalt.',
      detailedDescription: 'Die Motorraumreinigung sorgt für ein sauberes Erscheinungsbild unter der Haube. Wir entfernen gründlich Staub, Schmutz, Öl- und Fettablagerungen. Empfindliche Bauteile werden geschützt, während der gesamte Motorraum professionell gereinigt wird. Ein sauberer Motorraum erhöht den Werterhalt Ihres Fahrzeugs und erleichtert Wartungsarbeiten.',
      detailedPrice: 'CHF 90 – 130',
      features: ['Gründliche Reinigung', 'Öl- & Fettentfernung', 'Schutz empfindlicher Bauteile', 'Werterhalt'],
      category: 'zusatz',
    },
    {
      icon: Dog,
      title: 'Tierhaarentfernung',
      description: 'Professionelle Entfernung hartnäckiger Tierhaare aus Sitzen, Teppichen und Polstern. Sorgt für sauberes, hygienisches Interieur.',
      detailedDescription: 'Tierhaare können hartnäckig sein und sich tief in Polstern, Sitzen und Teppichen festsetzen. Unsere professionelle Tierhaarentfernung nutzt spezielle Techniken und Werkzeuge, um selbst die hartnäckigsten Haare restlos zu entfernen. Das Ergebnis ist ein sauberes, hygienisches Interieur und der Werterhalt Ihres Fahrzeugs. Ideal für Tierbesitzer.',
      detailedPrice: 'CHF 80 – 120',
      features: ['Professionelle Entfernung', 'Sitze, Teppiche & Polster', 'Hygienisches Interieur', 'Werterhalt'],
      category: 'zusatz',
    },
    {
      icon: Wind,
      title: 'Cabrioverdeck-Reinigung & Imprägnierung',
      description: 'Reinigung, Pflege und Imprägnierung von Stoff- oder Textilverdecken. Schützt vor Witterung und erhält die Optik.',
      detailedDescription: 'Cabrioverdecke aus Stoff oder Textil benötigen spezielle Pflege. Unsere Behandlung umfasst gründliche Reinigung, intensive Pflege und abschliessende Imprägnierung. Die Imprägnierung schützt vor Witterungseinflüssen, Nässe und UV-Strahlung. Das Verdeck behält seine Optik und Funktionalität über Jahre hinweg. Perfekt für Cabrio-Besitzer, die ihr Verdeck optimal schützen möchten.',
      detailedPrice: 'CHF 80 – 120',
      features: ['Reinigung & Pflege', 'Imprägnierung', 'Witterungsschutz', 'Optik-Erhalt'],
      category: 'zusatz',
    },
    {
      icon: Sun,
      title: 'Scheinwerfer-Aufbereitung',
      description: 'Wiederherstellung von Klarheit und Glanz der Scheinwerfer. Verbessert Optik und Lichtleistung erheblich.',
      detailedDescription: 'Vergilbte oder matte Scheinwerfer beeinträchtigen nicht nur die Optik, sondern auch die Lichtleistung. Unsere Scheinwerfer-Aufbereitung stellt die ursprüngliche Klarheit und den Glanz wieder her. Durch professionelles Polieren und Versiegeln werden die Scheinwerfer wie neu. Die Lichtleistung verbessert sich deutlich, und Ihr Fahrzeug sieht wieder aus wie neu.',
      detailedPrice: 'CHF 100 – 150',
      features: ['Klarheits-Wiederherstellung', 'Glanzpolitur', 'Verbesserte Lichtleistung', 'Optik-Aufwertung'],
      category: 'zusatz',
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
  const itemsPerPageMobile = 1;
  const itemsPerPageDesktop = 3;
  const totalPagesMobile = filteredServices.length;
  const totalPagesDesktop = Math.ceil(filteredServices.length / itemsPerPageDesktop);
  
  const currentService = filteredServices[currentPage];
  const startIndexDesktop = currentPage * itemsPerPageDesktop;
  const currentServicesDesktop = filteredServices.slice(startIndexDesktop, startIndexDesktop + itemsPerPageDesktop);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentPage < totalPagesMobile - 1) {
      goToNextPage();
    }
    if (isRightSwipe && currentPage > 0) {
      goToPreviousPage();
    }

    setTouchStart(0);
    setTouchEnd(0);
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
              Unsere <span className="text-gradient">Pakete</span>
            </h1>
            <p className="text-xl text-white drop-shadow-lg mb-8">
              Professionelle Fahrzeugpflege auf höchstem Niveau – von der Basisreinigung bis zur Premium-Komplettaufbereitung
            </p>
            
            {/* Vehicle Class Selector - Visual Grid */}
            <div className="mt-8">
              <p className="text-white/80 font-medium mb-4">Wähle deine Fahrzeugklasse:</p>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 sm:gap-3 max-w-4xl mx-auto">
                {vehicleClasses.map((vc) => (
                  <button
                    key={vc.id}
                    onClick={() => setSelectedVehicle(vc.id)}
                    className={`flex flex-col items-center gap-1 p-2 sm:p-3 rounded-xl transition-all duration-300 ${
                      selectedVehicle === vc.id
                        ? 'bg-primary text-primary-foreground shadow-glow scale-105'
                        : 'bg-secondary/80 hover:bg-secondary text-foreground hover:scale-105'
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl">{vc.emoji}</span>
                    <span className="text-xs sm:text-sm font-medium text-center leading-tight">{vc.label}</span>
                  </button>
                ))}
              </div>
            </div>
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

      {/* Services Display - Single on Mobile, 3-Grid Slider on Desktop */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          {/* Mobile View - Single Service with Navigation */}
          <div className="md:hidden max-w-2xl mx-auto relative">
            {/* Swipe Hint - Always Visible */}
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
              <div className="flex items-center gap-3 bg-primary/20 backdrop-blur-sm px-6 py-2 rounded-full border border-primary/40">
                <span className="text-2xl font-bold text-white animate-[slide-right_1.5s_ease-in-out_infinite_reverse]">←</span>
                <span className="text-white font-bold text-lg">Wische</span>
                <span className="text-2xl font-bold text-white animate-[slide-right_1.5s_ease-in-out_infinite]">→</span>
              </div>
            </div>
            
            {currentService && (
              <div
                ref={mobileCardRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={() => setSelectedService(currentService)}
                className="card-shine border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer touch-pan-y"
                style={{ minHeight: '480px' }}
              >
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                      <currentService.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{currentService.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{currentService.description}</p>
                  </div>
                  <div className="mt-auto pt-4">
                    {currentService.detailedPrice && (
                      <div className="bg-primary/10 rounded-lg px-4 py-3 border border-primary/20 mb-4">
                        <p className="text-xl font-bold text-primary">
                          {adjustPrice(currentService.detailedPrice, vehicleClasses.find(v => v.id === selectedVehicle)?.multiplier || 1)}
                        </p>
                      </div>
                    )}
                    <div className="h-px bg-border mb-4" />
                    <ul className="space-y-2">
                      {currentService.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Page Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {filteredServices.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentPage
                        ? 'w-8 bg-primary'
                        : 'w-2 bg-border hover:bg-border/60'
                    }`}
                    aria-label={`Gehe zu Paket ${index + 1}`}
                  />
              ))}
            </div>
          </div>

          {/* Desktop View - 3-Column Slider */}
          <div className="hidden md:block max-w-7xl mx-auto relative">
            <div className={`grid gap-6 auto-rows-fr ${
              currentServicesDesktop.length === 1 
                ? 'grid-cols-1 max-w-lg mx-auto' 
                : currentServicesDesktop.length === 2 
                ? 'grid-cols-2 max-w-4xl mx-auto' 
                : 'grid-cols-3'
            }`}>
              {currentServicesDesktop.map((service, index) => (
                <div
                  key={service.title}
                  onClick={() => setSelectedService(service)}
                  className="card-shine border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 animate-fade-up cursor-pointer hover:scale-[1.02] flex flex-col h-full"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                        <service.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                    </div>
                    <div className="mt-auto pt-4">
                      {service.detailedPrice && (
                        <div className="bg-primary/10 rounded-lg px-4 py-3 border border-primary/20 mb-4">
                          <p className="text-xl font-bold text-primary">
                            {adjustPrice(service.detailedPrice, vehicleClasses.find(v => v.id === selectedVehicle)?.multiplier || 1)}
                          </p>
                        </div>
                      )}
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

            {/* Desktop Navigation Arrows */}
            {totalPagesDesktop > 1 && (
              <>
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 0}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 h-16 w-16 rounded-full bg-primary/90 hover:bg-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-glow border-2 border-primary z-10"
                  aria-label="Vorherige Seite"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPagesDesktop - 1}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 h-16 w-16 rounded-full bg-primary/90 hover:bg-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-glow border-2 border-primary z-10"
                  aria-label="Nächste Seite"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary-foreground">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </>
            )}

            {/* Desktop Page Indicator */}
            {totalPagesDesktop > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                {Array.from({ length: totalPagesDesktop }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === currentPage
                        ? 'w-10 bg-primary'
                        : 'w-2.5 bg-border hover:bg-border/60'
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
            <h2 className="mb-6">Interesse an unseren Paketen?</h2>
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

                {selectedService.detailedPrice && (
                  <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
                    <h4 className="text-lg font-semibold mb-2">Preis für {vehicleClasses.find(v => v.id === selectedVehicle)?.label}</h4>
                    <p className="text-2xl font-bold text-primary">
                      {adjustPrice(selectedService.detailedPrice, vehicleClasses.find(v => v.id === selectedVehicle)?.multiplier || 1)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">Preise variieren je nach Fahrzeugklasse</p>
                  </div>
                )}

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
