import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cookie, Settings, BarChart3, Target, Wrench } from "lucide-react";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <Cookie className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
              <p className="text-xl text-muted-foreground">
                Informazioni dettagliate sui cookie utilizzati dal nostro sito web.
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
                  <CardTitle>1. Cosa sono i Cookie</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>
                    I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo (computer, tablet, 
                    smartphone) quando visiti un sito web. Permettono al sito di riconoscere il tuo dispositivo e 
                    memorizzare alcune informazioni sulle tue preferenze o azioni passate.
                  </p>
                  <p>
                    I cookie non contengono virus o malware e non possono accedere alle informazioni del tuo hard disk. 
                    Sono utilizzati per migliorare l'esperienza di navigazione e fornire servizi personalizzati.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>2. Tipi di Cookie che Utilizziamo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                    <div className="flex items-center space-x-3 mb-3">
                      <Settings className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold text-green-800 dark:text-green-200">Cookie Necessari</h4>
                      <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                        Sempre attivi
                      </span>
                    </div>
                    <p className="text-sm mb-3">
                      Essenziali per il funzionamento del sito web. Non possono essere disabilitati.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div><strong>Sessione utente:</strong> Mantiene la tua sessione durante la navigazione</div>
                      <div><strong>Consenso cookie:</strong> Ricorda le tue preferenze sui cookie</div>
                      <div><strong>Sicurezza:</strong> Protezione contro attacchi CSRF</div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold">Cookie Analitici</h4>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                        Opzionali
                      </span>
                    </div>
                    <p className="text-sm mb-3">
                      Ci aiutano a capire come i visitatori interagiscono con il sito raccogliendo informazioni anonime.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div><strong>Google Analytics:</strong> Analisi del traffico e comportamento utenti</div>
                      <div><strong>Durata:</strong> 2 anni</div>
                      <div><strong>Finalità:</strong> Migliorare contenuti e usabilità del sito</div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <Target className="h-5 w-5 text-purple-600" />
                      <h4 className="font-semibold">Cookie di Marketing</h4>
                      <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
                        Opzionali
                      </span>
                    </div>
                    <p className="text-sm mb-3">
                      Utilizzati per tracciare i visitatori attraverso i siti web per mostrare annunci rilevanti.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div><strong>LinkedIn Ads:</strong> Targeting per campagne pubblicitarie</div>
                      <div><strong>Facebook Pixel:</strong> Remarketing e ottimizzazione campagne</div>
                      <div><strong>Durata:</strong> 1 anno</div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <Wrench className="h-5 w-5 text-orange-600" />
                      <h4 className="font-semibold">Cookie Funzionali</h4>
                      <span className="text-xs bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-2 py-1 rounded">
                        Opzionali
                      </span>
                    </div>
                    <p className="text-sm mb-3">
                      Permettono al sito di ricordare le scelte che fai per fornirti funzionalità migliorate.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div><strong>Preferenze tema:</strong> Modalità chiara/scura</div>
                      <div><strong>Lingua:</strong> Selezione lingua preferita</div>
                      <div><strong>Chatbot:</strong> Stato conversazione assistente AI</div>
                      <div><strong>Durata:</strong> 6 mesi</div>
                    </div>
                  </div>

                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>3. Cookie di Terze Parti</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Il nostro sito utilizza anche cookie di terze parti:</p>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                      <thead>
                        <tr className="bg-muted">
                          <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Servizio</th>
                          <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Finalità</th>
                          <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-left">Durata</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Google Analytics</td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Analisi traffico</td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">2 anni</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">LinkedIn Insight Tag</td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Marketing B2B</td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">1 anno</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">YouTube</td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Video embedded</td>
                          <td className="border border-gray-200 dark:border-gray-700 px-4 py-2">Sessione</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>4. Come Gestire i Cookie</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">4.1 Impostazioni del Sito</h4>
                    <p className="text-sm">
                      Puoi modificare le tue preferenze sui cookie utilizzando il banner che appare alla prima visita 
                      o accedendo alle impostazioni cookie nel footer del sito.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">4.2 Impostazioni del Browser</h4>
                    <p className="text-sm mb-3">
                      Puoi anche gestire i cookie attraverso le impostazioni del tuo browser:
                    </p>
                    <ul className="text-sm space-y-1 list-disc pl-6">
                      <li><strong>Chrome:</strong> Impostazioni → Privacy e sicurezza → Cookie</li>
                      <li><strong>Firefox:</strong> Preferenze → Privacy e sicurezza → Cookie</li>
                      <li><strong>Safari:</strong> Preferenze → Privacy → Cookie</li>
                      <li><strong>Edge:</strong> Impostazioni → Privacy → Cookie</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <strong>Nota importante:</strong> Disabilitare tutti i cookie potrebbe compromettere alcune 
                      funzionalità del sito. I cookie necessari sono sempre attivi per garantire il corretto 
                      funzionamento.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>5. Opt-out da Servizi Specifici</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Puoi disattivare specifici servizi di tracking:</p>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <strong>Google Analytics:</strong> 
                      <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" 
                         className="text-primary hover:underline ml-2">
                        Componente aggiuntivo browser
                      </a>
                    </li>
                    <li>
                      <strong>LinkedIn:</strong> 
                      <a href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out" 
                         target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-2">
                        Impostazioni privacy LinkedIn
                      </a>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>6. Aggiornamenti della Cookie Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Ci riserviamo il diritto di aggiornare questa Cookie Policy per riflettere modifiche 
                    alle nostre pratiche o per altri motivi operativi, legali o normativi. Ti invitiamo 
                    a rivedere periodicamente questa pagina per rimanere informato su come utilizziamo i cookie.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7. Contatti</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Per domande sui cookie o per assistenza nella gestione delle tue preferenze:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div>Email: privacy@noscite.it</div>
                    <div>Telefono: +39 02 1234 5678</div>
                  </div>
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