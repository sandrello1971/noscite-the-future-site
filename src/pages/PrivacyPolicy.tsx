import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Database, Mail, Phone } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Privacy Policy | Noscite - Protezione dei Tuoi Dati"
        description="Informativa sulla privacy di Noscite. Scopri come proteggiamo i tuoi dati personali e rispettiamo la normativa GDPR."
        keywords="privacy policy, GDPR, protezione dati, informativa privacy, trattamento dati personali"
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
                La tua privacy è importante per noi. Scopri come proteggiamo i tuoi dati.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="h-5 w-5" />
                    <span>1. Introduzione</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>
                    Noscite ("noi", "nostro" o "la Società") si impegna a proteggere la privacy e la sicurezza 
                    delle informazioni personali dei nostri utenti. Questa Privacy Policy descrive come raccogliamo, 
                    utilizziamo, conserviamo e proteggiamo le tue informazioni quando utilizzi il nostro sito web 
                    e i nostri servizi.
                  </p>
                  <p>
                    Utilizzando i nostri servizi, accetti le pratiche descritte in questa policy.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-5 w-5" />
                    <span>2. Informazioni che Raccogliamo</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">2.1 Informazioni fornite direttamente</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Nome e cognome</li>
                      <li>Indirizzo email</li>
                      <li>Numero di telefono</li>
                      <li>Informazioni aziendali (nome società, ruolo)</li>
                      <li>Messaggi e comunicazioni che ci invii</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">2.2 Informazioni raccolte automaticamente</h4>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Indirizzo IP e informazioni del dispositivo</li>
                      <li>Dati di navigazione e utilizzo del sito</li>
                      <li>Cookie e tecnologie simili</li>
                      <li>Informazioni su browser e sistema operativo</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Come Utilizziamo le Tue Informazioni</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Utilizziamo le informazioni raccolte per:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fornire e migliorare i nostri servizi di consulenza AI e formazione</li>
                    <li>Rispondere alle tue richieste e comunicazioni</li>
                    <li>Inviarti newsletter e comunicazioni di marketing (con il tuo consenso)</li>
                    <li>Analizzare l'utilizzo del sito per migliorarne le funzionalità</li>
                    <li>Garantire la sicurezza e prevenire frodi</li>
                    <li>Rispettare obblighi legali e normativi</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Base Giuridica del Trattamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Trattiamo i tuoi dati personali sulla base di:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Consenso:</strong> per newsletter e comunicazioni di marketing</li>
                    <li><strong>Esecuzione del contratto:</strong> per fornire i nostri servizi</li>
                    <li><strong>Interesse legittimo:</strong> per analisi e miglioramenti del sito</li>
                    <li><strong>Obbligo legale:</strong> per rispettare normative applicabili</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Condivisione delle Informazioni</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Non vendiamo mai i tuoi dati personali. Possiamo condividere le informazioni solo nei seguenti casi:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Con fornitori di servizi fidati (hosting, email, analisi) sotto stretto controllo</li>
                    <li>Per rispettare obblighi legali o ordini dell'autorità</li>
                    <li>Per proteggere i nostri diritti e la sicurezza</li>
                    <li>Con il tuo consenso esplicito</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lock className="h-5 w-5" />
                    <span>6. Sicurezza dei Dati</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Implementiamo misure di sicurezza appropriate per proteggere i tuoi dati:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Crittografia SSL/TLS per tutte le comunicazioni</li>
                    <li>Accesso limitato ai dati solo al personale autorizzato</li>
                    <li>Backup regolari e procedure di disaster recovery</li>
                    <li>Monitoraggio continuo per attività sospette</li>
                    <li>Aggiornamenti regolari dei sistemi di sicurezza</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. I Tuoi Diritti</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Hai i seguenti diritti riguardo ai tuoi dati personali:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Accesso:</strong> richiedere una copia dei tuoi dati</li>
                    <li><strong>Rettifica:</strong> correggere dati inesatti o incompleti</li>
                    <li><strong>Cancellazione:</strong> richiedere l'eliminazione dei tuoi dati</li>
                    <li><strong>Limitazione:</strong> limitare il trattamento in certe circostanze</li>
                    <li><strong>Portabilità:</strong> ricevere i tuoi dati in formato strutturato</li>
                    <li><strong>Opposizione:</strong> opporti al trattamento per scopi di marketing</li>
                    <li><strong>Revoca del consenso:</strong> in qualsiasi momento</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>8. Conservazione dei Dati</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Conserviamo i tuoi dati personali per il tempo necessario a:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fornire i servizi richiesti</li>
                    <li>Rispettare obblighi legali (generalmente 10 anni per dati contabili)</li>
                    <li>Risolvere controversie o far valere accordi</li>
                  </ul>
                  <p className="mt-4">
                    I dati di marketing vengono conservati fino alla revoca del consenso o per un massimo di 2 anni 
                    dall'ultima interazione.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>9. Trasferimenti Internazionali</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    I tuoi dati possono essere trasferiti e trattati in paesi al di fuori dello Spazio Economico Europeo. 
                    In tal caso, garantiamo un livello di protezione adeguato attraverso clausole contrattuali standard 
                    o altri meccanismi approvati dalla Commissione Europea.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>10. Modifiche alla Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Ci riserviamo il diritto di aggiornare questa Privacy Policy. Le modifiche sostanziali saranno 
                    comunicate tramite email o avviso prominente sul sito. L'uso continuato dei servizi dopo le 
                    modifiche costituisce accettazione della nuova policy.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="h-5 w-5" />
                    <span>11. Contatti</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Per domande sulla privacy o per esercitare i tuoi diritti, contattaci:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Email: privacy@noscite.it</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>Telefono: +39 02 1234 5678</span>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Risponderemo alla tua richiesta entro 30 giorni, come previsto dal GDPR.
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