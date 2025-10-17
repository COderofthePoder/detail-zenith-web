import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
      });

      if (error) throw error;

      toast({
        title: 'Nachricht erfolgreich versendet!',
        description: 'Wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich bei Ihnen.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: 'Fehler beim Versenden',
        description: 'Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt per Telefon.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="mb-6">
              <span className="text-gradient">Kontakt</span> aufnehmen
            </h1>
            <p className="text-xl text-muted-foreground">
              Wir freuen uns auf Ihre Anfrage und beraten Sie gerne persönlich
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="animate-fade-up">
                <div className="card-shine border border-border rounded-lg p-8">
                  <h2 className="text-2xl font-bold mb-6">Nachricht senden</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-2"
                        placeholder="Ihr Name"
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
                        placeholder="ihre.email@beispiel.ch"
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
                      <Label htmlFor="message">Ihre Nachricht *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="mt-2 min-h-[150px]"
                        placeholder="Beschreiben Sie Ihr Anliegen..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                      disabled={isSubmitting}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? 'Wird gesendet...' : 'Nachricht senden'}
                    </Button>
                  </form>
                </div>
              </div>

              {/* Contact Info */}
              <div className="animate-fade-up" style={{ animationDelay: '120ms' }}>
                <div className="space-y-8">
                  {/* Phone & WhatsApp */}
                  <div className="card-shine border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Telefon & WhatsApp</h3>
                        <div className="space-y-2">
                          <a
                            href="tel:+41765493697"
                            className="text-muted-foreground hover:text-primary transition-colors block"
                          >
                            +41 76 549 36 97
                          </a>
                          <a
                            href="tel:+41792610998"
                            className="text-muted-foreground hover:text-primary transition-colors block"
                          >
                            +41 79 261 09 98
                          </a>
                          <a 
                            href="https://api.whatsapp.com/send/?phone=41792610998&text&type=phone_number&app_absent=0" 
                            target="_blank" 
                            rel="noopener"
                            className="text-primary hover:text-primary/80 text-sm pt-2 inline-block transition-colors"
                          >
                            Chat auf WhatsApp öffnen
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="card-shine border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">E-Mail</h3>
                        <a
                          href="mailto:ds.detailing@hotmail.com"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          ds.detailing@hotmail.com
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Opening Hours */}
                  <div className="card-shine border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Öffnungszeiten</h3>
                        <p className="text-muted-foreground text-sm">
                          Montag – Samstag: 08:00–18:00
                        </p>
                        <p className="text-muted-foreground text-sm">Sonntag: Geschlossen</p>
                        <p className="text-primary text-sm mt-2">
                          Termine nach Vereinbarung
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="card-shine border border-border rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-3">Hauptsitz</h3>
                        <p className="text-muted-foreground text-sm">
                          Willikonerstrasse 78<br />8618 Oetwil am See
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center mb-8">So finden Sie uns</h2>
            <div className="rounded-lg overflow-hidden shadow-premium">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2701.7!2d8.7!3d47.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDE4JzAwLjAiTiA4wrA0MicwMC4wIkU!5e0!3m2!1sde!2sch!4v1234567890"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DS-Detailing Standort"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
