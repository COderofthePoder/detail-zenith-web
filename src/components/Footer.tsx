import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-gradient">DS</span>
              <span className="text-foreground">-Detailing</span>
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Perfektion bis ins kleinste Detail.
            </p>
            <a
              href="https://instagram.com/ds_detailin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <Instagram className="w-5 h-5" />
              @ds_detailin
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Navigation</h4>
            <ul className="space-y-2">
              {[
                { path: '/', label: 'Home' },
                { path: '/leistungen', label: 'Leistungen' },
                { path: '/galerie', label: 'Galerie' },
                { path: '/ueber-uns', label: 'Über Uns' },
                { path: '/kontakt', label: 'Kontakt' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <div>
                  <a href="tel:+41765493697" className="hover:text-primary transition-colors">
                    +41 76 549 36 97
                  </a>
                  <br />
                  <a href="tel:+41792610998" className="hover:text-primary transition-colors">
                    +41 79 261 09 98
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <a href="mailto:ds.detailing@hotmail.com" className="hover:text-primary transition-colors">
                  ds.detailing@hotmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span>Mo–Sa 08:00–18:00</span>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Standort</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Hauptsitz</p>
                  <p>Willikonerstrasse 78<br />8618 Oetwil am See</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DS-Detailing Kollektivgesellschaft. Alle Rechte vorbehalten.
            </p>
            <div className="flex gap-6">
              <Link
                to="/impressum"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Impressum
              </Link>
              <Link
                to="/datenschutz"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
