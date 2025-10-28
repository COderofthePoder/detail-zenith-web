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
import amgFertig from '@/assets/AMG_Fertig.jpeg';
import urusHuracan from '@/assets/Urus_Huracan.jpg';
import lamboFertig from '@/assets/Lambo_Fertig.jpeg';
import bmwInnenFertig from '@/assets/BMW_Innen_Fertig_New.jpeg';
import clsFertig from '@/assets/CLS_Fertig_New.jpeg';
import clsFertig2 from '@/assets/CLS_Fertig2_New.jpeg';
import lamboFertigInnen from '@/assets/Lambo_Fertig_Innen_New.jpeg';
import whatsappImage1 from '@/assets/WhatsApp Image 2025-10-28 at 10.38.03.jpeg';
import whatsappImage2 from '@/assets/WhatsApp Image 2025-10-28 at 10.38.03 (1).jpeg';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Instagram, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
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
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [selectedBeforeAfter, setSelectedBeforeAfter] = useState<{before: string, after: string, alt: string} | null>(null);
  const [isBeforeAfterLightboxOpen, setIsBeforeAfterLightboxOpen] = useState(false);
  const [isBeforeAfterFullscreenOpen, setIsBeforeAfterFullscreenOpen] = useState(false);
  const [currentBeforeAfterIndex, setCurrentBeforeAfterIndex] = useState(0);
  const [beforeAfterApi, setBeforeAfterApi] = useState<any>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!beforeAfterApi) return;

    const onSelect = () => {
      setCurrentBeforeAfterIndex(beforeAfterApi.selectedScrollSnap());
    };

    beforeAfterApi.on('select', onSelect);
    return () => {
      beforeAfterApi.off('select', onSelect);
    };
  }, [beforeAfterApi]);

  useEffect(() => {
    const handleScroll = () => {
      const gallerySection = document.getElementById('gallery-section');
      if (!gallerySection) return;

      const rect = gallerySection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress from 0 to 1 (extremely fast completion)
      const scrollStart = rect.top + window.scrollY - windowHeight * 0.8;
      const scrollEnd = rect.top + window.scrollY - windowHeight * 0.3;
      const currentScroll = window.scrollY;
      
      const progress = Math.min(Math.max((currentScroll - scrollStart) / (scrollEnd - scrollStart), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const beforeAfterPairs = [
    {
      before: whatsappImage1,
      after: whatsappImage2,
      alt: 'Fahrzeugaufbereitung',
    },
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

  const handleBeforeAfterZoom = () => {
    setSelectedBeforeAfter(beforeAfterPairs[currentBeforeAfterIndex]);
    setIsBeforeAfterFullscreenOpen(true);
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    setIsLightboxOpen(true);
  };

  const handleImageZoom = () => {
    setIsFullscreenOpen(true);
  };

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? galleryImages.length - 1 : (prev ?? 0) - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => ((prev ?? 0) + 1) % galleryImages.length);
  };

  // Gallery images with descriptions
  const galleryImages = [
    { 
      src: amgFertig, 
      alt: 'Mercedes AMG - Perfekte Aufbereitung',
      description: 'Bei diesem Mercedes AMG haben wir eine Komplettaufbereitung durchgeführt. Die Lackierung wurde professionell poliert und versiegelt, um den tiefen Glanz wiederherzustellen. Der Innenraum wurde intensiv gereinigt, sämtliche Kunststoffteile aufbereitet und das Lenkrad neu bezogen. Das Ergebnis ist ein Fahrzeug, das aussieht wie neu aus dem Showroom.'
    },
    { 
      src: urusHuracan, 
      alt: 'Lamborghini Urus & Huracan - Luxus Sportwagen',
      description: 'Zwei absolute Traumwagen, die beide eine professionelle Detailing-Behandlung erhielten. Beim Urus wurde eine komplette Aussenaufbereitung mit Keramikversiegelung durchgeführt, während der Huracan eine Innenraumaufbereitung mit spezieller Alcantara-Pflege erhielt. Die Felgen wurden professionell aufbereitet und versiegelt.'
    },
    { 
      src: lamboFertig, 
      alt: 'Lamborghini - Professionelle Fahrzeugaufbereitung',
      description: 'Dieser Lamborghini wurde von uns komplett aufbereitet. Die Aussenlackierung erhielt eine mehrstufige Politur, gefolgt von einer hochwertigen Keramikversiegelung für langanhaltenden Schutz. Die Carbon-Teile wurden speziell behandelt, um ihre einzigartige Optik zu erhalten. Eine perfekte Symbiose aus Schutz und Ästhetik.'
    },
    { 
      src: bmwInnenFertig, 
      alt: 'BMW Innenraumaufbereitung - Perfekte Sauberkeit',
      description: 'Der Innenraum dieses BMW wurde komplett restauriert. Alle Ledersitze wurden intensiv gereinigt, aufbereitet und mit hochwertigen Pflegeprodukten behandelt. Das Lenkrad erhielt eine Spezialbehandlung, Kunststoffteile wurden aufgefrischt und versiegelt. Der Dachhimmel wurde professionell gereinigt. Das Ergebnis übertrifft die Erwartungen.'
    },
    { 
      src: lamboFertigInnen, 
      alt: 'Lamborghini Innenraum - Luxus Detailing',
      description: 'Der Innenraum dieses Lamborghini wurde mit grösster Sorgfalt aufbereitet. Alcantara-Elemente wurden speziell gereinigt und gepflegt, Lederpartien erhielten eine Intensivbehandlung. Carbon-Interieur wurde schonend behandelt, alle Displays und Touchscreens professionell gereinigt. Perfektion bis ins kleinste Detail.'
    },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden">
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
      <section className="pt-12 md:pt-20 pb-24 md:pb-40 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-[1600px] mx-auto">
            <div className="text-center mb-20">
              <h2 className="mb-6 text-4xl md:text-5xl">Vorher / Nachher</h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Ziehen Sie den Regler, um den Unterschied zu sehen.
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
              setApi={setBeforeAfterApi}
            >
              <CarouselContent className="-ml-8">
                {beforeAfterPairs.map((pair, index) => (
                  <CarouselItem key={index} className="pl-8 md:basis-1/2">
                    <div 
                      className="cursor-pointer transition-all duration-300 hover:scale-[1.02] animate-fade-up"
                      style={{ animationDelay: `${(index % 2) * 100}ms` }}
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
              <CarouselPrevious className="left-2 md:left-0 md:-translate-x-16 h-12 w-12 md:h-16 md:w-16 bg-primary/90 hover:bg-primary border-2 border-primary shadow-glow transition-all duration-300" />
              <CarouselNext className="right-2 md:right-0 md:translate-x-16 h-12 w-12 md:h-16 md:w-16 bg-primary/90 hover:bg-primary border-2 border-primary shadow-glow transition-all duration-300" />
            </Carousel>
            
            {/* Mobile Zoom Button for Carousel */}
            <div className="flex justify-center mt-8 md:hidden">
              <Button
                onClick={handleBeforeAfterZoom}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
              >
                Aktuelles Bild vergrössern
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Slider - Impressionen */}
      <section id="gallery-section" className="py-24 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-6 text-4xl md:text-5xl">Impressionen</h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Einblicke in unsere Arbeit
            </p>
          </div>

          <div className="max-w-[1600px] mx-auto">
            <Carousel
              opts={{
                align: 'center',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-6">
                {galleryImages.map((image, index) => (
                  <CarouselItem key={index} className="pl-6 md:basis-full">
                    <div className="flex flex-col items-center gap-6">
                      {/* Image Container */}
                      <div 
                        className="cursor-pointer transition-all duration-500 hover:scale-[1.02] w-full"
                        onClick={() => handleImageClick(index)}
                      >
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-700 aspect-[16/9]">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover transition-all duration-700 hover:brightness-110 scale-[0.9]"
                            style={{ 
                              objectPosition: index === 2 ? 'center 90%' : 
                                            index === 3 ? 'center 40%' : 
                                            'center 70%' 
                            }}
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                      </div>
                      
                      {/* Caption Below Image */}
                      <div className="text-center px-4 max-w-3xl">
                        <p className="text-foreground text-2xl md:text-3xl font-semibold">{image.alt}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 h-14 w-14 bg-background/95 hover:bg-background border-2 border-primary/20 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110" />
              <CarouselNext className="right-4 h-14 w-14 bg-background/95 hover:bg-background border-2 border-primary/20 hover:border-primary transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110" />
            </Carousel>
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
      <section className="py-20 md:py-32 bg-secondary/30">
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
        <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] p-0 bg-background border-primary/20">
          {selectedImage !== null && (
            <div className="relative w-full h-full flex flex-col">
              {/* Image */}
              <div className="w-full flex-shrink-0 flex items-center justify-center p-4 md:p-6 bg-secondary/50">
                <div 
                  className="relative flex items-center justify-center mx-auto max-h-[30vh] md:max-h-[50vh] cursor-zoom-in"
                  onClick={handleImageZoom}
                >
                  <img
                    src={galleryImages[selectedImage].src}
                    alt={galleryImages[selectedImage].alt}
                    className="max-w-[85%] md:max-w-full h-auto max-h-[30vh] md:max-h-[50vh] object-contain rounded-lg shadow-2xl"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="w-full overflow-y-auto p-4 md:p-8 max-h-[40vh]">
                <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-gradient">
                  {galleryImages[selectedImage].alt}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {galleryImages[selectedImage].description}
                </p>
              </div>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-[20vh] md:top-1/3 -translate-y-1/2 z-50 h-12 w-12 md:h-14 md:w-14 rounded-full bg-primary/90 hover:bg-primary border-2 border-primary shadow-glow transition-all"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-[20vh] md:top-1/3 -translate-y-1/2 z-50 h-12 w-12 md:h-14 md:w-14 rounded-full bg-primary/90 hover:bg-primary border-2 border-primary shadow-glow transition-all"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-6 w-6 md:h-8 md:w-8 text-primary-foreground" />
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Fullscreen Image Dialog */}
      <Dialog open={isFullscreenOpen} onOpenChange={setIsFullscreenOpen}>
        <DialogContent className="max-w-[98vw] w-full h-[98vh] p-2 bg-background/98 border-primary/20">
          {selectedImage !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Before/After Lightbox Dialog */}
      <Dialog open={isBeforeAfterLightboxOpen} onOpenChange={setIsBeforeAfterLightboxOpen}>
        <DialogContent className="max-w-7xl w-full max-h-[90vh] p-0 bg-background/95 border-0">
          {selectedBeforeAfter && (
            <div className="relative w-full h-full flex flex-col p-4 md:p-8 overflow-y-auto">
              <div className="w-full max-w-5xl mx-auto flex-shrink-0">
                <BeforeAfterSlider
                  beforeImage={selectedBeforeAfter.before}
                  afterImage={selectedBeforeAfter.after}
                  alt={selectedBeforeAfter.alt}
                />
              </div>
              <p className="text-center text-foreground mt-4 md:mt-6 text-base md:text-lg font-medium">
                {selectedBeforeAfter.alt}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Before/After Fullscreen Dialog */}
      <Dialog open={isBeforeAfterFullscreenOpen} onOpenChange={setIsBeforeAfterFullscreenOpen}>
        <DialogContent className="max-w-[98vw] w-full h-[98vh] p-2 bg-background/98 border-primary/20">
          {selectedBeforeAfter && (
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center">
                <BeforeAfterSlider
                  beforeImage={selectedBeforeAfter.before}
                  afterImage={selectedBeforeAfter.after}
                  alt={selectedBeforeAfter.alt}
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
