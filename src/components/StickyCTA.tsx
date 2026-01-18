import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-scale-in hidden md:block">
      <Button
        asChild
        size="lg"
        className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-premium rounded-full px-8"
      >
        <Link to="/termin">
          <Phone className="w-5 h-5 mr-2" />
          Termin reservieren
        </Link>
      </Button>
    </div>
  );
};

export default StickyCTA;
