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

const vehicleClasses: { id: VehicleClass; label: string }[] = [
  { id: 'kleinwagen', label: 'Kleinwagen' },
  { id: 'limousine', label: 'Limousine' },
  { id: 'coupe', label: 'Coupé' },
  { id: 'cabrio', label: 'Cabrio' },
  { id: 'kombi', label: 'Kombi' },
  { id: 'suv', label: 'SUV' },
  { id: 'pickup', label: 'Pickup' },
  { id: 'minivan', label: 'Minivan' },
  { id: 'bus', label: 'Bus' },
];

const services = [
  // Komplettpakete
  { id: 'komplett-deluxe', title: 'Komplett Deluxe', category: 'komplett', icon: Crown },
  { id: 'komplett-premium', title: 'Komplett Premium', category: 'komplett', icon: PackageCheck },
  { id: 'komplett-basic', title: 'Komplett Basic', category: 'komplett', icon: Package },
  // Aussenpflege
  { id: 'aussen-standard', title: 'Aussenpflege Standard', category: 'aussen', icon: Droplets },
  // Innenreinigung
  { id: 'innen-premium', title: 'Innen Premium', category: 'innen', icon: Sparkles },
  { id: 'innen-basic', title: 'Innen Basic', category: 'innen', icon: Car },
  // Politur
  { id: 'politur-dreistufig', title: 'Dreistufige Politur', category: 'politur', icon: Zap },
  { id: 'politur-zweistufig', title: 'Zweistufige Politur', category: 'politur', icon: Lightbulb },
  { id: 'politur-einstufig', title: 'Einstufige Politur', category: 'politur', icon: Sparkles },
  // Versiegelung
  { id: 'keramik-3jahre', title: 'Keramikversiegelung (3 Jahre)', category: 'versiegelung', icon: Shield },
  { id: 'keramik-1jahr', title: 'Keramikversiegelung (1 Jahr)', category: 'versiegelung', icon: Shield },
  { id: 'felgenversiegelung', title: 'Felgenversiegelung', category: 'versiegelung', icon: Wrench },
  // Zusatz
  { id: 'motorraumreinigung', title: 'Motorraumreinigung', category: 'zusatz', icon: Wrench },
  { id: 'tierhaarentfernung', title: 'Tierhaarentfernung', category: 'zusatz', icon: Dog },
  { id: 'cabrioverdeck', title: 'Cabrioverdeck-Reinigung', category: 'zusatz', icon: Wind },
  { id: 'scheinwerfer', title: 'Scheinwerfer-Aufbereitung', category: 'zusatz', icon: Sun },
];

const categories = [
  { id: 'komplett', label: 'Komplettpakete' },
  { id: 'aussen', label: 'Aussenpflege' },
  { id: 'innen', label: 'Innenreinigung' },
  { id: 'politur', label: 'Politur' },
  { id: 'versiegelung', label: 'Versiegelung' },
  { id: 'zusatz', label: 'Zusatzleistungen' },
];

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
    const serviceLabels = selectedServices.map(id => 
      services.find(s => s.id === id)?.title || id
    ).join(', ');
    const dateStr = selectedDate ? format(selectedDate, 'PPP', { locale: de }) : '';

    const message = `
TERMINRESERVIERUNG

Fahrzeugklasse: ${vehicleLabel}

Gewünschte Leistungen:
${serviceLabels}

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
                  return (
                    <button
                      key={service.id}
                      onClick={() => handleServiceToggle(service.id)}
                      className={cn(
                        "p-4 rounded-xl font-medium transition-all duration-300 border-2 text-left flex items-center gap-3",
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-glow"
                          : "bg-secondary/50 hover:bg-secondary border-transparent text-foreground"
                      )}
                    >
                      <Icon className="w-6 h-6 flex-shrink-0" />
                      <span>{service.title}</span>
                      {isSelected && <Check className="w-5 h-5 ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
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
        <div className="space-y-2 text-sm">
          <p><strong>Fahrzeug:</strong> {vehicleClasses.find(v => v.id === selectedVehicle)?.label}</p>
          <p><strong>Leistungen:</strong> {selectedServices.map(id => services.find(s => s.id === id)?.title).join(', ')}</p>
          <p><strong>Termin:</strong> {selectedDate && format(selectedDate, 'PPP', { locale: de })}</p>
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
