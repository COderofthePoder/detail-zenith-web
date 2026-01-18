import { useState } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Car, ArrowRight, ArrowLeft, Check, Send, Calendar as CalendarIcon,
  Droplets, Sparkles, Shield, Wrench, Package, PackageCheck, Crown,
  Lightbulb, Zap, Wind, Dog, Sun
} from 'lucide-react';
import { cn } from '@/lib/utils';

type VehicleClass = 'kleinwagen' | 'limousine' | 'kombi' | 'coupe' | 'cabrio' | 'suv' | 'pickup' | 'minivan' | 'bus';

const vehicleClasses: { id: VehicleClass; label: string; multiplier: number }[] = [
  { id: 'kleinwagen', label: 'Kleinwagen', multiplier: 0.85 },
  { id: 'limousine', label: 'Limousine', multiplier: 1.0 },
  { id: 'coupe', label: 'Coupé', multiplier: 1.0 },
  { id: 'cabrio', label: 'Cabrio', multiplier: 1.05 },
  { id: 'kombi', label: 'Kombi', multiplier: 1.1 },
  { id: 'suv', label: 'SUV', multiplier: 1.2 },
  { id: 'pickup', label: 'Pickup', multiplier: 1.25 },
  { id: 'minivan', label: 'Minivan', multiplier: 1.25 },
  { id: 'bus', label: 'Bus', multiplier: 1.4 },
];

const services = [
  // Komplettpakete
  { id: 'komplett-deluxe', title: 'Komplett Deluxe', category: 'komplett', icon: Crown, basePrice: 1175 },
  { id: 'komplett-premium', title: 'Komplett Premium', category: 'komplett', icon: PackageCheck, basePrice: 240 },
  { id: 'komplett-basic', title: 'Komplett Basic', category: 'komplett', icon: Package, basePrice: 195 },
  // Aussenpflege
  { id: 'aussen-standard', title: 'Aussenpflege Standard', category: 'aussen', icon: Droplets, basePrice: 115 },
  // Innenreinigung
  { id: 'innen-premium', title: 'Innen Premium', category: 'innen', icon: Sparkles, basePrice: 149 },
  { id: 'innen-basic', title: 'Innen Basic', category: 'innen', icon: Car, basePrice: 99 },
  // Politur
  { id: 'politur-dreistufig', title: 'Dreistufige Politur', category: 'politur', icon: Zap, basePrice: 950 },
  { id: 'politur-zweistufig', title: 'Zweistufige Politur', category: 'politur', icon: Lightbulb, basePrice: 750 },
  { id: 'politur-einstufig', title: 'Einstufige Politur', category: 'politur', icon: Sparkles, basePrice: 450 },
  // Versiegelung
  { id: 'keramik-3jahre', title: 'Keramikversiegelung (3 Jahre)', category: 'versiegelung', icon: Shield, basePrice: 600 },
  { id: 'keramik-1jahr', title: 'Keramikversiegelung (1 Jahr)', category: 'versiegelung', icon: Shield, basePrice: 300 },
  { id: 'felgenversiegelung', title: 'Felgenversiegelung', category: 'versiegelung', icon: Wrench, basePrice: 150 },
  // Zusatz
  { id: 'motorraumreinigung', title: 'Motorraumreinigung', category: 'zusatz', icon: Wrench, basePrice: 110 },
  { id: 'tierhaarentfernung', title: 'Tierhaarentfernung', category: 'zusatz', icon: Dog, basePrice: 100 },
  { id: 'cabrioverdeck', title: 'Cabrioverdeck-Reinigung', category: 'zusatz', icon: Wind, basePrice: 100 },
  { id: 'scheinwerfer', title: 'Scheinwerfer-Aufbereitung', category: 'zusatz', icon: Sun, basePrice: 125 },
];

const categories = [
  { id: 'komplett', label: 'Komplettpakete' },
  { id: 'aussen', label: 'Aussenpflege' },
  { id: 'innen', label: 'Innenreinigung' },
  { id: 'politur', label: 'Politur' },
  { id: 'versiegelung', label: 'Versiegelung' },
  { id: 'zusatz', label: 'Zusatzleistungen' },
];

