import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import before1 from '@/assets/before-1.jpg';
import after1 from '@/assets/after-1.jpg';
import before2 from '@/assets/before-2.jpg';
import after2 from '@/assets/after-2.jpg';
import before3 from '@/assets/before-3.jpg';
import after3 from '@/assets/after-3.jpg';
import before4 from '@/assets/before-4.jpg';
import after4 from '@/assets/after-4.jpg';
import before5 from '@/assets/before-5.jpg';
import after5 from '@/assets/after-5.jpg';
import before6 from '@/assets/before-6.jpg';
import after6 from '@/assets/after-6.jpg';
import before7 from '@/assets/before-7.jpg';
import after7 from '@/assets/after-7.jpg';
import before8 from '@/assets/before-8.jpg';
import after8 from '@/assets/after-8.jpg';
import before9 from '@/assets/before-9.jpg';
import after9 from '@/assets/after-9.jpg';
import workshopImage from '@/assets/workshop.jpg';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const Gallery = () => {
  const [selectedService, setSelectedService] = useState<string>('Alle');

  const services = [
    'Alle',
    'Aussenreinigung',
    'Innenreinigung',
    'Politur & Lackkorrektur',
    'Keramikversiegelung',
    'Felgenreinigung',
    'Fahrzeugaufbereitung',
    'Window Tinting',
    'Leder/Alcantara/Polster',
    'Lenkradaufbereitung',
    'MFK-Vorbereitung',
  ];

  const beforeAfterPairs = [
    {
      before: before1,
      after: after1,
      alt: 'Aussenreinigung - Lackaufbereitung',
      service: 'Aussenreinigung',
    },
    {
      before: before2,
      after: after2,
      alt: 'Innenreinigung - Komplette Aufbereitung',
      service: 'Innenreinigung',
    },
    {
      before: before3,
      after: after3,
      alt: 'Felgenreinigung - Bremsstaub-Entfernung',
      service: 'Felgenreinigung',
    },
    {
      before: before4,
      after: after4,
      alt: 'Politur & Lackkorrektur - Kratzerentfernung',
      service: 'Politur & Lackkorrektur',
    },
    {
      before: before5,
      after: after5,
      alt: 'Keramikversiegelung - Lack-Versiegelung',
      service: 'Keramikversiegelung',
    },
    {
      before: before6,
      after: after6,
      alt: 'Innenreinigung - Teppichreinigung',
      service: 'Innenreinigung',
    },
    {
      before: before7,
      after: after7,
      alt: 'Innenreinigung - Armaturenbrett-Aufbereitung',
      service: 'Innenreinigung',
    },
    {
      before: before8,
      after: after8,
      alt: 'Lenkradaufbereitung - Leder-Auffrischung',
      service: 'Lenkradaufbereitung',
    },
    {
      before: before9,
      after: after9,
      alt: 'MFK-Vorbereitung - Motorwäsche',
      service: 'MFK-Vorbereitung',
    },
  ];

  const filteredPairs = selectedService === 'Alle' 
    ? beforeAfterPairs 
    : beforeAfterPairs.filter(pair => pair.service === selectedService);

  // Placeholder images for masonry grid
  const galleryImages = [
    { src: workshopImage, alt: 'Unsere moderne Werkstatt' },
    { src: gallery1, alt: 'Felgenpflege und Keramikversiegelung' },
    { src: gallery2, alt: 'Professionelle Lackpolitur' },
    { src: gallery3, alt: 'Erstklassige Lederaufbereitung' },
    { src: after1, alt: 'Perfekt aufbereiteter Lack' },
    { src: after2, alt: 'Makellose Innenraumaufbereitung' },
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
              Unsere <span className="text-gradient">Referenzen</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Sehen Sie selbst, wie wir Fahrzeuge zu neuem Glanz verhelfen – 
              Perfektion, die man sehen und fühlen kann
            </p>
          </div>
        </div>
      </section>

      {/* Before/After Carousel with Filters */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="mb-4">Vorher / Nachher</h2>
              <p className="text-muted-foreground mb-8">
                Ziehen Sie den Regler, um den Unterschied zu sehen
              </p>
            </div>

            {/* Service Filter Buttons */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {services.map((service) => (
                <Button
                  key={service}
                  variant={selectedService === service ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedService(service)}
                  className="transition-all duration-300"
                >
                  {service}
                </Button>
              ))}
            </div>

            {/* Selected Service Title */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gradient">
                {selectedService === 'Alle' ? 'Alle Leistungen' : selectedService}
              </h3>
            </div>

            {/* Carousel */}
            {filteredPairs.length > 0 ? (
              filteredPairs.length <= 2 ? (
                // Zentrierte Anzeige für 1-2 Bilder
                <div className="flex justify-center gap-4 flex-wrap max-w-4xl mx-auto">
                  {filteredPairs.map((pair, index) => (
                    <div key={index} className="w-full md:w-[calc(50%-0.5rem)] max-w-xl">
                      <BeforeAfterSlider
                        beforeImage={pair.before}
                        afterImage={pair.after}
                        alt={pair.alt}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                // Carousel für 3+ Bilder
                <Carousel
                  opts={{
                    align: 'start',
                    loop: true,
                  }}
                  className="w-full max-w-6xl mx-auto"
                >
                  <CarouselContent>
                    {filteredPairs.map((pair, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-2">
                          <BeforeAfterSlider
                            beforeImage={pair.before}
                            afterImage={pair.after}
                            alt={pair.alt}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex" />
                  <CarouselNext className="hidden md:flex" />
                </Carousel>
              )
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Keine Referenzen für diese Leistung verfügbar
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="mb-4">Impressionen</h2>
            <p className="text-muted-foreground">
              Einblicke in unsere Arbeit und unsere Werkstatt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg aspect-square group animate-fade-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-foreground text-sm font-medium px-4 text-center">
                    {image.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Instagram className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="mb-4">Folgen Sie uns auf Instagram</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Entdecken Sie noch mehr Referenzen und bleiben Sie auf dem Laufenden
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-foreground/20 hover:bg-foreground/10"
            >
              <a
                href="https://instagram.com/ds_detailin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5 mr-2" />
                @ds_detailin
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-6">Bereit für diesen Glanz?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Lassen Sie uns auch Ihr Fahrzeug in Perfektion erstrahlen
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
              <Link to="/kontakt">Jetzt Termin vereinbaren</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Gallery;
