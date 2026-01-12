import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Cookie, Info, BarChart3, Target, Settings } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CookiePolicy = () => {
  const openCookiePreferences = () => {
    // Clear cookie consent to reshow the banner
    localStorage.removeItem('cookie-consent');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Cookie Policy | Noscite - Informativa sui Cookie"
        description="Informativa completa sui cookie utilizzati dal sito Noscite ai sensi del GDPR. Scopri i tipi di cookie, le finalità e come gestire le tue preferenze."
        keywords="cookie policy, informativa cookie, gestione cookie, privacy web, consenso cookie, GDPR cookie"
        canonical="https://noscite.it/cookie-policy"
      />
      <Header />
      <Breadcrumbs />
      
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <Cookie className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
              <p className="text-xl text-muted-foreground">
                Informativa sull'utilizzo dei cookie ai sensi dell'art. 13 del Regolamento UE 2016/679 (GDPR) 
                e della Direttiva 2002/58/CE (ePrivacy)
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
              
              {/* Cosa sono i cookie */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl font-bold mb-4">1. Cosa sono i Cookie</h2>
                      <p className="text-muted-foreground mb-4">
                        I cookie sono piccoli file di testo che i siti web visitati inviano al browser dell'utente, 
                        dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla successiva visita.
                      </p>
                      <p className="text-muted-foreground">
                        I cookie possono essere "di sessione" (si cancellano alla chiusura del browser) oppure 
                        "persistenti" (rimangono memorizzati fino alla loro scadenza o cancellazione da parte dell'utente).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tipologie di cookie */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">2. Tipologie di Cookie Utilizzati</h2>
                  
                  <div className="space-y-6">
                    {/* Cookie tecnici */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Settings className="h-5 w-5 text-green-600" />
                        <h3 className="font-semibold text-lg">Cookie Tecnici/Necessari</h3>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Sempre attivi</span>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        Sono essenziali per il corretto funzionamento del sito e non richiedono il consenso dell'utente. 
                        Senza questi cookie il sito non potrebbe funzionare correttamente.
                      </p>
                      <div className="bg-muted/50 rounded p-3">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 font-medium">Nome</th>
                              <th className="text-left py-2 font-medium">Finalità</th>
                              <th className="text-left py-2 font-medium">Durata</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2">cookie-consent</td>
                              <td className="py-2">Memorizza le preferenze cookie dell'utente</td>
                              <td className="py-2">1 anno</td>
                            </tr>
                            <tr>
                              <td className="py-2">session_id</td>
                              <td className="py-2">Gestione della sessione utente</td>
                              <td className="py-2">Sessione</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Cookie analitici */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <BarChart3 className="h-5 w-5 text-blue-600" />
                        <h3 className="font-semibold text-lg">Cookie Analitici</h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Previo consenso</span>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        Ci permettono di analizzare il modo in cui gli utenti utilizzano il sito, 
                        le pagine più visitate, gli errori riscontrati. I dati sono raccolti in forma anonima e aggregata.
                      </p>
                      <div className="bg-muted/50 rounded p-3">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 font-medium">Nome</th>
                              <th className="text-left py-2 font-medium">Fornitore</th>
                              <th className="text-left py-2 font-medium">Durata</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2">_ga</td>
                              <td className="py-2">Google Analytics</td>
                              <td className="py-2">2 anni</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">_ga_*</td>
                              <td className="py-2">Google Analytics</td>
                              <td className="py-2">2 anni</td>
                            </tr>
                            <tr>
                              <td className="py-2">_gid</td>
                              <td className="py-2">Google Analytics</td>
                              <td className="py-2">24 ore</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Per maggiori informazioni:{" "}
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                          Privacy Policy di Google
                        </a>
                      </p>
                    </div>

                    {/* Cookie di marketing */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Target className="h-5 w-5 text-purple-600" />
                        <h3 className="font-semibold text-lg">Cookie di Marketing/Profilazione</h3>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Previo consenso</span>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        Questi cookie vengono utilizzati per tracciare i visitatori tra i siti web. 
                        L'intento è quello di mostrare annunci pertinenti e coinvolgenti per il singolo utente.
                      </p>
                      <div className="bg-muted/50 rounded p-3">
                        <p className="text-sm text-muted-foreground italic">
                          Attualmente non utilizziamo cookie di marketing/profilazione di terze parti.
                        </p>
                      </div>
                    </div>

                    {/* Cookie funzionali */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <Settings className="h-5 w-5 text-orange-600" />
                        <h3 className="font-semibold text-lg">Cookie Funzionali</h3>
                        <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Previo consenso</span>
                      </div>
                      <p className="text-muted-foreground mb-3">
                        Permettono al sito di ricordare le scelte dell'utente (come la lingua o la regione) 
                        e fornire funzionalità avanzate e personalizzate.
                      </p>
                      <div className="bg-muted/50 rounded p-3">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 font-medium">Nome</th>
                              <th className="text-left py-2 font-medium">Finalità</th>
                              <th className="text-left py-2 font-medium">Durata</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2">theme</td>
                              <td className="py-2">Memorizza preferenza tema chiaro/scuro</td>
                              <td className="py-2">1 anno</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cookie di terze parti */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">3. Cookie di Terze Parti</h2>
                  <p className="text-muted-foreground mb-4">
                    Il sito utilizza servizi di terze parti che potrebbero installare propri cookie:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>
                      <strong>Google Analytics:</strong> Servizio di analisi web fornito da Google LLC. 
                      I dati sono trasferiti negli USA sulla base delle Clausole Contrattuali Standard.
                    </li>
                    <li>
                      <strong>Supabase:</strong> Servizio di backend e autenticazione. 
                      <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Come gestire i cookie */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">4. Come Gestire i Cookie</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Tramite il nostro banner</h3>
                      <p className="text-muted-foreground mb-3">
                        Puoi modificare le tue preferenze sui cookie in qualsiasi momento cliccando sul pulsante qui sotto:
                      </p>
                      <Button onClick={openCookiePreferences} className="flex items-center space-x-2">
                        <Settings className="h-4 w-4" />
                        <span>Gestisci Preferenze Cookie</span>
                      </Button>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-2">Tramite il browser</h3>
                      <p className="text-muted-foreground mb-3">
                        Puoi anche gestire i cookie direttamente dal tuo browser. Ecco le istruzioni per i browser più comuni:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>
                          <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Google Chrome
                          </a>
                        </li>
                        <li>
                          <a href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Mozilla Firefox
                          </a>
                        </li>
                        <li>
                          <a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Apple Safari
                          </a>
                        </li>
                        <li>
                          <a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                            Microsoft Edge
                          </a>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        <strong>Nota:</strong> La disabilitazione di alcuni cookie potrebbe compromettere 
                        la funzionalità del sito o impedire l'accesso a determinate sezioni.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Base giuridica */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">5. Base Giuridica del Trattamento</h2>
                  <p className="text-muted-foreground mb-4">
                    Il trattamento dei dati personali tramite cookie avviene sulla base delle seguenti basi giuridiche:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li><strong>Cookie tecnici:</strong> Legittimo interesse del Titolare (Art. 6.1.f GDPR)</li>
                    <li><strong>Cookie analitici:</strong> Consenso dell'interessato (Art. 6.1.a GDPR)</li>
                    <li><strong>Cookie di marketing:</strong> Consenso dell'interessato (Art. 6.1.a GDPR)</li>
                    <li><strong>Cookie funzionali:</strong> Consenso dell'interessato (Art. 6.1.a GDPR)</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Titolare e contatti */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">6. Titolare del Trattamento</h2>
                  <p className="text-muted-foreground mb-4">
                    Il Titolare del trattamento è Noscite, con sede in Via Monte Grappa 13, 20094 Corsico (MI), Italia.
                  </p>
                  <p className="text-muted-foreground">
                    Per qualsiasi informazione relativa alla presente Cookie Policy, puoi contattarci all'indirizzo:{" "}
                    <a href="mailto:privacy@noscite.it" className="text-primary hover:underline">privacy@noscite.it</a>
                  </p>
                </CardContent>
              </Card>

              {/* Modifiche */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">7. Modifiche alla Cookie Policy</h2>
                  <p className="text-muted-foreground">
                    La presente Cookie Policy potrebbe essere soggetta a modifiche. 
                    In caso di modifiche sostanziali, sarà pubblicata una nuova versione con indicazione della data di aggiornamento. 
                    Si consiglia di consultare periodicamente questa pagina per essere informati su eventuali cambiamenti.
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

export default CookiePolicy;
