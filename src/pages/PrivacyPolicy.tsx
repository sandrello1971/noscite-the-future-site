import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Mail, MapPin, Phone } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Privacy Policy | Noscite - Protezione dei Tuoi Dati"
        description="Informativa sulla privacy di Noscite ai sensi del GDPR (Regolamento UE 2016/679). Scopri come proteggiamo e trattiamo i tuoi dati personali."
        keywords="privacy policy, GDPR, protezione dati, informativa privacy, trattamento dati personali, Regolamento UE 2016/679"
        canonical="https://noscite.it/privacy-policy"
      />
      <Header />
      <Breadcrumbs />
      
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <Shield className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-xl text-muted-foreground">
                Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR)
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Ultimo aggiornamento: 25 Dicembre 2024
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Titolare del trattamento */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">1. Titolare del Trattamento</h2>
                  <p className="text-muted-foreground mb-4">
                    Il Titolare del trattamento dei dati personali è:
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="font-semibold">Noscite</p>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Via Monte Grappa 13, 20094 Corsico (MI), Italia</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <a href="mailto:privacy@noscite.it" className="text-primary hover:underline">privacy@noscite.it</a>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-primary" />
                      <span>+39 347 685 9801</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tipologie di dati raccolti */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">2. Tipologie di Dati Raccolti</h2>
                  <p className="text-muted-foreground mb-4">
                    Fra i dati personali raccolti da questo sito web, in modo autonomo o tramite terze parti, ci sono:
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Dati forniti volontariamente dall'Utente</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Nome e cognome</li>
                        <li>Indirizzo email</li>
                        <li>Numero di telefono</li>
                        <li>Nome dell'azienda</li>
                        <li>Messaggi e richieste inviate tramite il modulo di contatto</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Dati di navigazione</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Indirizzo IP</li>
                        <li>Tipo di browser e dispositivo</li>
                        <li>Sistema operativo</li>
                        <li>Pagine visitate e tempo di permanenza</li>
                        <li>Sito di provenienza (referrer)</li>
                        <li>Data e ora della visita</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Finalità del trattamento */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">3. Finalità del Trattamento</h2>
                  <p className="text-muted-foreground mb-4">
                    I dati personali sono trattati per le seguenti finalità:
                  </p>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-semibold">Erogazione del servizio</h3>
                      <p className="text-sm text-muted-foreground">
                        Rispondere alle richieste di contatto, fornire assistenza e informazioni sui servizi offerti.
                      </p>
                      <p className="text-xs text-primary mt-1">Base giuridica: Esecuzione di un contratto o misure precontrattuali</p>
                    </div>
                    
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-semibold">Comunicazioni commerciali</h3>
                      <p className="text-sm text-muted-foreground">
                        Invio di newsletter e comunicazioni di marketing (previo consenso esplicito).
                      </p>
                      <p className="text-xs text-primary mt-1">Base giuridica: Consenso dell'interessato</p>
                    </div>
                    
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-semibold">Analisi statistiche</h3>
                      <p className="text-sm text-muted-foreground">
                        Analisi del comportamento degli utenti per migliorare il sito web e i servizi offerti.
                      </p>
                      <p className="text-xs text-primary mt-1">Base giuridica: Legittimo interesse del Titolare</p>
                    </div>
                    
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-semibold">Adempimenti legali</h3>
                      <p className="text-sm text-muted-foreground">
                        Adempiere a obblighi di legge, regolamenti e normative applicabili.
                      </p>
                      <p className="text-xs text-primary mt-1">Base giuridica: Obbligo legale</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Modalità del trattamento */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">4. Modalità del Trattamento</h2>
                  <p className="text-muted-foreground mb-4">
                    Il trattamento dei dati personali viene effettuato mediante strumenti informatici e/o telematici, 
                    con modalità organizzative e logiche strettamente correlate alle finalità indicate.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Il Titolare adotta misure di sicurezza adeguate per prevenire l'accesso non autorizzato, la divulgazione, 
                    la modifica o la distruzione non autorizzata dei dati, inclusi:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Crittografia dei dati in transito (HTTPS/TLS)</li>
                    <li>Accesso controllato ai sistemi informatici</li>
                    <li>Backup regolari dei dati</li>
                    <li>Monitoraggio e audit periodici</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Periodo di conservazione */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">5. Periodo di Conservazione</h2>
                  <p className="text-muted-foreground mb-4">
                    I dati personali sono conservati per il tempo strettamente necessario a conseguire le finalità 
                    per cui sono stati raccolti e comunque non oltre i seguenti termini:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li><strong>Dati di contatto:</strong> 24 mesi dalla raccolta o fino alla richiesta di cancellazione</li>
                    <li><strong>Dati contrattuali:</strong> 10 anni dalla cessazione del rapporto (obblighi fiscali)</li>
                    <li><strong>Newsletter:</strong> Fino alla revoca del consenso</li>
                    <li><strong>Dati di navigazione:</strong> 26 mesi (dati analitici aggregati)</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Diritti dell'interessato */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">6. Diritti dell'Interessato</h2>
                  <p className="text-muted-foreground mb-4">
                    Ai sensi degli articoli 15-22 del GDPR, l'interessato ha il diritto di:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Diritto di accesso</h3>
                      <p className="text-sm text-muted-foreground">
                        Ottenere conferma che sia o meno in corso un trattamento di dati personali che lo riguardano.
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Diritto di rettifica</h3>
                      <p className="text-sm text-muted-foreground">
                        Ottenere la rettifica dei dati personali inesatti o l'integrazione di dati incompleti.
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Diritto alla cancellazione</h3>
                      <p className="text-sm text-muted-foreground">
                        Ottenere la cancellazione dei dati personali che lo riguardano ("diritto all'oblio").
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Diritto di limitazione</h3>
                      <p className="text-sm text-muted-foreground">
                        Ottenere la limitazione del trattamento in determinate circostanze.
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Diritto alla portabilità</h3>
                      <p className="text-sm text-muted-foreground">
                        Ricevere i dati in formato strutturato e trasferirli a un altro titolare.
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Diritto di opposizione</h3>
                      <p className="text-sm text-muted-foreground">
                        Opporsi al trattamento dei dati personali per motivi legittimi.
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-4">
                    Per esercitare i tuoi diritti, puoi contattarci all'indirizzo{" "}
                    <a href="mailto:privacy@noscite.it" className="text-primary hover:underline">privacy@noscite.it</a>.
                  </p>
                </CardContent>
              </Card>

              {/* Comunicazione e diffusione */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">7. Comunicazione e Diffusione dei Dati</h2>
                  <p className="text-muted-foreground mb-4">
                    I dati personali potranno essere comunicati a:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Soggetti che forniscono servizi per la gestione del sistema informativo (hosting, email, etc.)</li>
                    <li>Consulenti e professionisti per l'adempimento di obblighi contrattuali e legali</li>
                    <li>Autorità competenti per adempimento di obblighi di legge</li>
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    I dati non saranno diffusi né ceduti a terzi per finalità di marketing diretto senza il tuo consenso esplicito.
                  </p>
                </CardContent>
              </Card>

              {/* Trasferimento dati extra UE */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">8. Trasferimento Dati Extra UE</h2>
                  <p className="text-muted-foreground mb-4">
                    I dati personali potrebbero essere trasferiti verso paesi al di fuori dell'Unione Europea. 
                    In tal caso, il trasferimento avverrà nel rispetto delle garanzie previste dal GDPR, tra cui:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Decisioni di adeguatezza della Commissione Europea</li>
                    <li>Clausole contrattuali standard approvate dalla Commissione Europea</li>
                    <li>Norme vincolanti d'impresa</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Reclamo */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">9. Diritto di Reclamo</h2>
                  <p className="text-muted-foreground">
                    L'interessato che ritenga che il trattamento dei propri dati personali violi il GDPR 
                    ha il diritto di proporre reclamo all'Autorità di controllo competente:
                  </p>
                  <div className="bg-muted/50 p-4 rounded-lg mt-4">
                    <p className="font-semibold">Garante per la Protezione dei Dati Personali</p>
                    <p className="text-sm text-muted-foreground">Piazza Venezia 11, 00187 Roma</p>
                    <p className="text-sm text-muted-foreground">
                      Sito web:{" "}
                      <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        www.garanteprivacy.it
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Modifiche alla policy */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">10. Modifiche alla Privacy Policy</h2>
                  <p className="text-muted-foreground">
                    Il Titolare si riserva il diritto di apportare modifiche alla presente Privacy Policy in qualunque momento. 
                    Le modifiche saranno pubblicate su questa pagina con indicazione della data di ultimo aggiornamento. 
                    Si consiglia di consultare periodicamente questa pagina per essere sempre aggiornati.
                  </p>
                </CardContent>
              </Card>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
