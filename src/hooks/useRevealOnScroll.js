import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function prefersReducedMotion() {
  if (typeof window === 'undefined') return true
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
}

export default function useRevealOnScroll(options = {}) {
  const {
    selector = '.reveal',
    rootMargin = '0px 0px -10% 0px',
    threshold = 0.12,
  } = options

  const location = useLocation()

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (typeof window === 'undefined') return

    const elements = Array.from(document.querySelectorAll(selector))
    if (!elements.length) return

    // On SPA navigation, some elements might already be in view.
    // Ensure they don't remain hidden while waiting for an IO callback.
    for (const el of elements) {
      const rect = el.getBoundingClientRect?.()
      if (!rect) continue
      const isInViewport = rect.top < window.innerHeight * 0.92 && rect.bottom > 0
      if (isInViewport) el.classList.add('is-in')
      else el.classList.remove('is-in')
    }

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-in'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        }
      },
      { root: null, rootMargin, threshold },
    )

    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [selector, rootMargin, threshold, location.key])
}
