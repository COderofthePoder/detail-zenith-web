import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Crown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import logo from '@/assets/logo.png';
import type { User as SupaUser } from '@supabase/supabase-js';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateUser = (user: SupaUser | null | undefined) => {
      setIsLoggedIn(!!user);
      setFirstName(user?.user_metadata?.first_name || '');
    };
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      updateUser(session?.user);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      updateUser(session?.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/leistungen', label: 'Leistungen' },
    { path: '/galerie', label: 'Galerie' },
    { path: '/ueber-uns', label: 'Über Uns' },
    { path: '/kontakt', label: 'Kontakt' },
    { path: '/mitglieder', label: 'Mitgliederbereich' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between md:justify-between justify-center w-full h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center md:flex-none absolute md:relative left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0">
            <img 
              src={logo} 
              alt="DS-Detailing Logo" 
              className="h-64 md:h-80 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.path || (link.path === '/mitglieder' && location.pathname.startsWith('/mitglieder'))
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            {isLoggedIn && firstName ? (
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/mitglieder">
                  <User className="w-4 h-4 mr-2" />
                  Hallo, {firstName}!
                </Link>
              </Button>
            ) : (
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/mitglieder/registrieren">
                  <Crown className="w-4 h-4 mr-2" />
                  Jetzt Mitglied werden
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-background/90 backdrop-blur-sm shadow-md border border-border/50 text-foreground hover:bg-background transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in bg-background/95 backdrop-blur-md">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === link.path || (link.path === '/mitglieder' && location.pathname.startsWith('/mitglieder'))
                      ? 'text-primary' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isLoggedIn && firstName ? (
                <Link to="/mitglieder" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-primary">
                  Hallo, {firstName}!
                </Link>
              ) : (
                <Link to="/mitglieder/registrieren" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-medium text-primary">
                  Jetzt Mitglied werden
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
