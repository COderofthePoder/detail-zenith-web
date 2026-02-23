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
import { ArrowRight, ArrowLeft, Check, Send, Calendar as CalendarIcon, Tag, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

import VehicleSelection, { VehicleClass, vehicleClasses } from '@/components/booking/VehicleSelection';
import InteriorSelection, { interiorExtras } from '@/components/booking/InteriorSelection';
import ExteriorSelection, { exteriorExtras } from '@/components/booking/ExteriorSelection';
import {
  interiorDetailPrices,
  exteriorDetailPrices,
  getExactPrice,
} from '@/lib/prices';

const formatPrice = (price: number): string => {
  return `CHF ${price.toLocaleString('de-CH')}`; 
};

const Booking = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  
  // Step 1: Vehicle
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleClass | null>(null);
  
  // Step 2: Interior
  const [noInterior, setNoInterior] = useState(false);
  const [interiorDetail, setInteriorDetail] = useState(false);
  const [interiorQuantities, setInteriorQuantities] = useState<Record<string, number>>({});
  
  // Step 3: Exterior
  const [noExterior, setNoExterior] = useState(false);
  const [exteriorDetail, setExteriorDetail] = useState(false);
  const [exteriorQuantities, setExteriorQuantities] = useState<Record<string, number>>({});
  
  // Step 4: Date
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  
  // Step 5: Creator Code + Contact
  const [creatorCode, setCreatorCode] = useState('');
  const [validatedCode, setValidatedCode] = useState<{ id: string; code: string; discount_percentage: number; creator_name: string } | null>(null);
  const [codeError, setCodeError] = useState('');
  const [codeLoading, setCodeLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCabrio = selectedVehicle?.includes('cabrio');

  const getItemPrice = (priceTable: Record<VehicleClass, number> | number): number => {
    if (!selectedVehicle) return 0;
    return getExactPrice(priceTable, selectedVehicle);
  };

  // Calculate total price
  const calculateTotal = () => {
    let total = 0;

    // Interior Detail base price
    if (interiorDetail && selectedVehicle) {
      total += getExactPrice(interiorDetailPrices, selectedVehicle);
    }

    // Interior extras
    interiorExtras.forEach(extra => {
      const qty = interiorQuantities[extra.id] || 0;
      total += getItemPrice(extra.priceTable) * qty;
    });

    // Exterior Detail base price
    if (exteriorDetail && selectedVehicle) {
      total += getExactPrice(exteriorDetailPrices, selectedVehicle);
    }

    // Exterior extras
    exteriorExtras.forEach(extra => {
      if (extra.cabrioOnly && !isCabrio) return;
      const qty = exteriorQuantities[extra.id] || 0;
      total += getItemPrice(extra.priceTable) * qty;
    });

    return total;
  };

  const handleInteriorQuantityChange = (id: string, quantity: number) => {
    setInteriorQuantities(prev => ({ ...prev, [id]: quantity }));
  };

  const handleExteriorQuantityChange = (id: string, quantity: number) => {
    setExteriorQuantities(prev => ({ ...prev, [id]: quantity }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidateCode = async () => {
    const code = creatorCode.trim().toUpperCase();
    if (!code) return;
    setCodeLoading(true);
    setCodeError('');
    setValidatedCode(null);

    const { data, error } = await supabase
      .from('creator_codes')
      .select('id, code, discount_percentage, creator_name')
      .eq('code', code)
      .eq('is_active', true)
      .maybeSingle();

    if (error || !data) {
      setCodeError('Ungültiger oder abgelaufener Code.');
    } else {
      setValidatedCode(data);
    }
    setCodeLoading(false);
  };

  const handleRemoveCode = () => {
    setValidatedCode(null);
    setCreatorCode('');
    setCodeError('');
  };

  const discountAmount = validatedCode
    ? Math.round(calculateTotal() * validatedCode.discount_percentage / 100)
    : 0;

  const finalTotal = calculateTotal() - discountAmount;

  const canProceed = () => {
    switch (step) {
      case 1:
        return selectedVehicle !== null;
      case 2:
        return true;
      case 3:
        return true;
      case 4:
        return selectedDate !== undefined;
      case 5:
        return formData.name && formData.email;
      default:
        return false;
    }
  };

  const buildServiceSummary = () => {
    const lines: string[] = [];
    
    // Interior
    if (noInterior) {
      lines.push('Innenreinigung: Keine');
    } else {
      if (interiorDetail && selectedVehicle) {
        lines.push(`- Interior Detail: ${formatPrice(getExactPrice(interiorDetailPrices, selectedVehicle))}`);
      }
      interiorExtras.forEach(extra => {
        const qty = interiorQuantities[extra.id] || 0;
        if (qty > 0) {
          const unitPrice = selectedVehicle ? getExactPrice(extra.priceTable, selectedVehicle) : 0;
          lines.push(`- ${extra.title}${qty > 1 ? ` (${qty}x)` : ''}: ${formatPrice(unitPrice * qty)}`);
        }
      });
    }
    
    lines.push('');
    
    // Exterior
    if (noExterior) {
      lines.push('Aussenreinigung: Keine');
    } else {
      if (exteriorDetail && selectedVehicle) {
        lines.push(`- Exterior Detail: ${formatPrice(getExactPrice(exteriorDetailPrices, selectedVehicle))}`);
      }
      exteriorExtras.forEach(extra => {
        if (extra.cabrioOnly && !isCabrio) return;
        const qty = exteriorQuantities[extra.id] || 0;
        if (qty > 0) {
          const unitPrice = selectedVehicle ? getExactPrice(extra.priceTable, selectedVehicle) : 0;
          lines.push(`- ${extra.title}: ${formatPrice(unitPrice * qty)}`);
        }
      });
    }
    
    return lines.join('\n');
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    
    setIsSubmitting(true);

    const vehicleLabel = vehicleClasses.find(v => v.id === selectedVehicle)?.label || '';
    const total = calculateTotal();
    const dateStr = selectedDate ? format(selectedDate, 'PPP', { locale: de }) : '';

    const codeInfo = validatedCode
      ? `\nCreator Code: ${validatedCode.code} (-${validatedCode.discount_percentage}%)\nRabatt: -${formatPrice(discountAmount)}\nTotal nach Rabatt: ${formatPrice(finalTotal)}`
      : '';

    const message = `
TERMINRESERVIERUNG

Fahrzeugklasse: ${vehicleLabel}

Gewünschte Leistungen:
${buildServiceSummary()}

---
GESCHÄTZTES TOTAL: ${formatPrice(total)}${codeInfo}
---

Wunschtermin: ${dateStr}

${formData.notes ? `Anmerkungen:\n${formData.notes}` : ''}
    `.trim();

    try {
      const { error, data } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: message,
        },
      });

      console.log('send-contact-email response:', { error, data });
      if (error) throw error;

      // Track creator code usage
      if (validatedCode) {
        await supabase.from('code_usages').insert({
          code_id: validatedCode.id,
          booking_total: total,
          discount_amount: discountAmount,
        });
      }

      // Sync to Google Calendar
      try {
        const y = selectedDate!.getFullYear();
        const m = String(selectedDate!.getMonth() + 1).padStart(2, '0');
        const d = String(selectedDate!.getDate()).padStart(2, '0');
        const dateStr = `${y}-${m}-${d}`;
        await supabase.functions.invoke('create-calendar-event', {
          body: {
            summary: `DS-Detailing: ${vehicleLabel} – ${formData.name}`,
            description: buildServiceSummary() + (validatedCode ? `\n\nCreator Code: ${validatedCode.code} (-${validatedCode.discount_percentage}%)\nTotal: ${formatPrice(finalTotal)}` : `\n\nTotal: ${formatPrice(total)}`),
            date: dateStr,
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
          },
        });
      } catch (calError) {
        console.error('Calendar sync failed (non-blocking):', calError);
      }

      toast({
        title: 'Terminanfrage erfolgreich versendet!',
        description: 'Wir haben Ihre Reservierung erhalten und melden uns schnellstmöglich bei Ihnen.',
      });

      // Reset form
      setStep(1);
      setSelectedVehicle(null);
      setNoInterior(false);
      setInteriorDetail(false);
      setInteriorQuantities({});
      setNoExterior(false);
      setExteriorDetail(false);
      setExteriorQuantities({});
      setSelectedDate(undefined);
      setFormData({ name: '', email: '', phone: '', notes: '' });
      setCreatorCode('');
      setValidatedCode(null);
      setCodeError('');
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
    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8 px-4">
      {[1, 2, 3, 4, 5].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={cn(
              "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold transition-all text-sm sm:text-base",
              step === s
                ? "bg-primary text-primary-foreground shadow-glow"
                : step > s
                ? "bg-primary/20 text-primary"
                : "bg-secondary text-muted-foreground"
            )}
          >
            {step > s ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : s}
          </div>
          {s < 5 && (
            <div
              className={cn(
                "w-6 sm:w-12 h-1 mx-0.5 sm:mx-1 rounded",
                step > s ? "bg-primary" : "bg-secondary"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep4 = () => (
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

  const renderStep5 = () => {
    const total = calculateTotal();
    
    return (
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
              <p className="text-muted-foreground mb-2 font-semibold">Innenreinigung:</p>
              {noInterior ? (
                <p className="text-muted-foreground italic">Keine Innenreinigung</p>
              ) : (
                <div className="space-y-1 ml-2">
                  {interiorDetail && selectedVehicle && (
                    <div className="flex justify-between">
                      <span>Interior Detail</span>
                      <span className="font-medium">{formatPrice(getExactPrice(interiorDetailPrices, selectedVehicle))}</span>
                    </div>
                  )}
                  {interiorExtras.map(extra => {
                    const qty = interiorQuantities[extra.id] || 0;
                    if (qty === 0) return null;
                    const unitPrice = selectedVehicle ? getExactPrice(extra.priceTable, selectedVehicle) : 0;
                    return (
                      <div key={extra.id} className="flex justify-between">
                        <span>{extra.title}{qty > 1 ? ` (${qty}x)` : ''}</span>
                        <span className="font-medium">{formatPrice(unitPrice * qty)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="border-t border-border pt-3 mt-3">
              <p className="text-muted-foreground mb-2 font-semibold">Aussenreinigung:</p>
              {noExterior ? (
                <p className="text-muted-foreground italic">Keine Aussenreinigung</p>
              ) : (
                <div className="space-y-1 ml-2">
                  {exteriorDetail && selectedVehicle && (
                    <div className="flex justify-between">
                      <span>Exterior Detail</span>
                      <span className="font-medium">{formatPrice(getExactPrice(exteriorDetailPrices, selectedVehicle))}</span>
                    </div>
                  )}
                  {exteriorExtras.map(extra => {
                    if (extra.cabrioOnly && !isCabrio) return null;
                    const qty = exteriorQuantities[extra.id] || 0;
                    if (qty === 0) return null;
                    const unitPrice = selectedVehicle ? getExactPrice(extra.priceTable, selectedVehicle) : 0;
                    return (
                      <div key={extra.id} className="flex justify-between">
                        <span>{extra.title}</span>
                        <span className="font-medium">{formatPrice(unitPrice * qty)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Creator Code Input */}
            <div className="border-t border-border pt-3 mt-3">
              <p className="text-muted-foreground mb-2 font-semibold flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Creator Code (optional)
              </p>
              {validatedCode ? (
                <div className="flex items-center justify-between bg-primary/10 rounded-lg px-3 py-2">
                  <div>
                    <span className="font-mono font-bold text-primary">{validatedCode.code}</span>
                    <span className="text-sm text-muted-foreground ml-2">-{validatedCode.discount_percentage}%</span>
                  </div>
                  <button onClick={handleRemoveCode} className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    value={creatorCode}
                    onChange={(e) => { setCreatorCode(e.target.value.toUpperCase()); setCodeError(''); }}
                    placeholder="Code eingeben"
                    className="font-mono uppercase"
                    onKeyDown={(e) => e.key === 'Enter' && handleValidateCode()}
                  />
                  <Button type="button" variant="outline" size="sm" onClick={handleValidateCode} disabled={codeLoading || !creatorCode.trim()}>
                    {codeLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Einlösen'}
                  </Button>
                </div>
              )}
              {codeError && <p className="text-sm text-destructive mt-1">{codeError}</p>}
            </div>

            <div className="border-t border-primary/30 pt-3 mt-3 bg-primary/5 -mx-4 px-4 py-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Zwischensumme:</span>
                <span className={cn("text-xl font-bold", validatedCode ? "line-through text-muted-foreground" : "text-primary")}>{formatPrice(total)}</span>
              </div>
              {validatedCode && (
                <>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-muted-foreground">Rabatt ({validatedCode.code}, -{validatedCode.discount_percentage}%)</span>
                    <span className="text-sm font-medium text-primary">-{formatPrice(discountAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 border-t border-primary/20 pt-2">
                    <span className="text-lg font-semibold">Total nach Rabatt:</span>
                    <span className="text-2xl font-bold text-primary">{formatPrice(finalTotal)}</span>
                  </div>
                </>
              )}
              {!validatedCode && (
                <div className="flex justify-between items-center">
                  <span className="sr-only">total</span>
                </div>
              )}
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
  };

  const total = calculateTotal();

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
              In nur 5 Schritten zu deinem Wunschtermin
            </p>
          </div>
        </div>
      </section>

      {/* Booking Flow */}
      <section className="py-8 pb-32 bg-background">
        <div className="container mx-auto px-4">
          {renderStepIndicator()}

          <div className="min-h-[400px]">
            {step === 1 && (
              <VehicleSelection 
                selectedVehicle={selectedVehicle} 
                onSelect={setSelectedVehicle} 
              />
            )}
            {step === 2 && (
              <InteriorSelection
                selectedVehicle={selectedVehicle}
                noInterior={noInterior}
                onNoInteriorChange={setNoInterior}
                interiorDetail={interiorDetail}
                onInteriorDetailChange={setInteriorDetail}
                quantities={interiorQuantities}
                onQuantityChange={handleInteriorQuantityChange}
              />
            )}
            {step === 3 && (
              <ExteriorSelection
                selectedVehicle={selectedVehicle}
                noExterior={noExterior}
                onNoExteriorChange={setNoExterior}
                exteriorDetail={exteriorDetail}
                onExteriorDetailChange={setExteriorDetail}
                quantities={exteriorQuantities}
                onQuantityChange={handleExteriorQuantityChange}
              />
            )}
            {step === 4 && renderStep4()}
            {step === 5 && renderStep5()}
          </div>

          {/* Floating Total */}
          {total > 0 && step < 5 && (
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 bg-background/95 backdrop-blur-md border border-primary/50 rounded-full px-6 py-3 shadow-premium animate-scale-in">
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground">Zwischensumme</span>
                <span className="text-xl font-bold text-primary">{formatPrice(total)}</span>
              </div>
            </div>
          )}

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
            
            {step < 5 ? (
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
