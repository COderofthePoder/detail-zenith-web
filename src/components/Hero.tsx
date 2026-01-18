import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-up">
          {/* Badge */}
          

          {/* Main Heading */}
          <h1 className="mb-6 leading-tight text-white drop-shadow-2xl">
            Perfektion bis ins<br />
            <span className="text-gradient drop-shadow-2xl">kleinste Detail</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/95 mb-8 max-w-2xl mx-auto drop-shadow-lg">
            Professionelle Fahrzeugaufbereitung mit höchster Präzision und modernster Technik
          </p>

          {/* Value Props */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            {['Hochwertige Produkte', 'Moderne Technik', 'Höchste Präzision'].map(item => <div key={item} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full shadow-glow" />
                <span className="text-sm md:text-base text-white/90 drop-shadow-md">{item}</span>
              </div>)}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
              <Link to="/termin">
                Termin reservieren
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50">
              <Link to="/leistungen">Unsere Leistungen</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary rounded-full shadow-glow" />
        </div>
      </div>
    </section>;
};
export default Hero;