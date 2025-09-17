import gsap from 'gsap'

export const animateSections = () => {
  // gsap.from('.section', {
  //   opacity: 0,
  //   y: 50,
  //   duration: 1,
  //   stagger: 0.3,
  //   ease: 'power3.out',
  //   scrollTrigger: {
  //     trigger: '.section',
  //     start: 'top 80%',
  //     end: 'bottom 20%',
  //     toggleActions: 'play none none reverse',
  //   },
  // })
  gsap.fromTo('.section',
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: 'power3.out',
    scrollTrigger: {
      trigger: '.section',
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
    },
  }
)
}
