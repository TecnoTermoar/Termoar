const services = [
  {
    title: 'Ingeniería y selección',
    description: 'Lorem ipsum dolor sit amet.',
  },
  {
    title: 'Fabricación y ensamble',
    description: 'Lorem ipsum dolor sit amet.',
  },
  {
    title: 'Calibración / verificación',
    description: 'Lorem ipsum dolor sit amet.',
  },
  {
    title: 'Mantenimiento y recambio',
    description: 'Lorem ipsum dolor sit amet.',
  },
  {
    title: 'Puesta en marcha',
    description: 'Lorem ipsum dolor sit amet.',
  },
  {
    title: 'Capacitación',
    description: 'Lorem ipsum dolor sit amet.',
  },
]

function ServiceCard({ title, description }) {
  return (
    <article className="card service-card reveal reveal-up">
      <div className="media" aria-hidden="true"></div>
      <div className="card-body">
        <h3>{title}</h3>
        <p className="muted">{description}</p>
      </div>
    </article>
  )
}

export default function ServicesPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-head">
          <h1>Servicios</h1>
          <p className="muted reveal">
            Lorem ipsum dolor sit amet.
          </p>
        </div>

        <div className="cards three">
          {services.map((s) => (
            <ServiceCard key={s.title} title={s.title} description={s.description} />
          ))}
        </div>

        <div className="notice reveal">
          <p className="muted">
            Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
    </section>
  )
}
