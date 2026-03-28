export default function AboutPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="page-head">
            <h1>Nosotros</h1>
            <p className="muted reveal">
              Fundada en 1979. Nos dedicamos a la comercialización de instrumentos y servicios para la industria,
              orientados a brindar soluciones a requerimientos técnicos de la industria moderna en el campo de
              medición de temperatura y análisis de gases.
            </p>
          </div>

          <div className="two-col">
            <div className="card reveal reveal-up">
              <h3>Objetivo</h3>
              <p className="muted">
                Brindar y ofrecer soluciones a los diversos requerimientos técnicos que exige la industria moderna,
                con asesoramiento técnico personalizado y foco en calidad.
              </p>
            </div>
            <div className="card reveal reveal-up">
              <h3>Especialidades</h3>
              <p className="muted">
                Gases, seguridad, incendio, detectores, calibración, instrumentación, control, temperatura,
                laboratorio propio, servicio.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt">
        <div className="container">
          <h2 className="reveal">Marcas y servicios</h2>
          <p className="muted reveal">
            Distribuimos equipos y productos de primeras marcas a nivel global. Además, ofrecemos mantenimiento y
            calibración en laboratorio propio.
          </p>

          <div className="cards three">
            <div className="card reveal reveal-up">
              <h3>Distribución</h3>
              <p className="muted">
                Detectores de gases, data loggers, transmisores, sistemas de incendio y gases,
                instrumentos de análisis de laboratorio.
              </p>
            </div>
            <div className="card reveal reveal-up">
              <h3>Servicio</h3>
              <p className="muted">
                Asesoramiento técnico personalizado, mantenimiento y calibración.
              </p>
            </div>
            <div className="card reveal reveal-up">
              <h3>Seguridad</h3>
              <p className="muted">
                Sistemas de detección de incendio y gases y elementos de seguridad.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
