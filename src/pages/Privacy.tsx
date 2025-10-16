import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Privacy = () => {
  return (
    <>
      <Navigation />

      <section className="pt-32 pb-20 bg-background min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-8">Datenschutzerklärung</h1>

            <div className="space-y-8 text-muted-foreground">
              <div>
                <h2 className="text-2xl font-semibold text-foreground mb-4">Allgemeine Hinweise</h2>
                <p className="leading-relaxed">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
                  Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit
                  denen Sie persönlich identifiziert werden können.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Verantwortliche Stelle</h3>
                <p className="leading-relaxed mb-4">
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                </p>
                <div className="space-y-1">
                  <p className="text-foreground font-medium">DS-Detailing Kollektivgesellschaft</p>
                  <p>Endrit Kastrati & Sufjan Kadrija</p>
                  <p>Willikonerstrasse 78</p>
                  <p>8618 Oetwil am See</p>
                  <p>Schweiz</p>
                  <p className="mt-2">
                    E-Mail:{' '}
                    <a href="mailto:ds.detailing@hotmail.com" className="hover:text-primary transition-colors">
                      ds.detailing@hotmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Datenerfassung auf dieser Website</h3>
                <h4 className="font-semibold text-foreground mb-2">Kontaktformular</h4>
                <p className="leading-relaxed mb-4">
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                  Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der
                  Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                </p>
                <p className="leading-relaxed">
                  Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Server-Log-Dateien</h3>
                <p className="leading-relaxed mb-4">
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
                  Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Die Erfassung dieser Daten
                  erfolgt auf Grundlage unserer berechtigten Interessen an der technischen Sicherheit und Optimierung
                  unseres Webangebots.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Google Maps</h3>
                <p className="leading-relaxed">
                  Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited („Google"),
                  Gordon House, Barrow Street, Dublin 4, Irland. Zur Nutzung der Funktionen von Google Maps ist es
                  notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server
                  von Google in den USA übertragen und dort gespeichert.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">WhatsApp-Integration</h3>
                <p className="leading-relaxed">
                  Unsere Website bietet die Möglichkeit, direkt über WhatsApp Kontakt mit uns aufzunehmen. Wenn Sie
                  diese Funktion nutzen, werden Sie zur WhatsApp-Anwendung weitergeleitet. Bitte beachten Sie die
                  Datenschutzbestimmungen von WhatsApp Inc.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Ihre Rechte</h3>
                <p className="leading-relaxed mb-4">
                  Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen
                  Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf
                  Berichtigung oder Löschung dieser Daten.
                </p>
                <p className="leading-relaxed">
                  Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter
                  der im Impressum angegebenen Adresse an uns wenden.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Speicherdauer</h3>
                <p className="leading-relaxed">
                  Ihre Daten werden gelöscht, sobald der Zweck ihrer Erhebung entfallen ist und keine gesetzlichen
                  Aufbewahrungsfristen mehr bestehen. Anfragen über das Kontaktformular werden nach vollständiger
                  Bearbeitung gelöscht, sofern keine geschäftliche Beziehung besteht.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">SSL- bzw. TLS-Verschlüsselung</h3>
                <p className="leading-relaxed">
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine
                  SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die
                  Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer
                  Browserzeile.
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

export default Privacy;
