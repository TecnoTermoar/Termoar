import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useId, useState } from 'react'

const logoHeader = '/Logo-recortado-hd.png'
const logoFooter = '/Logo-recortado-hd.png'
const whatsappIcon = '/WhatsApp.png'

function getNavItems({ constructionMode }) {
  return [
    { to: '/', label: 'Inicio' },
    { to: '/productos', label: 'Productos', disabled: Boolean(constructionMode) },
    { to: '/servicios', label: 'Servicios', disabled: Boolean(constructionMode) },
    { to: '/nosotros', label: 'Nosotros' },
    { to: '/contacto', label: 'Contacto' },
  ]
}

function Header({ constructionMode }) {
  const location = useLocation()
  const menuId = useId()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navItems = getNavItems({ constructionMode })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <NavLink to="/" className="brand" aria-label="Ir a inicio">
          <img src={logoHeader} alt="Termometría Argentina" className="brand-logo" />
        </NavLink>

        <nav className="site-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
            item.disabled ? (
              <span key={item.to} className="nav-link is-disabled" aria-disabled="true">
                {item.label}
                <span className="nav-disabled-tag">En construcción</span>
              </span>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            )
          ))}
        </nav>

        <a
          className="wa-link"
          href="https://wa.me/5491144063448"
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          title="WhatsApp"
        >
          <span className="wa-icon" aria-hidden="true">
            <img className="wa-icon-img" src={whatsappIcon} alt="" />
          </span>
          <span className="wa-text">WhatsApp</span>
        </a>

        <button
          type="button"
          className={`menu-toggle${isMenuOpen ? ' is-open' : ''}`}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-controls={menuId}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          <span className="menu-toggle-bars" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      <div id={menuId} className={`mobile-menu${isMenuOpen ? ' is-open' : ''}`}>
        <div className="container mobile-menu-inner">
          <nav className="mobile-nav" aria-label="Navegación">
            {navItems.map((item) => (
              item.disabled ? (
                <span key={item.to} className="mobile-nav-link is-disabled" aria-disabled="true">
                  {item.label}
                  <span className="nav-disabled-tag">En construcción</span>
                </span>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `mobile-nav-link${isActive ? ' is-active' : ''}`}
                  end={item.to === '/'}
                >
                  {item.label}
                </NavLink>
              )
            ))}
          </nav>

          <a
            className="btn primary mobile-cta"
            href="https://wa.me/5491144063448"
            target="_blank"
            rel="noreferrer"
          >
            <img className="wa-inline-icon" src={whatsappIcon} alt="" />
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  )
}

function Footer({ constructionMode }) {
  const navItems = getNavItems({ constructionMode })
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src={logoFooter} alt="Termometría Argentina" className="footer-logo" />
          <p className="muted">
            Instrumentación y soluciones de termometría para procesos industriales.
          </p>
        </div>

        <div className="footer-col">
          <h3>Contacto</h3>
          <ul className="footer-list">
            <li>
              <a href="mailto:ventas@termoar.com.ar">ventas@termoar.com.ar</a>
            </li>
            <li className="muted">Tel/Fax: +54 9 11 4773-1139</li>
            <li>
              <a href="https://wa.me/5491144063448" target="_blank" rel="noreferrer">
                WhatsApp: +54 9 11 4406-3448
              </a>
            </li>
            <li className="muted">
              Gurruchaga 1177, Piso 4<br />
              Capital Federal (C1414), Argentina
            </li>
            <li>
              <a
                className="social-link"
                href="https://ar.linkedin.com/company/termometria-argentina-sa"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <img className="social-icon" src="/Linkedin.png" alt="" />
              </a>
            </li>
            <li className="muted">Argentina</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Páginas</h3>
          <ul className="footer-list">
            {navItems.map((item) => (
              <li key={item.to}>
                {item.disabled ? (
                  <span className="footer-link is-disabled" aria-disabled="true">
                    {item.label}
                  </span>
                ) : (
                  <NavLink to={item.to} end={item.to === '/'}>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="muted">
            © {new Date().getFullYear()} Termometría Argentina. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function SiteLayout({ constructionMode = false }) {
  return (
    <div className="site-shell">
      <Header constructionMode={constructionMode} />
      {constructionMode ? (
        <div className="construction-banner" role="status" aria-live="polite">
          <div className="container construction-banner-inner">
            <strong>Sitio en construcción</strong>
            <span className="muted">Por el momento, Productos y Servicios están inhabilitados.</span>
          </div>
        </div>
      ) : null}
      <main className="site-main" role="main">
        <Outlet />
      </main>
      <Footer constructionMode={constructionMode} />
    </div>
  )
}
