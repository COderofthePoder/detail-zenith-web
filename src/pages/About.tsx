import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyCTA from '@/components/StickyCTA';
import { Award, Heart, Sparkles, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import teamImage from '@/assets/team.jpg';
import workshopImage from '@/assets/workshop.jpg';

const About = () => {
  return (
    <>
      <Navigation />
      <StickyCTA />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="mb-6">
              Über <span className="text-gradient">DS-Detailing</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Zwei Auto-Enthusiasten mit einer Vision: Perfektion bis ins kleinste Detail
            </p>
          </div>
        </div>
      </section>

      {/* Team Story */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-up">
              <h2 className="mb-6">Unsere Geschichte</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                DS-Detailing wurde von <strong className="text-foreground">Endrit Kastrati</strong> und{' '}
                <strong className="text-foreground">Sufjan Kadrija</strong> gegründet – zwei 
                Freunde, die ihre Leidenschaft für Autos zum Beruf gemacht haben.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Was als Hobby begann, entwickelte sich zu einer professionellen 
                Kollektivgesellschaft mit modernster Ausrüstung und höchsten Qualitätsstandards.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Heute betreuen wir Kunden in der gesamten Region Zürich mit Präzision, 
                Fachkompetenz und echter Liebe zum Detail.
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/kontakt">Kontakt aufnehmen</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Unsere Werte</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Was uns antreibt und auszeichnet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Sparkles,
                title: 'Perfektion',
                description: 'Wir streben nach Perfektion in jedem Detail – von der Vorbereitung bis zum finalen Finish.',
              },
              {
                icon: Heart,
                title: 'Leidenschaft',
                description: 'Autos sind unsere Leidenschaft. Diese Begeisterung spürt man in jedem Arbeitsschritt.',
              },
              {
                icon: Award,
                title: 'Qualität',
                description: 'Nur hochwertige Produkte und modernste Technik für beste Ergebnisse und lange Haltbarkeit.',
              },
              {
                icon: Target,
                title: 'Zuverlässigkeit',
                description: 'Pünktlich, transparent und verbindlich – auf uns können Sie sich verlassen.',
              },
            ].map((value, index) => (
              <div
                key={value.title}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="animate-fade-up">
              <h2 className="mb-6">Unsere Ausstattung</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                In unserer modern ausgestatteten Werkstatt verfügen 
                wir über alles, was für professionelle Fahrzeugaufbereitung nötig ist.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Von hochwertigen Poliermaschinen über Keramikversiegelungs-Equipment bis hin zu 
                spezialisierten Reinigungsgeräten – wir investieren kontinuierlich in die 
                beste Ausrüstung für optimale Ergebnisse.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Unser Hauptsitz befindet sich an der <strong className="text-foreground">Willikonerstrasse 78 
                in Oetwil am See</strong>. Hier koordinieren wir alle administrativen Aufgaben 
                und stehen Ihnen für Fragen zur Verfügung.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground/80">Öffnungszeiten: Mo–Sa 08:00–18:00</span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground/80">Termin nach Vereinbarung</span>
                </div>
                <div className="flex items-center gap-3 justify-center">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground/80">Individuelle Beratung vor Ort</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-6">Lernen Sie uns kennen</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Besuchen Sie uns oder kontaktieren Sie uns für eine unverbindliche Beratung
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
                <Link to="/kontakt">Termin vereinbaren</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-foreground/20 hover:bg-foreground/10">
                <Link to="/leistungen">Unsere Leistungen</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
