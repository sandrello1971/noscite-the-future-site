import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const Cards = () => {
  useEffect(() => {
    const head = document.getElementsByTagName("head")[0];

    const loadCSS = (src: string) => {
      // Evita di duplicare il tag link se esiste già
      if (document.querySelector(`link[href="${src}"]`)) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = src;
      link.media = "all";
      head.appendChild(link);
    };

    const loadJS = (src: string) => {
      if (document.querySelector(`script[src="${src}"]`)) return;
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = src;
      head.appendChild(script);
    };

    const ts = new Date().getTime();
    const cssSrc = `https://kipin.app/_css/custom-domain.css?ts=${ts}`;
    const jsSrc = `https://kipin.app/_js/custom-domain.js?ts=${ts}`;

    loadCSS(cssSrc);
    loadJS(jsSrc);
  }, []);

  return (
    <>
      <Helmet>
        <title>My business card | Noscite</title>
        <meta
          name="description"
          content="Biglietto da visita digitale Noscite, generato tramite integrazione Kipin."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://noscite.it/card" />
      </Helmet>
      <main className="min-h-screen bg-background">
        {/* Il contenuto verrà gestito dagli script Kipin caricati dinamicamente */}
        <p className="sr-only">
          Pagina del biglietto da visita digitale Noscite.
        </p>
      </main>
    </>
  );
};

export default Cards;
