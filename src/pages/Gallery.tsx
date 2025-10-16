import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';
import amgLenkradVorher from '@/assets/AMG_Lenkrad_Vorher.jpeg';
import amgLenkradNachher from '@/assets/AMG_Lenkrad_Nachher.jpeg';
import amgLenkradVorher2 from '@/assets/AMG_Lenkrad_Vorher2.jpeg';
import amgLenkradNachher2 from '@/assets/AMG_Lenkrad_Nachher2.jpeg';
import bmwLenkradVorher from '@/assets/BMW_Lenkrad_Vorher.jpeg';
import bmwLenkradNachher from '@/assets/BMW_Lenkrad_Nachher.jpeg';
import vorher2 from '@/assets/Vorher_2.jpeg';
import nachher2 from '@/assets/Nachher_2.jpeg';
import innenVorher from '@/assets/Innen_Vorher.jpeg';
import innenFertig from '@/assets/Innen_Fertig.jpeg';
import workshopImage from '@/assets/workshop.jpg';
import amgFertig from '@/assets/AMG_Fertig.jpeg';
import urusHuracan from '@/assets/Urus_Huracan.jpg';
import lamboFertig from '@/assets/Lambo_Fertig.jpeg';
import bmwInnenFertig from '@/assets/BMW_Innen_Fertig_New.jpeg';
import clsFertig from '@/assets/CLS_Fertig_New.jpeg';
import clsFertig2 from '@/assets/CLS_Fertig2_New.jpeg';
import lamboFertigInnen from '@/assets/Lambo_Fertig_Innen_New.jpeg';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Instagram, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedBeforeAfter, setSelectedBeforeAfter] = useState<{before: string, after: string, alt: string} | null>(null);
  const [isBeforeAfterLightboxOpen, setIsBeforeAfterLightboxOpen] = useState(false);

  const beforeAfterPairs = [
    {
      before: amgLenkradVorher,
      after: amgLenkradNachher,
      alt: 'AMG Lenkradaufbereitung',
    },
    {
      before: amgLenkradVorher2,
      after: amgLenkradNachher2,
      alt: 'AMG Lenkradaufbereitung Detail',
    },
    {
      before: bmwLenkradVorher,
      after: bmwLenkradNachher,
      alt: 'BMW Lenkradaufbereitung',
    },
    {
      before: vorher2,
      after: nachher2,
      alt: 'Komplettaufbereitung',
    },
    {
      before: innenVorher,
      after: innenFertig,
      alt: 'Innenraumaufbereitung',
    },
  ];

  const handleBeforeAfterClick = (pair: {before: string, after: string, alt: string}) => {
    setSelectedBeforeAfter(pair);
    setIsBeforeAfterLightboxOpen(true);
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? galleryImages.length - 1 : (prev ?? 0) - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => ((prev ?? 0) + 1) % galleryImages.length);
  };

  // Placeholder images for masonry grid
  const galleryImages = [
    { src: amgFertig, alt: 'Mercedes AMG - Perfekte Aufbereitung' },
    { src: urusHuracan, alt: 'Lamborghini Urus & Huracan - Luxus Sportwagen' },
    { src: lamboFertig, alt: 'Lamborghini - Professionelle Fahrzeugaufbereitung' },
    { src: workshopImage, alt: 'Unsere moderne Werkstatt' },
    { src: bmwInnenFertig, alt: 'BMW Innenraumaufbereitung - Perfekte Sauberkeit' },
    { src: clsFertig, alt: 'Mercedes CLS - Hochglanzaufbereitung' },
    { src: clsFertig2, alt: 'Mercedes CLS - Premium Detailing' },
    { src: lamboFertigInnen, alt: 'Lamborghini Innenraum - Luxus Detailing' },
  ];

  return (
    <>
      <Navigation />
      <StickyCTA />

      {/* Hero Section */}
      <section className="pt-32 pb-8 bg-background">
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

      {/* Before/After Slider */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="mb-6 text-4xl md:text-5xl">Vorher / Nachher</h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Ziehen Sie den Regler, um den Unterschied zu sehen. Klicken Sie auf ein Bild, um es zu vergrößern.
              </p>
            </div>

            {/* Carousel Slider */}
            <Carousel
              opts={{
                align: 'start',
                loop: true,
                watchDrag: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-6">
                {beforeAfterPairs.map((pair, index) => (
                  <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/3">
                    <div 
                      className="cursor-pointer transition-all duration-300 hover:scale-[1.02] animate-fade-up"
                      style={{ animationDelay: `${(index % 3) * 100}ms` }}
                      onClick={() => handleBeforeAfterClick(pair)}
                    >
                      <BeforeAfterSlider
                        beforeImage={pair.before}
                        afterImage={pair.after}
                        alt={pair.alt}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 -translate-x-14 h-14 w-14 bg-background/95 hover:bg-background border-2 border-primary/20 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl" />
              <CarouselNext className="right-0 translate-x-14 h-14 w-14 bg-background/95 hover:bg-background border-2 border-primary/20 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Gallery Grid - Diagonal Scroll Animation */}
      <section className="py-20 bg-secondary overflow-hidden relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Impressionen</h2>
            <p className="text-muted-foreground">
              Einblicke in unsere Arbeit und unsere Werkstatt
            </p>
          </div>

          <div className="max-w-7xl mx-auto relative" style={{ minHeight: '2000px' }}>
            {/* Image 1 - From Top Left */}
            <div
              className="absolute left-0 top-0 w-[45%] md:w-[35%] animate-fade-up opacity-0"
              style={{ 
                animationDelay: '0ms',
                animationFillMode: 'forwards',
                transform: 'translateY(-100px) rotate(-8deg)'
              }}
              onClick={() => handleImageClick(0)}
            >
              <div className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-2xl hover:shadow-primary/20 transition-all duration-700 hover:scale-105 hover:rotate-0">
                <img
                  src={galleryImages[0].src}
                  alt={galleryImages[0].alt}
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-foreground text-sm font-bold bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {galleryImages[0].alt}
                  </p>
                </div>
              </div>
            </div>

            {/* Image 2 - From Bottom Right */}
            <div
              className="absolute right-0 top-32 md:top-20 w-[48%] md:w-[38%] animate-fade-up opacity-0"
              style={{ 
                animationDelay: '200ms',
                animationFillMode: 'forwards',
                transform: 'translateY(100px) rotate(6deg)'
              }}
              onClick={() => handleImageClick(1)}
            >
              <div className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-2xl hover:shadow-primary/20 transition-all duration-700 hover:scale-105 hover:rotate-0">
                <img
                  src={galleryImages[1].src}
                  alt={galleryImages[1].alt}
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-primary/40 via-transparent to-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-foreground text-sm font-bold bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {galleryImages[1].alt}
                  </p>
                </div>
              </div>
            </div>

            {/* Image 3 - From Top Center-Left */}
            <div
              className="absolute left-[8%] md:left-[15%] top-80 md:top-64 w-[42%] md:w-[32%] animate-fade-up opacity-0"
              style={{ 
                animationDelay: '400ms',
                animationFillMode: 'forwards',
                transform: 'translateY(-100px) rotate(-5deg)'
              }}
              onClick={() => handleImageClick(2)}
            >
              <div className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-2xl hover:shadow-primary/20 transition-all duration-700 hover:scale-105 hover:rotate-0">
                <img
                  src={galleryImages[2].src}
                  alt={galleryImages[2].alt}
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-foreground text-sm font-bold bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {galleryImages[2].alt}
                  </p>
                </div>
              </div>
            </div>

            {/* Image 4 - From Bottom Right */}
            <div
              className="absolute right-[5%] md:right-[10%] top-[500px] md:top-96 w-[50%] md:w-[40%] animate-fade-up opacity-0"
              style={{ 
                animationDelay: '600ms',
                animationFillMode: 'forwards',
                transform: 'translateY(100px) rotate(7deg)'
              }}
              onClick={() => handleImageClick(3)}
            >
              <div className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-2xl hover:shadow-primary/20 transition-all duration-700 hover:scale-105 hover:rotate-0">
                <img
                  src={galleryImages[3].src}
                  alt={galleryImages[3].alt}
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-primary/40 via-transparent to-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-foreground text-sm font-bold bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {galleryImages[3].alt}
                  </p>
                </div>
              </div>
            </div>

            {/* Image 5 - From Top Left */}
            <div
              className="absolute left-[3%] top-[680px] md:top-[550px] w-[46%] md:w-[36%] animate-fade-up opacity-0"
              style={{ 
                animationDelay: '800ms',
                animationFillMode: 'forwards',
                transform: 'translateY(-100px) rotate(-6deg)'
              }}
              onClick={() => handleImageClick(4)}
            >
              <div className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-2xl hover:shadow-primary/20 transition-all duration-700 hover:scale-105 hover:rotate-0">
                <img
                  src={galleryImages[4].src}
                  alt={galleryImages[4].alt}
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-foreground text-sm font-bold bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {galleryImages[4].alt}
                  </p>
                </div>
              </div>
            </div>

            {/* Image 6 - From Bottom Center-Right */}
            <div
              className="absolute right-[8%] md:right-[18%] top-[850px] md:top-[720px] w-[44%] md:w-[34%] animate-fade-up opacity-0"
              style={{ 
                animationDelay: '1000ms',
                animationFillMode: 'forwards',
                transform: 'translateY(100px) rotate(5deg)'
              }}
              onClick={() => handleImageClick(5)}
            >
              <div className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-2xl hover:shadow-primary/20 transition-all duration-700 hover:scale-105 hover:rotate-0">
                <img
                  src={galleryImages[5].src}
                  alt={galleryImages[5].alt}
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-primary/40 via-transparent to-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-foreground text-sm font-bold bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {galleryImages[5].alt}
                  </p>
                </div>
              </div>
            </div>

            {/* Image 7 - From Top Left */}
            <div
              className="absolute left-[10%] md:left-[12%] top-[1050px] md:top-[900px] w-[40%] md:w-[30%] animate-fade-up opacity-0"
              style={{ 
                animationDelay: '1200ms',
                animationFillMode: 'forwards',
                transform: 'translateY(-100px) rotate(-7deg)'
              }}
              onClick={() => handleImageClick(6)}
            >
              <div className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-2xl hover:shadow-primary/20 transition-all duration-700 hover:scale-105 hover:rotate-0">
                <img
                  src={galleryImages[6].src}
                  alt={galleryImages[6].alt}
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-transparent to-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-foreground text-sm font-bold bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {galleryImages[6].alt}
                  </p>
                </div>
              </div>
            </div>

            {/* Image 8 - From Bottom Right */}
            <div
              className="absolute right-[2%] md:right-[8%] top-[1220px] md:top-[1050px] w-[48%] md:w-[38%] animate-fade-up opacity-0"
              style={{ 
                animationDelay: '1400ms',
                animationFillMode: 'forwards',
                transform: 'translateY(100px) rotate(6deg)'
              }}
              onClick={() => handleImageClick(7)}
            >
              <div className="relative overflow-hidden rounded-2xl group cursor-pointer shadow-2xl hover:shadow-primary/20 transition-all duration-700 hover:scale-105 hover:rotate-0">
                <img
                  src={galleryImages[7].src}
                  alt={galleryImages[7].alt}
                  className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-primary/40 via-transparent to-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-foreground text-sm font-bold bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {galleryImages[7].alt}
                  </p>
                </div>
              </div>
            </div>
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

      {/* Gallery Lightbox Dialog */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-background/95 border-0">
          {selectedImage !== null && (
            <div className="relative w-full h-full flex items-center justify-center p-8">
              {/* Previous Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-background/80 hover:bg-background"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              {/* Image */}
              <div className="relative max-h-full max-w-full">
                <img
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  className="max-h-[80vh] max-w-full object-contain rounded-lg"
                />
                <p className="text-center text-muted-foreground mt-4">
                  {galleryImages[selectedImage].alt}
                </p>
              </div>

              {/* Next Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-background/80 hover:bg-background"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Before/After Lightbox Dialog */}
      <Dialog open={isBeforeAfterLightboxOpen} onOpenChange={setIsBeforeAfterLightboxOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-background/95 border-0">
          {selectedBeforeAfter && (
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <div className="w-full max-w-5xl">
                <BeforeAfterSlider
                  beforeImage={selectedBeforeAfter.before}
                  afterImage={selectedBeforeAfter.after}
                  alt={selectedBeforeAfter.alt}
                />
                <p className="text-center text-foreground mt-6 text-lg font-medium">
                  {selectedBeforeAfter.alt}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Gallery;