const formatPrice = (price: number): string => {
  return `CHF ${price.toLocaleString('de-CH')}`; 
};

const Booking = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleClass | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedVehicle) return 0;
    const multiplier = vehicleClasses.find(v => v.id === selectedVehicle)?.multiplier || 1;
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId);
      return total + Math.round((service?.basePrice || 0) * multiplier);
    }, 0);
  };

  const getServicePrice = (serviceId: string) => {
    if (!selectedVehicle) return 0;
    const multiplier = vehicleClasses.find(v => v.id === selectedVehicle)?.multiplier || 1;
    const service = services.find(s => s.id === serviceId);
    return Math.round((service?.basePrice || 0) * multiplier);
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedVehicle !== null;
      case 2:
        return selectedServices.length > 0;
      case 3:
        return selectedDate !== undefined;
      case 4:
        return formData.name && formData.email;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    
    setIsSubmitting(true);

    const vehicleLabel = vehicleClasses.find(v => v.id === selectedVehicle)?.label || '';
    const total = calculateTotal();
    const serviceDetails = selectedServices.map(id => {
      const service = services.find(s => s.id === id);
      const price = getServicePrice(id);
      return `- ${service?.title}: ${formatPrice(price)}`;
    }).join('\n');
    const dateStr = selectedDate ? format(selectedDate, 'PPP', { locale: de }) : '';

    const message = `
TERMINRESERVIERUNG

Fahrzeugklasse: ${vehicleLabel}

Gewünschte Leistungen:
${serviceDetails}

---
GESCHÄTZTES TOTAL: ${formatPrice(total)}
---

Wunschtermin: ${dateStr}

${formData.notes ? `Anmerkungen:\n${formData.notes}` : ''}
    `.trim();

    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: message,
        },
      });

      if (error) throw error;

      toast({
        title: 'Terminanfrage erfolgreich versendet!',
        description: 'Wir haben Ihre Reservierung erhalten und melden uns schnellstmöglich bei Ihnen.',
      });

      // Reset form
      setStep(1);
      setSelectedVehicle(null);
      setSelectedServices([]);
      setSelectedDate(undefined);
      setFormData({ name: '', email: '', phone: '', notes: '' });
    } catch (error) {
      console.error('Error sending booking:', error);
      toast({
        title: 'Fehler beim Versenden',
        description: 'Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt per Telefon.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
              step === s
                ? "bg-primary text-primary-foreground shadow-glow"
                : step > s
                ? "bg-primary/20 text-primary"
                : "bg-secondary text-muted-foreground"
            )}
          >
            {step > s ? <Check className="w-5 h-5" /> : s}
          </div>
          {s < 4 && (
            <div
              className={cn(
                "w-12 h-1 mx-1 rounded",
                step > s ? "bg-primary" : "bg-secondary"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="animate-fade-up">
      <h2 className="text-2xl font-bold mb-6 text-center">Wähle deine Fahrzeugklasse</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
        {vehicleClasses.map((vc) => (
          <button
            key={vc.id}
            onClick={() => setSelectedVehicle(vc.id)}
            className={cn(
              "p-4 rounded-xl font-medium transition-all duration-300 border-2",
              selectedVehicle === vc.id
                ? "bg-primary text-primary-foreground border-primary shadow-glow"
                : "bg-secondary/50 hover:bg-secondary border-transparent text-foreground"
            )}
          >
            <Car className="w-8 h-8 mx-auto mb-2 opacity-70" />
            {vc.label}
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="animate-fade-up">
      <h2 className="text-2xl font-bold mb-6 text-center">Wähle deine Leistungen</h2>
      <p className="text-muted-foreground text-center mb-6">Du kannst mehrere Leistungen auswählen</p>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {categories.map((category) => {
          const categoryServices = services.filter(s => s.category === category.id);
          return (
            <div key={category.id}>
              <h3 className="text-lg font-semibold mb-3 text-primary">{category.label}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categoryServices.map((service) => {
                  const Icon = service.icon;
                  const isSelected = selectedServices.includes(service.id);
                  const price = getServicePrice(service.id);
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleServiceToggle(service.id)}
                      className={cn(
                        "p-4 rounded-xl font-medium transition-all duration-300 border-2 text-left",
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-glow"
                          : "bg-secondary/50 hover:bg-secondary border-transparent text-foreground"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-6 h-6 flex-shrink-0" />
                        <span className="flex-1">{service.title}</span>
                        {isSelected && <Check className="w-5 h-5" />}
                      </div>
                      <div className={cn(
                        "text-sm mt-2 font-bold",
                        isSelected ? "text-primary-foreground/90" : "text-primary"
                      )}>
                        {formatPrice(price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Total */}
      {selectedServices.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-background/95 backdrop-blur-md border border-primary/50 rounded-full px-6 py-3 shadow-premium animate-scale-in">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">{selectedServices.length} Leistung{selectedServices.length > 1 ? 'en' : ''}</span>
            <span className="text-xl font-bold text-primary">{formatPrice(calculateTotal())}</span>
          </div>
        </div>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="animate-fade-up">
      <h2 className="text-2xl font-bold mb-6 text-center">Wähle deinen Wunschtermin</h2>
      <div className="flex justify-center">
        <div className="card-shine border border-border rounded-xl p-4 inline-block">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date() || date.getDay() === 0}
            locale={de}
            className={cn("p-3 pointer-events-auto")}
          />
        </div>
      </div>
      {selectedDate && (
        <p className="text-center mt-4 text-lg">
          <CalendarIcon className="w-5 h-5 inline mr-2" />
          Ausgewählt: <strong>{format(selectedDate, 'PPP', { locale: de })}</strong>
        </p>
      )}
    </div>
  );

  const renderStep4 = () => (
    <div className="animate-fade-up max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Deine Kontaktdaten</h2>
      
      {/* Summary */}
      <div className="card-shine border border-border rounded-xl p-4 mb-6">
        <h3 className="font-semibold mb-3">Zusammenfassung</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Fahrzeug:</span>
            <span className="font-medium">{vehicleClasses.find(v => v.id === selectedVehicle)?.label}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Termin:</span>
            <span className="font-medium">{selectedDate && format(selectedDate, 'PPP', { locale: de })}</span>
          </div>
          
          <div className="border-t border-border pt-3 mt-3">
            <p className="text-muted-foreground mb-2">Leistungen:</p>
            <div className="space-y-1">
              {selectedServices.map(id => {
                const service = services.find(s => s.id === id);
                const price = getServicePrice(id);
                return (
                  <div key={id} className="flex justify-between">
                    <span>{service?.title}</span>
                    <span className="font-medium">{formatPrice(price)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-primary/30 pt-3 mt-3 bg-primary/5 -mx-4 px-4 py-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Geschätztes Total:</span>
              <span className="text-2xl font-bold text-primary">{formatPrice(calculateTotal())}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">* Endpreis kann je nach Zustand variieren</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2"
            placeholder="Dein Name"
          />
        </div>

        <div>
          <Label htmlFor="email">E-Mail *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2"
            placeholder="deine.email@beispiel.ch"
          />
        </div>

        <div>
          <Label htmlFor="phone">Telefon</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="mt-2"
            placeholder="+41 XX XXX XX XX"
          />
        </div>

        <div>
          <Label htmlFor="notes">Anmerkungen</Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="mt-2 min-h-[100px]"
            placeholder="Besondere Wünsche oder Anmerkungen..."
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="mb-4">
              <span className="text-gradient">Termin</span> reservieren
            </h1>
            <p className="text-xl text-muted-foreground">
              In nur 4 Schritten zu deinem Wunschtermin
            </p>
          </div>
        </div>
      </section>

      {/* Booking Flow */}
      <section className="py-8 pb-16 bg-background">
        <div className="container mx-auto px-4">
          {renderStepIndicator()}

          <div className="min-h-[400px]">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                className="px-8"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Zurück
              </Button>
            )}
            
            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="px-8 bg-primary hover:bg-primary/90"
              >
                Weiter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="px-8 bg-primary hover:bg-primary/90"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Wird gesendet...' : 'Termin anfragen'}
              </Button>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Booking;
