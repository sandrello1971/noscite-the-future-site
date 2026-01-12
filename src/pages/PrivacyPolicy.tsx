import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Mail, MapPin, ExternalLink, Download } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Privacy Policy | Noscite - Protezione dei Tuoi Dati"
        description="Informativa sulla privacy di noscite.it ai sensi del GDPR (Regolamento UE 2016/679). Scopri come proteggiamo e trattiamo i tuoi dati personali."
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
              <h1 className="text-4xl font-bold mb-4">Privacy Policy di noscite.it</h1>
              <p className="text-xl text-muted-foreground">
                Questa policy ti aiuterà a comprendere quali dati raccogliamo, perché li raccogliamo e quali sono i tuoi diritti in merito.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                Ultima modifica: 9 gennaio 2026
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Sommario */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Sommario</h2>
                  <nav className="space-y-2">
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li>Riepilogo</li>
                      <li>Titolare del Trattamento dei Dati</li>
                      <li>Tipologie di Dati raccolti</li>
                      <li>Modalità e luogo del trattamento dei Dati raccolti</li>
                      <li>Finalità del Trattamento dei Dati raccolti</li>
                      <li>Dettagli sul trattamento dei Dati Personali</li>
                      <li>Cookie Policy</li>
                      <li>Ulteriori informazioni per gli utenti nell'Unione Europea</li>
                      <li>Ulteriori informazioni sul trattamento</li>
                      <li>Definizioni e riferimenti legali</li>
                    </ul>
                  </nav>
                </CardContent>
              </Card>

              {/* Riepilogo */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Riepilogo</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Dati che raccogliamo automaticamente</h3>
                      <p className="text-muted-foreground mb-3">
                        Raccogliamo automaticamente i tuoi dati, ad esempio quando visiti noscite.it.
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Strumenti di Tracciamento</li>
                        <li>Dati di utilizzo</li>
                        <li>Numero di Utenti</li>
                        <li>Statistiche delle sessioni</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Terze parti affidabili che ci aiutano a trattarli</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Cloudflare, Inc.</li>
                        <li>Google LLC</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Come li usiamo</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Ottimizzazione e distribuzione del traffico</li>
                        <li>Visualizzazione di contenuti da piattaforme esterne</li>
                        <li>Statistica</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Titolare del trattamento */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Titolare del Trattamento dei Dati</h2>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="font-semibold">NOSCITE SRLS</p>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Via Monte Grappa 13, 20094 Corsico (MI)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <span>Indirizzo email del Titolare: </span>
                      <a href="mailto:info@noscite.it" className="text-primary hover:underline">info@noscite.it</a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tipologie di dati raccolti */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Tipo di Dati che raccogliamo</h2>
                  <p className="text-muted-foreground mb-4">
                    Fra i Dati Personali raccolti da questa Applicazione, in modo autonomo o tramite terze parti, ci sono:
                  </p>
                  
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                    <li>Strumenti di Tracciamento</li>
                    <li>Dati di utilizzo</li>
                    <li>Numero di Utenti</li>
                    <li>Statistiche delle sessioni</li>
                  </ul>

                  <p className="text-muted-foreground mb-4">
                    Dettagli completi su ciascuna tipologia di Dati Personali raccolti sono forniti nelle sezioni dedicate di questa privacy policy o mediante specifici testi informativi visualizzati prima della raccolta dei Dati stessi.
                  </p>
                  
                  <p className="text-muted-foreground mb-4">
                    I Dati Personali possono essere liberamente forniti dall'Utente o, nel caso di Dati di Utilizzo, raccolti automaticamente durante l'uso di questa Applicazione.
                  </p>

                  <p className="text-muted-foreground mb-4">
                    Se non diversamente specificato, tutti i Dati richiesti da questa Applicazione sono obbligatori. Se l'Utente rifiuta di comunicarli, potrebbe essere impossibile per questa Applicazione fornire il Servizio. Nei casi in cui questa Applicazione indichi alcuni Dati come facoltativi, gli Utenti sono liberi di astenersi dal comunicare tali Dati, senza che ciò abbia alcuna conseguenza sulla disponibilità del Servizio o sulla sua operatività.
                  </p>

                  <p className="text-muted-foreground mb-4">
                    Gli Utenti che dovessero avere dubbi su quali Dati siano obbligatori sono incoraggiati a contattare il Titolare.
                  </p>

                  <p className="text-muted-foreground mb-4">
                    L'eventuale utilizzo di Cookie - o di altri strumenti di tracciamento - da parte di questa Applicazione o dei titolari dei servizi terzi utilizzati da questa Applicazione ha la finalità di fornire il Servizio richiesto dall'Utente, oltre alle ulteriori finalità descritte nel presente documento e nella <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.
                  </p>

                  <p className="text-muted-foreground">
                    L'Utente si assume la responsabilità dei Dati Personali di terzi ottenuti, pubblicati o condivisi mediante questa Applicazione.
                  </p>
                </CardContent>
              </Card>

              {/* Modalità e luogo del trattamento */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Modalità e luogo del trattamento dei Dati raccolti</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Modalità di trattamento</h3>
                      <p className="text-muted-foreground mb-3">
                        Il Titolare adotta le opportune misure di sicurezza volte ad impedire l'accesso, la divulgazione, la modifica o la distruzione non autorizzate dei Dati Personali.
                      </p>
                      <p className="text-muted-foreground mb-3">
                        Il trattamento viene effettuato mediante strumenti informatici e/o telematici, con modalità organizzative e con logiche strettamente correlate alle finalità indicate. Oltre al Titolare, in alcuni casi, potrebbero avere accesso ai Dati altri soggetti coinvolti nell'organizzazione di questa Applicazione (personale amministrativo, commerciale, marketing, legali, amministratori di sistema) ovvero soggetti esterni (come fornitori di servizi tecnici terzi, corrieri postali, hosting provider, società informatiche, agenzie di comunicazione) nominati anche, se necessario, Responsabili del Trattamento da parte del Titolare. L'elenco aggiornato dei Responsabili potrà sempre essere richiesto al Titolare del Trattamento.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Luogo</h3>
                      <p className="text-muted-foreground mb-3">
                        I Dati sono trattati presso le sedi operative del Titolare ed in ogni altro luogo in cui le parti coinvolte nel trattamento siano localizzate. Per ulteriori informazioni, contatta il Titolare.
                      </p>
                      <p className="text-muted-foreground">
                        I Dati Personali dell'Utente potrebbero essere trasferiti in un paese diverso da quello in cui l'Utente si trova. Per ottenere ulteriori informazioni sul luogo del trattamento l'Utente può fare riferimento alla sezione relativa ai dettagli sul trattamento dei Dati Personali.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Periodo di conservazione</h3>
                      <p className="text-muted-foreground">
                        Se non diversamente indicato in questo documento, i Dati Personali sono trattati e conservati per il tempo richiesto dalla finalità per la quale sono stati raccolti e potrebbero essere conservati per un periodo più lungo a causa di eventuali obbligazioni legali o sulla base del consenso degli Utenti.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Finalità del trattamento */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Finalità del Trattamento dei Dati raccolti</h2>
                  <p className="text-muted-foreground mb-4">
                    I Dati dell'Utente sono raccolti per consentire al Titolare di fornire il Servizio, adempiere agli obblighi di legge, rispondere a richieste o azioni esecutive, tutelare i propri diritti ed interessi (o quelli di Utenti o di terze parti), individuare eventuali attività dolose o fraudolente, nonché per le seguenti finalità:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Ottimizzazione e distribuzione del traffico</li>
                    <li>Visualizzazione di contenuti da piattaforme esterne</li>
                    <li>Statistica</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Dettagli sul trattamento */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Dettagli sul trattamento dei Dati Personali</h2>
                  
                  <div className="space-y-6">
                    {/* Ottimizzazione traffico */}
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-semibold mb-2">Ottimizzazione e distribuzione del traffico</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Questo tipo di servizi permette a questa Applicazione di distribuire i propri contenuti tramite dei server dislocati sul territorio e di ottimizzare le prestazioni della stessa.
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        I Dati Personali trattati dipendono dalle caratteristiche e della modalità d'implementazione di questi servizi, che per loro natura filtrano le comunicazioni fra questa Applicazione ed il browser dell'Utente.
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Vista la natura distribuita di questo sistema, è difficile determinare i luoghi in cui vengono trasferiti i contenuti, che potrebbero contenere Dati Personali dell'Utente.
                      </p>
                      
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="font-semibold">Cloudflare</p>
                        <p className="text-sm text-muted-foreground">Azienda: Cloudflare, Inc.</p>
                        <p className="text-sm text-muted-foreground">Luogo del trattamento: Stati Uniti</p>
                        <p className="text-sm text-muted-foreground">Dati Personali trattati: Strumenti di Tracciamento, Dati di utilizzo</p>
                      </div>
                    </div>

                    {/* Statistica */}
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-semibold mb-2">Statistica</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        I servizi contenuti nella presente sezione permettono al Titolare del Trattamento di monitorare e analizzare i dati di traffico e servono a tener traccia del comportamento dell'Utente.
                      </p>
                      
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="font-semibold">Google Analytics 4</p>
                        <p className="text-sm text-muted-foreground">Azienda: Google LLC</p>
                        <p className="text-sm text-muted-foreground">Luogo del trattamento: Stati Uniti</p>
                        <p className="text-sm text-muted-foreground">Dati Personali trattati: Dati di utilizzo, numero di Utenti, statistiche delle sessioni</p>
                      </div>
                    </div>

                    {/* Contenuti esterni */}
                    <div className="border-l-4 border-primary pl-4">
                      <h3 className="font-semibold mb-2">Visualizzazione di contenuti da piattaforme esterne</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Questo tipo di servizi permette di visualizzare contenuti ospitati su piattaforme esterne direttamente dalle pagine di questa Applicazione e di interagire con essi. Tali servizi sono spesso definiti widget, ovvero piccoli elementi inseriti in un sito web o in un'applicazione. Forniscono informazioni specifiche o svolgono una funzione particolare e spesso consentono l'interazione con l'utente.
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        Questo tipo di servizio potrebbe comunque raccogliere dati sul traffico web relativo alle pagine dove il servizio è installato, anche quando gli utenti non lo utilizzano.
                      </p>
                      
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="font-semibold">Google Fonts</p>
                        <p className="text-sm text-muted-foreground">Azienda: Google LLC</p>
                        <p className="text-sm text-muted-foreground">Luogo del trattamento: Stati Uniti</p>
                        <p className="text-sm text-muted-foreground">Dati Personali trattati: Dati di utilizzo</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cookie Policy */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Cookie Policy</h2>
                  <p className="text-muted-foreground">
                    Questa Applicazione fa utilizzo di Strumenti di Tracciamento. Per saperne di più, gli Utenti possono consultare la{" "}
                    <Link to="/cookie-policy" className="text-primary hover:underline">Cookie Policy</Link>.
                  </p>
                </CardContent>
              </Card>

              {/* Ulteriori informazioni UE */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Ulteriori informazioni per gli utenti nell'Unione Europea</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Base giuridica del trattamento</h3>
                      <p className="text-muted-foreground mb-3">
                        Il Titolare tratta Dati Personali relativi all'Utente in caso sussista una delle seguenti condizioni:
                      </p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>l'Utente ha prestato il consenso per una o più finalità specifiche;</li>
                        <li>il trattamento è necessario all'esecuzione di un contratto con l'Utente e/o all'esecuzione di misure precontrattuali;</li>
                        <li>il trattamento è necessario per adempiere un obbligo legale al quale è soggetto il Titolare;</li>
                        <li>il trattamento è necessario per l'esecuzione di un compito di interesse pubblico o per l'esercizio di pubblici poteri di cui è investito il Titolare;</li>
                        <li>il trattamento è necessario per il perseguimento del legittimo interesse del Titolare o di terzi.</li>
                      </ul>
                      <p className="text-muted-foreground mt-3">
                        È comunque sempre possibile richiedere al Titolare di chiarire la concreta base giuridica di ciascun trattamento ed in particolare di specificare se il trattamento sia basato sulla legge, previsto da un contratto o necessario per concludere un contratto.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Ulteriori informazioni sul tempo di conservazione</h3>
                      <p className="text-muted-foreground mb-3">
                        Se non diversamente indicato in questo documento, i Dati Personali sono trattati e conservati per il tempo richiesto dalla finalità per la quale sono stati raccolti e potrebbero essere conservati per un periodo più lungo a causa di eventuali obbligazioni legali o sulla base del consenso degli Utenti.
                      </p>
                      <p className="text-muted-foreground mb-3">Pertanto:</p>
                      <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>I Dati Personali raccolti per scopi collegati all'esecuzione di un contratto tra il Titolare e l'Utente saranno trattenuti sino a quando sia completata l'esecuzione di tale contratto.</li>
                        <li>I Dati Personali raccolti per finalità riconducibili all'interesse legittimo del Titolare saranno trattenuti sino al soddisfacimento di tale interesse. L'Utente può ottenere ulteriori informazioni in merito all'interesse legittimo perseguito dal Titolare nelle relative sezioni di questo documento o contattando il Titolare.</li>
                        <li>Quando il trattamento è basato sul consenso dell'Utente, il Titolare può conservare i Dati Personali più a lungo sino a quando detto consenso non venga revocato. Inoltre, il Titolare potrebbe essere obbligato a conservare i Dati Personali per un periodo più lungo per adempiere ad un obbligo di legge o per ordine di un'autorità.</li>
                      </ul>
                      <p className="text-muted-foreground mt-3">
                        Al termine del periodo di conservazione i Dati Personali saranno cancellati. Pertanto, allo spirare di tale termine il diritto di accesso, cancellazione, rettificazione ed il diritto alla portabilità dei Dati non potranno più essere esercitati.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Diritti dell'Utente */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Diritti dell'Utente sulla base del Regolamento Generale sulla Protezione dei Dati (GDPR)</h2>
                  <p className="text-muted-foreground mb-4">
                    Gli Utenti possono esercitare determinati diritti con riferimento ai Dati trattati dal Titolare.
                  </p>
                  <p className="text-muted-foreground mb-4">
                    In particolare, nei limiti previsti dalla legge, l'Utente ha il diritto di:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Revocare il consenso</h3>
                      <p className="text-sm text-muted-foreground">
                        L'Utente può revocare il consenso al trattamento dei propri Dati Personali precedentemente espresso.
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Opporsi al trattamento</h3>
                      <p className="text-sm text-muted-foreground">
                        L'Utente può opporsi al trattamento dei propri Dati quando esso avviene in virtù di una base giuridica diversa dal consenso.
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Accedere ai propri Dati</h3>
                      <p className="text-sm text-muted-foreground">
                        L'Utente ha diritto ad ottenere informazioni sui Dati trattati dal Titolare, su determinati aspetti del trattamento ed a ricevere una copia dei Dati trattati.
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Verificare e chiedere la rettificazione</h3>
                      <p className="text-sm text-muted-foreground">
                        L'Utente può verificare la correttezza dei propri Dati e richiederne l'aggiornamento o la correzione.
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Ottenere la limitazione del trattamento</h3>
                      <p className="text-sm text-muted-foreground">
                        L'Utente può richiedere la limitazione del trattamento dei propri Dati. In tal caso il Titolare non tratterà i Dati per alcun altro scopo se non la loro conservazione.
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Ottenere la cancellazione</h3>
                      <p className="text-sm text-muted-foreground">
                        L'Utente può richiedere la cancellazione dei propri Dati da parte del Titolare.
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Ricevere i propri Dati</h3>
                      <p className="text-sm text-muted-foreground">
                        L'Utente ha diritto di ricevere i propri Dati in formato strutturato, di uso comune e leggibile da dispositivo automatico e, ove tecnicamente fattibile, di ottenerne il trasferimento senza ostacoli ad un altro titolare.
                      </p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Proporre reclamo</h3>
                      <p className="text-sm text-muted-foreground">
                        L'Utente può proporre un reclamo all'autorità di controllo della protezione dei dati personali competente o agire in sede giudiziale.
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground">
                    Gli Utenti hanno diritto di ottenere informazioni in merito alla base giuridica per il trasferimento di Dati all'estero incluso verso qualsiasi organizzazione internazionale regolata dal diritto internazionale o costituita da due o più paesi, come ad esempio l'ONU, nonché in merito alle misure di sicurezza adottate dal Titolare per proteggere i loro Dati.
                  </p>
                </CardContent>
              </Card>

              {/* Diritto di opposizione */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Dettagli sul diritto di opposizione</h2>
                  <p className="text-muted-foreground mb-4">
                    Quando i Dati Personali sono trattati nell'interesse pubblico, nell'esercizio di pubblici poteri di cui è investito il Titolare oppure per perseguire un interesse legittimo del Titolare, gli Utenti hanno diritto ad opporsi al trattamento per motivi connessi alla loro situazione particolare.
                  </p>
                  <p className="text-muted-foreground">
                    Si fa presente agli Utenti che, ove i loro Dati fossero trattati con finalità di marketing diretto, possono opporsi al trattamento in qualsiasi momento, gratuitamente e senza fornire alcuna motivazione. Qualora gli Utenti si oppongano al trattamento per finalità di marketing diretto, i Dati Personali non sono più oggetto di trattamento per tali finalità. Per scoprire se il Titolare tratti Dati con finalità di marketing diretto gli Utenti possono fare riferimento alle rispettive sezioni di questo documento.
                  </p>
                </CardContent>
              </Card>

              {/* Come esercitare i diritti */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Come esercitare i diritti</h2>
                  <p className="text-muted-foreground">
                    Eventuali richieste di esercizio dei diritti dell'Utente possono essere indirizzate al Titolare attraverso i recapiti forniti in questo documento. La richiesta è gratuita e il Titolare risponderà nel più breve tempo possibile, in ogni caso entro un mese, fornendo all'Utente tutte le informazioni previste dalla legge. Eventuali rettifiche, cancellazioni o limitazioni del trattamento saranno comunicate dal Titolare a ciascuno dei destinatari, se esistenti, a cui sono stati trasmessi i Dati Personali, salvo che ciò si riveli impossibile o implichi uno sforzo sproporzionato. Il Titolare comunica all'Utente tali destinatari qualora egli lo richieda.
                  </p>
                </CardContent>
              </Card>

              {/* Ulteriori informazioni sul trattamento */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Ulteriori informazioni sul trattamento</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Difesa in giudizio</h3>
                      <p className="text-muted-foreground">
                        I Dati Personali dell'Utente possono essere utilizzati da parte del Titolare in giudizio o nelle fasi preparatorie alla sua eventuale instaurazione per la difesa da abusi nell'utilizzo di questa Applicazione o dei Servizi connessi da parte dell'Utente. L'Utente dichiara di essere consapevole che il Titolare potrebbe essere obbligato a rivelare i Dati per ordine delle autorità pubbliche.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Informative specifiche</h3>
                      <p className="text-muted-foreground">
                        Su richiesta dell'Utente, in aggiunta alle informazioni contenute in questa privacy policy, questa Applicazione potrebbe fornire all'Utente delle informative aggiuntive e contestuali riguardanti Servizi specifici, o la raccolta ed il trattamento di Dati Personali.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Log di sistema e manutenzione</h3>
                      <p className="text-muted-foreground">
                        Per necessità legate al funzionamento ed alla manutenzione, questa Applicazione e gli eventuali servizi terzi da essa utilizzati potrebbero raccogliere log di sistema, ossia file che registrano le interazioni e che possono contenere anche Dati Personali, quali l'indirizzo IP Utente.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Informazioni non contenute in questa policy</h3>
                      <p className="text-muted-foreground">
                        Ulteriori informazioni in relazione al trattamento dei Dati Personali potranno essere richieste in qualsiasi momento al Titolare del Trattamento utilizzando gli estremi di contatto.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Modifiche a questa privacy policy</h3>
                      <p className="text-muted-foreground">
                        Il Titolare del Trattamento si riserva il diritto di apportare modifiche alla presente privacy policy in qualunque momento notificandolo agli Utenti su questa pagina e, se possibile, su questa Applicazione nonché, qualora tecnicamente e legalmente fattibile, inviando una notifica agli Utenti attraverso uno degli estremi di contatto di cui è in possesso. Si prega dunque di consultare con frequenza questa pagina, facendo riferimento alla data di ultima modifica indicata in fondo.
                      </p>
                      <p className="text-muted-foreground mt-2">
                        Qualora le modifiche interessino trattamenti la cui base giuridica è il consenso, il Titolare provvederà a raccogliere nuovamente il consenso dell'Utente, se necessario.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Definizioni e riferimenti legali */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Definizioni e riferimenti legali</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">Dati Personali (o Dati)</h3>
                      <p className="text-sm text-muted-foreground">
                        Costituisce dato personale qualunque informazione che, direttamente o indirettamente, anche in collegamento con qualsiasi altra informazione, ivi compreso un numero di identificazione personale, renda identificata o identificabile una persona fisica.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">Dati di Utilizzo</h3>
                      <p className="text-sm text-muted-foreground">
                        Sono le informazioni raccolte automaticamente attraverso questa Applicazione (anche da applicazioni di parti terze integrate in questa Applicazione), tra cui: gli indirizzi IP o i nomi a dominio dei computer utilizzati dall'Utente che si connette con questa Applicazione, gli indirizzi in notazione URI (Uniform Resource Identifier), l'orario della richiesta, il metodo utilizzato nell'inoltrare la richiesta al server, la dimensione del file ottenuto in risposta, il codice numerico indicante lo stato della risposta dal server (buon fine, errore, ecc.) il paese di provenienza, le caratteristiche del browser e del sistema operativo utilizzati dal visitatore, le varie connotazioni temporali della visita (ad esempio il tempo di permanenza su ciascuna pagina) e i dettagli relativi all'itinerario seguito all'interno dell'Applicazione, con particolare riferimento alla sequenza delle pagine consultate, ai parametri relativi al sistema operativo e all'ambiente informatico dell'Utente.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">Utente</h3>
                      <p className="text-sm text-muted-foreground">
                        L'individuo che utilizza questa Applicazione che, salvo ove diversamente specificato, coincide con l'Interessato.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">Interessato</h3>
                      <p className="text-sm text-muted-foreground">
                        La persona fisica cui si riferiscono i Dati Personali.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">Responsabile del Trattamento (o Responsabile)</h3>
                      <p className="text-sm text-muted-foreground">
                        La persona fisica, giuridica, la pubblica amministrazione e qualsiasi altro ente che tratta dati personali per conto del Titolare, secondo quanto esposto nella presente privacy policy.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">Titolare del Trattamento (o Titolare)</h3>
                      <p className="text-sm text-muted-foreground">
                        La persona fisica o giuridica, l'autorità pubblica, il servizio o altro organismo che, singolarmente o insieme ad altri, determina le finalità e i mezzi del trattamento di dati personali e gli strumenti adottati, ivi comprese le misure di sicurezza relative al funzionamento ed alla fruizione di questa Applicazione. Il Titolare del Trattamento, salvo quanto diversamente specificato, è il titolare di questa Applicazione.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">Questa Applicazione</h3>
                      <p className="text-sm text-muted-foreground">
                        Lo strumento hardware o software mediante il quale sono raccolti e trattati i Dati Personali degli Utenti.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">Servizio</h3>
                      <p className="text-sm text-muted-foreground">
                        Il Servizio fornito da questa Applicazione così come definito nei relativi termini (se presenti) su questo sito/applicazione.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">Unione Europea (o UE)</h3>
                      <p className="text-sm text-muted-foreground">
                        Salvo ove diversamente specificato, ogni riferimento all'Unione Europea contenuto in questo documento si intende esteso a tutti gli attuali stati membri dell'Unione Europea e dello Spazio Economico Europeo.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">Cookie</h3>
                      <p className="text-sm text-muted-foreground">
                        I Cookie sono Strumenti di Tracciamento che consistono in piccole porzioni di dati conservate all'interno del browser dell'Utente.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">Strumento di Tracciamento</h3>
                      <p className="text-sm text-muted-foreground">
                        Per Strumento di Tracciamento s'intende qualsiasi tecnologia - es. Cookie, identificativi univoci, web beacons, script integrati, e-tag e fingerprinting - che consenta di tracciare gli Utenti, per esempio raccogliendo o salvando informazioni sul dispositivo dell'Utente.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold">Riferimenti legali</h3>
                      <p className="text-sm text-muted-foreground">
                        Ove non diversamente specificato, questa informativa privacy riguarda esclusivamente questa Applicazione.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Come possiamo aiutare */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Come possiamo aiutare?</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Cosa puoi fare - I tuoi dati</h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Chiedici di conoscere e accedere alle informazioni di cui disponiamo che ti riguardano</li>
                        <li>Chiedici di correggere le informazioni di cui disponiamo che ti riguardano</li>
                        <li>Chiedici di esercitare il diritto all'oblio (eliminando le informazioni di cui disponiamo che ti riguardano)</li>
                        <li>Chiedici di trasferire i dati a un altro servizio</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">In caso di problemi</h3>
                      <p className="text-muted-foreground mb-3">
                        Benché ci impegniamo a creare un'esperienza utente positiva, sappiamo che occasionalmente possono verificarsi problemi tra noi e i nostri utenti. In tal caso, non esitare a contattarci.
                      </p>
                      <a href="mailto:info@noscite.it" className="inline-flex items-center text-primary hover:underline">
                        <Mail className="h-4 w-4 mr-2" />
                        info@noscite.it
                      </a>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg mt-4">
                      <h3 className="font-semibold mb-2">Autorità Garante per la Protezione dei Dati Personali</h3>
                      <p className="text-sm text-muted-foreground">Piazza Venezia 11, 00187 Roma</p>
                      <p className="text-sm text-muted-foreground">
                        Sito web:{" "}
                        <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                          www.garanteprivacy.it
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </p>
                    </div>
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

export default PrivacyPolicy;
