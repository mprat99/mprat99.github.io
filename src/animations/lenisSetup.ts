import Lenis from '@studio-freight/lenis'

let lenis: Lenis | null = null

interface LenisScrollEvent {
  scroll: number
  limit: number
  velocity: number
  direction: 1 | -1
  progress: number
}

type ScrollCallback = (progress: number) => void
let scrollCallbacks: ScrollCallback[] = []

export const initLenis = () => {
  if (lenis) return lenis

  lenis = new Lenis({
    lerp: 0.1,
    duration: 1.2,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
  })

  lenis.on('scroll', (e: LenisScrollEvent) => {
    scrollCallbacks.forEach((cb) => cb(e.progress))
  })

  const raf = (time: number) => {
    lenis?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return lenis
}

export const onScrollProgress = (cb: ScrollCallback) => {
  scrollCallbacks.push(cb)
}

export const scrollToSection = (selector: string) => {
  if (!lenis) initLenis()
  const el = document.querySelector<HTMLElement>(selector)
  if (el && lenis) {
    lenis.scrollTo(el, {
      offset: 0,
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    })
  }
}
