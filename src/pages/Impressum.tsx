import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Impressum = () => {
  return (
    <>
      <Navigation />

      <section className="pt-32 pb-20 bg-background min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-8">Impressum</h1>

            <div className="space-y-8 text-muted-foreground">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Angaben gemäss Schweizer Recht</h2>
                <div className="space-y-2">
                  <p className="text-foreground font-medium">DS-Detailing Kollektivgesellschaft</p>
                  <p>Willikonerstrasse 7</p>
                  <p>8618 Oetwil am See</p>
                  <p>Schweiz</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Inhaber</h3>
                <p>Endrit Kastrati</p>
                <p>Sufjan Kadrija</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Kontakt</h3>
                <div className="space-y-2">
                  <p>
                    <span className="text-foreground">Telefon:</span>{' '}
                    <a href="tel:+41765493697" className="hover:text-primary transition-colors">
                      +41 76 549 36 97
                    </a>{' '}
                    /{' '}
                    <a href="tel:+41792610998" className="hover:text-primary transition-colors">
                      +41 79 261 09 98
                    </a>
                  </p>
                  <p>
                    <span className="text-foreground">E-Mail:</span>{' '}
                    <a href="mailto:ds.detailing@hotmail.com" className="hover:text-primary transition-colors">
                      ds.detailing@hotmail.com
                    </a>
                  </p>
                  <p>
                    <span className="text-foreground">Instagram:</span>{' '}
                    <a
                      href="https://instagram.com/ds_detailin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      @ds_detailin
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Haftungsausschluss</h3>
                <p className="leading-relaxed mb-4">
                  Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit,
                  Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen.
                </p>
                <p className="leading-relaxed mb-4">
                  Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, welche aus
                  dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch
                  Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.
                </p>
                <p className="leading-relaxed">
                  Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, Teile der Seiten
                  oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder
                  die Veröffentlichung zeitweise oder endgültig einzustellen.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Haftung für Links</h3>
                <p className="leading-relaxed">
                  Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es
                  wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher
                  Webseiten erfolgen auf eigene Gefahr des Nutzers oder der Nutzerin.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Urheberrechte</h3>
                <p className="leading-relaxed mb-4">
                  Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der
                  Website gehören ausschliesslich DS-Detailing Kollektivgesellschaft oder den speziell genannten
                  Rechtsinhabern.
                </p>
                <p className="leading-relaxed">
                  Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger
                  im Voraus einzuholen.
                </p>
              </div>

              <div className="pt-8 border-t border-border">
                <p className="text-sm">
                  Stand: {new Date().toLocaleDateString('de-CH', { year: 'numeric', month: 'long' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Impressum;
