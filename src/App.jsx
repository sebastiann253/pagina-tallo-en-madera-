import { useCallback, useEffect, useState } from "react";

const WHATSAPP = "5493755673258";
const WHATSAPP_LABEL = "+54 9 3755 67-3258";
const INSTAGRAM = "https://www.instagram.com/woodarte.rtt/";
const MSG = "Hola, vi la web de Wood Arte RTT y quiero consultar por una pieza.";
const wa = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

const PIECES = [
  { src: "/images/lampara-rama.png", title: "Lámpara de rama", text: "Rama tallada a mano sobre base de madera maciza, con soga y foco globo a la vista." },
  { src: "/images/fuente-hoja.png", title: "Fuente en forma de hoja", text: "Tallada en una sola pieza. El veteado de la madera es su único adorno." },
  { src: "/images/bandeja-roja.png", title: "Bandeja teñida en rojo", text: "Tallada y teñida a mano, para ver la profundidad de cada curva." },
];

const STEPS = [
  { tab: "Vaciar", src: "/images/tallado-gubia.png", title: "La gubia saca la forma", text: "Con la gubia se va vaciando la madera de a poco. Las virutas finas son la señal de que el corte es limpio." },
  { tab: "Tallar el relieve", src: "/images/tallado-relieve.png", title: "El relieve se trabaja a mano", text: "Cada corte marca un detalle del dibujo. No hay moldes: la mano decide la profundidad." },
];

export default function App() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const [light, setLight] = useState(null); // índice en PIECES

  const move = useCallback((d) => setLight((i) => (i === null ? i : (i + d + PIECES.length) % PIECES.length)), []);

  useEffect(() => {
    const onKey = (e) => {
      if (light === null) return;
      if (e.key === "Escape") setLight(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [light, move]);

  const s = STEPS[step];

  return (
    <>
      <header className="nav">
        <a href="#inicio" className="logo">Wood Arte <span>RTT</span></a>
        <nav>
          <a href="#piezas">Piezas</a>
          <a href="#proceso">Proceso</a>
          <a href="#contacto" className="nav-cta">Contacto</a>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-copy">
            <h1>Arte y diseño exclusivos en madera</h1>
            <p>Piezas únicas hechas totalmente a mano. Transformá tus espacios con calidez.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={wa(MSG)} target="_blank" rel="noreferrer">Consultar por WhatsApp</a>
              <a className="btn btn-ghost" href="#piezas">Ver las piezas</a>
            </div>
          </div>
          <div className="hero-media">
            <img className="hero-main" src="/images/tallado-relieve.png" alt="Manos tallando un relieve en madera con una gubia" />
            <img className="hero-inset" src="/images/lampara-rama.png" alt="Lámpara de rama tallada" />
          </div>
        </section>

        <section id="piezas" className="section">
          <div className="section-head">
            <h2>Piezas hechas a mano</h2>
            <p>Pasá el cursor o tocá una pieza para abrirla. Con otro toque la ves en grande.</p>
          </div>
          <div className="accordion">
            {PIECES.map((p, i) => (
              <article
                key={p.title}
                className={`panel ${active === i ? "is-open" : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <img src={p.src} alt={p.title} loading="lazy" />
                <div className="panel-info">
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <button className="link-btn" onClick={() => (active === i ? setLight(i) : setActive(i))}>
                    {active === i ? "Ver en grande" : "Abrir"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="proceso" className="section proceso">
          <div className="proceso-grid">
            <div className="proceso-copy">
              <h2>Así se trabaja la madera</h2>
              <div className="tabs" role="tablist">
                {STEPS.map((t, i) => (
                  <button key={t.tab} role="tab" aria-selected={step === i} className={step === i ? "tab on" : "tab"} onClick={() => setStep(i)}>
                    {t.tab}
                  </button>
                ))}
              </div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <p className="note">Fotos ilustrativas del oficio de la talla en madera.</p>
            </div>
            <figure className="proceso-photo">
              {STEPS.map((t, i) => (
                <img key={t.src} src={t.src} alt={t.title} className={step === i ? "show" : ""} loading="lazy" />
              ))}
            </figure>
          </div>
        </section>

        <section id="contacto" className="section contacto">
          <div className="contacto-card">
            <h2>Hablemos de tu pieza</h2>
            <p>Escribinos por WhatsApp o mirá más trabajos en Instagram.</p>
            <div className="contact-list">
              <a href={wa(MSG)} target="_blank" rel="noreferrer"><span>WhatsApp</span><strong>{WHATSAPP_LABEL}</strong></a>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer"><span>Instagram</span><strong>@woodarte.rtt</strong></a>
              <div><span>Taller</span><strong>Terciado Paraíso, San Pedro, Misiones, Argentina</strong></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Wood Arte RTT</span>
        <a href={INSTAGRAM} target="_blank" rel="noreferrer">@woodarte.rtt</a>
      </footer>

      <a className="wa-float" href={wa(MSG)} target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp">WhatsApp</a>

      {light !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={PIECES[light].title} onClick={() => setLight(null)}>
          <button className="lb-btn lb-close" onClick={() => setLight(null)}>Cerrar</button>
          <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); move(-1); }} aria-label="Anterior">‹</button>
          <img src={PIECES[light].src} alt={PIECES[light].title} onClick={(e) => e.stopPropagation()} />
          <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); move(1); }} aria-label="Siguiente">›</button>
          <p className="lb-cap">{PIECES[light].title}</p>
        </div>
      )}
    </>
  );
}
