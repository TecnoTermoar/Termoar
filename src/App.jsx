import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout/SiteLayout.jsx'
import HomePage from './pages/HomePage/HomePage.jsx'
import ProductsPage from './pages/ProductsPage/ProductsPage.jsx'
import ServicesPage from './pages/ServicesPage/ServicesPage.jsx'
import AboutPage from './pages/AboutPage/AboutPage.jsx'
import ContactPage from './pages/ContactPage/ContactPage.jsx'
import useRevealOnScroll from './hooks/useRevealOnScroll.js'

const CONSTRUCTION_MODE = true

function UnderConstructionPage({ title }) {
  return (
    <section className="section">
      <div className="container">
        <div className="page-head">
          <h1>{title}</h1>
          <p className="muted reveal">
            <strong>Sitio en construcción.</strong> Por el momento, esta sección está inhabilitada.
          </p>
        </div>
      </div>
    </section>
  )
}

function App() {
  useRevealOnScroll()

  return (
    <Routes>
      <Route element={<SiteLayout constructionMode={CONSTRUCTION_MODE} />}>
        <Route path="/" element={<HomePage constructionMode={CONSTRUCTION_MODE} />} />
        <Route
          path="/productos"
          element={CONSTRUCTION_MODE ? <UnderConstructionPage title="Productos" /> : <ProductsPage />}
        />
        <Route
          path="/servicios"
          element={CONSTRUCTION_MODE ? <UnderConstructionPage title="Servicios" /> : <ServicesPage />}
        />
        <Route path="/nosotros" element={<AboutPage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
