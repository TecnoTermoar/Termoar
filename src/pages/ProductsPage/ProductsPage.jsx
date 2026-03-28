const products = [
  {
    title: 'Sensores RTD / PT100',
    description: 'Lorem ipsum dolor sit amet.',
  },
  {
    title: 'Termopares (Tipo K, J, T, etc.)',
    description: 'Lorem ipsum dolor sit amet.',
  },
  {
    title: 'Vainas termométricas',
    description: 'Lorem ipsum dolor sit amet.',
  },
  {
    title: 'Transmisores y cabezales',
    description: 'Lorem ipsum dolor sit amet.',
  },
  {
    title: 'Cables y accesorios',
    description: 'Lorem ipsum dolor sit amet.',
  },
  {
    title: 'Conjuntos especiales',
    description: 'Lorem ipsum dolor sit amet.',
  },
]

function ProductCard({ title, description }) {
  return (
    <article className="card product-card reveal reveal-up">
      <div className="media" aria-hidden="true"></div>
      <div className="card-body">
        <h3>{title}</h3>
        <p className="muted">{description}</p>
      </div>
    </article>
  )
}

export default function ProductsPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-head">
          <h1>Productos</h1>
          <p className="muted reveal">Lorem ipsum dolor sit amet.</p>
        </div>

        <div className="cards three">
          {products.map((p) => (
            <ProductCard key={p.title} title={p.title} description={p.description} />
          ))}
        </div>

        <div className="notice reveal">
          <p className="muted">Lorem ipsum dolor sit amet.</p>
        </div>
      </div>
    </section>
  )
}
