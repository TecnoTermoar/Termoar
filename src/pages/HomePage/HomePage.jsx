import { NavLink } from 'react-router-dom'

export default function HomePage({ constructionMode = false }) {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy reveal reveal-right">
            <p className="eyebrow">TERMOMETRÍA • INDUSTRIA • CALIDAD</p>
            <h1>Termometría Argentina</h1>
            <p className="lead">
              Fundada en 1979. Especialistas en medición de temperatura y análisis de gases
              para la industria.
            </p>
          </div>

          <div className="hero-card reveal reveal-left" aria-label="Resumen">
            <div className="stats">
              <div className="stat">
                <p className="stat-kpi">Calidad</p>
                <p className="muted">Sitio en Construcción</p>
              </div>
              <div className="stat">
                <p className="stat-kpi">Trazabilidad</p>
                <p className="muted">Sitio en Construcción</p>
              </div>
              <div className="stat">
                <p className="stat-kpi">Soporte</p>
                <p className="muted">Sitio en Construcción</p>
              </div>
            </div>
          </div>

          <div className="cta-row hero-cta">
            {constructionMode ? (
              <span className="btn primary is-disabled" aria-disabled="true">
                Ver productos
                <span className="nav-disabled-tag">En construcción</span>
              </span>
            ) : (
              <NavLink className="btn primary" to="/productos">
                Ver productos
              </NavLink>
            )}
            {constructionMode ? (
              <span className="btn primary is-disabled" aria-disabled="true">
                Ver servicios
                <span className="nav-disabled-tag">En construcción</span>
              </span>
            ) : (
              <NavLink className="btn primary" to="/servicios">
                Ver servicios
              </NavLink>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="reveal">¿Qué hacemos?</h2>
          <p className="muted reveal">
            Comercializamos instrumentos y servicios para la industria, orientados a resolver
            requerimientos técnicos en medición de temperatura y análisis de gases.
          </p>

          <div className="cards three">
            <article className="card reveal reveal-up">
              <h3>Instrumentación</h3>
              <p className="muted">
                Detectores de gases fijos y portátiles, registradores (data loggers), transmisores
                de temperatura y gases para instrumentación y control.
              </p>
            </article>
            <article className="card reveal reveal-up">
              <h3>Seguridad</h3>
              <p className="muted">
                Sistemas de detección de incendio y gases, y elementos de seguridad para trabajos
                en la industria.
              </p>
            </article>
            <article className="card reveal reveal-up">
              <h3>Laboratorio</h3>
              <p className="muted">
                Instrumentos de análisis de laboratorio. Asesoramiento técnico personalizado.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2 className="reveal">¿Cómo lo hacemos?</h2>
          <div className="steps">
            <div className="step reveal reveal-up">
              <p className="step-n">1</p>
              <p className="step-t">Definimos el punto de medición</p>
              <p className="muted">Sitio en Construcción</p>
            </div>
            <div className="step reveal reveal-up">
              <p className="step-n">2</p>
              <p className="step-t">Seleccionamos el conjunto</p>
              <p className="muted">Sitio en Construcción</p>
            </div>
            <div className="step reveal reveal-up">
              <p className="step-n">3</p>
              <p className="step-t">Documentación y entrega</p>
              <p className="muted">Sitio en Construcción</p>
            </div>
          </div>

          <div className="cta-row reveal">
            <NavLink className="btn primary" to="/contacto">
              Solicitar cotización
            </NavLink>
            <a className="btn primary" href="https://wa.me/5491144063448" target="_blank" rel="noreferrer">
              <img className="wa-inline-icon" src="/WhatsApp.png" alt="" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
