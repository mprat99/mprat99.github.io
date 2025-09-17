import { useEffect, useRef, useState } from 'react'
import { initLenis, onScrollProgress, scrollToSection } from '../animations/lenisSetup'

export default function ProvisionalLandingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const currentSectionRef = useRef(0)
  const [, forceUpdate] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [, setIsScrolling] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)

  // Add this state near your other state declarations
  const [isHeroActive, setIsHeroActive] = useState(false);

  useEffect(() => {
    // Trigger hero animation after component mounts
    const heroTimer = setTimeout(() => {
      setIsHeroActive(true);
    }, 200); // Delay to match with the background fade-in
    
    return () => clearTimeout(heroTimer);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  ]

const sections = [
  { title: "Hi, I'm Marc 👋", subtitle: "Industrial & Electromechanical Engineer", type: "hero" },
  { 
    title: "About Me", 
      content: `
      I’m always curious and love figuring out how things work — learning by doing is my favorite approach. I enjoy tackling problems, fixing broken gadgets at home, and building DIY projects using tools and parts like my 3D printer, electronics, batteries, motors, Arduino.  

      Sports and movement have always been part of my life: I played basketball for over 10 years, DJed for fun, and recently I got into running — completing a marathon (3h15) and three half-marathons (1h25) in under a year! 🏃‍♂️🚀  

      I speak Catalan, Spanish, and English fluently, and I’ve recently added Italian to the mix — Ora posso parlare anche Italiano!  

      On the professional side, I have a background in Industrial & Electromechanical Engineering, combined with 2 years of hands-on experience in software development and project management. I enjoy connecting technical knowledge with practical problem-solving and bringing ideas from concept to reality.  

      In short: curious, creative, and always eager to learn and take on new challenges!`,
  type: "about"
},
  { 
    title: "My Academic\n and Professional Journey", 
    content: `
    🎓 My journey began studying a BSc in Industrial Engineering at UPC Barcelona.\n
    💻 I developed my final thesis on EVSE communication at SALICRU, grew into a Software Engineer role, then transitioned to Project Management to lead IoT development for solar inverters.\n
    🌍 After 2 years, I moved to Brussels for a Master's in Electromechanical Engineering (Robotics specialization) at ULB-VUB, followed by an Erasmus experience at La Sapienza in Rome where I embraced both Robotics and Mechanical engineering, and Italian language and culture.\n
    🚀 Now I'm back, ready to tackle new challenges with my unique blend of industrial and electromechanical engineering, software development, and international experience!`, 
    type: "about" 
  },
  {
  title: "Projects",
  content: `
🧤 Heated Gloves – Wearable Electronics Project 
My hands have always been very cold, so I set out to design the most powerful and comfortable heated gloves ever. I started testing Nichrome wire as a heating element, then moved to a fabric-like carbon fiber that provides more comfort, uniform heating, and infrared warmth. Powered by 12V 3S 18650 batteries, I designed a custom PCB with an OLED display, MOSFETs, thermistors, and buttons to control temperature via PWM. I even hand-sewed a fine cotton glove layer between the carbon fiber and the outer glove for maximum comfort and protection.  

🪟 Automatic IoT Awnings
I designed and built automated awnings using stepper motors, 3D-printed components (including a worm gear and motor brackets), a custom electronics board, and recycled lithium batteries. An ESP-32 enables remote control via a web portal. Features include sensorless homing, sunrise/sunset and rain detection, scheduled movement and power-saving strategies.  

📺 Streaming Android TV App
I modified a Java Android TV app template, created a backend API hosted on Google Cloud, and enabled live streaming via AceStream. The app scraps data from webpages on demand, retrieves AceStream links, and streams them on the Android TV player. It includes a variety of useful features for a smooth user experience.  

➕ Other Projects  
Additional personal and university projects will be added soon, including electronics experiments, resistance of materials projects (e.g., designing and testing mini-beams), software projects, and more.  

`,
  type: "about"
},
  { 
    title: "Complete Portfolio\nComing Soon", 
    content: "It looks like you arrived here too early 🚀\nUnfortunately for both of us, this webpage isn't ready yet!", 
    type: "message" 
  },
  { 
    title: "Get in Touch", 
    content: "Meanwhile, you can reach me at +34 635 291 546 📞\nor via email at mprat99@gmail.com\nI'll be happy to tell you more about me.", 
    type: "contact" 
  },
  { 
    title: "Stay Tuned", 
    content: "I'll keep working on this cool portfolio 🚧\nSee you!", 
    type: "final" 
  }
]

  useEffect(() => {
    // const lenis = initLenis()
    initLenis();

    // Add smooth scroll behavior for wheel events
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 50) {
        setIsScrolling(true)
        clearTimeout((window as any).scrollTimeout)
        ;(window as any).scrollTimeout = setTimeout(() => setIsScrolling(false), 800)
      }
    }
    
    window.addEventListener('wheel', handleWheel, { passive: true })
    setTimeout(() => setIsLoaded(true), 200)

    const sectionEls = containerRef.current?.querySelectorAll('.scroll-section') || []

    // Lenis scroll callback
    onScrollProgress((progress) => {
      setScrollProgress(progress)

      // Determine current section with improved centering logic
      const scrollY = progress * (document.documentElement.scrollHeight - window.innerHeight)
      let newSection = 0
      let closestDistance = Infinity
      
      sectionEls.forEach((section, index) => {
        const rect = section.getBoundingClientRect()
        const sectionTop = window.scrollY + rect.top
        const sectionMiddle = sectionTop + rect.height / 2
        const viewportMiddle = scrollY + window.innerHeight / 2
        const distanceToMiddle = Math.abs(viewportMiddle - sectionMiddle)
        
        if (distanceToMiddle < closestDistance) {
          closestDistance = distanceToMiddle
          newSection = index
        }
      })

      if (currentSectionRef.current !== newSection) {
        currentSectionRef.current = newSection
        forceUpdate(v => v + 1)
      }
    })

    return () => {
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])


  // Floating Orb Component
  const FloatingOrb = ({ size, color, top, left, delay }: { size: number; color: string; top: string; left: string; delay: number }) => (
    <div
      className="fixed rounded-full opacity-20 pointer-events-none"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, ${color}, transparent)`,
        top,
        left,
        filter: 'blur(40px)',
        animation: `float 8s ease-in-out ${delay}s infinite`
      }}
    />
  )

  // Navigation Dots - only show on desktop
  const NavigationDots = () => (
    windowWidth > 768 ? (
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20 flex flex-col space-y-4">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(`#section-${index}`)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSectionRef.current === index 
                ? 'bg-white scale-150' 
                : 'bg-white bg-opacity-40 hover:bg-opacity-70'
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    ) : null
  )

  return (
    <div ref={containerRef} className="relative">
      {/* Custom animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-black bg-opacity-10 z-30">
        <div
          className="h-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500 shadow-lg transition-all duration-150 ease-out"
          style={{
            width: `${scrollProgress * 100}%`,
            boxShadow: '0 0 15px rgba(192, 38, 211, 0.6)',
          }}
        />
      </div>

      {/* Background with smooth transition */}
      <div
        className="fixed inset-0 transition-all duration-1000 ease-out"
        style={{ 
          background: gradients[currentSectionRef.current], 
          zIndex: -2,
          opacity: isLoaded ? 1 : 0
        }}
      />
      <div className="fixed inset-0 bg-black bg-opacity-20" style={{ zIndex: -1 }} />

      {/* Floating Orbs with more elements */}
      <FloatingOrb size={200} color="#ffffff" top="10%" left="80%" delay={0} />
      <FloatingOrb size={150} color="#ff6b6b" top="60%" left="5%" delay={1} />
      <FloatingOrb size={120} color="#4ecdc4" top="20%" left="15%" delay={2} />
      <FloatingOrb size={180} color="#45b7d1" top="75%" left="75%" delay={0.5} />
      <FloatingOrb size={100} color="#f9cb28" top="40%" left="90%" delay={1.5} />
      <FloatingOrb size={130} color="#ff7eb3" top="80%" left="25%" delay={2.5} />
  

      {/* Navigation Dots (desktop only) */}
      <NavigationDots />

      {/* Sections with improved transitions and centering */}
      {sections.map((section, index) => {
        // Calculate distance from current section for smooth transitions
        const distance = Math.abs(currentSectionRef.current - index)
        const isActive = currentSectionRef.current === index
        
        return (
          <div
            key={index}
            id={`section-${index}`}
            className="scroll-section min-h-screen flex items-center justify-center px-4 md:px-8 relative py-20"
          >
            <div
              className="text-center max-w-5xl transform transition-all duration-1000 ease-out"
              style={{
                opacity: isLoaded ? 
                  (isActive ? 1 : 0.7 - distance * 0.2) 
                  : 0,
                transform: `translateY(${isLoaded ? 
                  (isActive ? 0 : (currentSectionRef.current - index) * 20) 
                  : 10}px) scale(${isActive ? 1 : 0.97})`,
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                filter: `blur(${distance * 0.4}px)`
              }}
            >
              {section.type === 'hero' && (
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight">
                    {section.title}
                  </h1>
                  <p className="text-xl md:text-3xl text-white text-opacity-90 font-light">
                    {section.subtitle}
                  </p>
                  <div 
                    className="w-24 h-1 bg-white bg-opacity-60 mx-auto mt-8 rounded-full transition-all duration-1000 ease-out" 
                  style={{ 
                    transform: `scaleX(${(isActive && isHeroActive) ? 1 : 0.5})`,
                    opacity: (isActive && isHeroActive) ? 1 : 0.5,
                    transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out'
                  }} 
                  />
                </div>
              )}
              {section.type === 'about' && (
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                    {section.title}
                  </h2>
                  <p className="text-lg md:text-2xl text-white text-opacity-90 leading-normal max-w-4xl mx-auto whitespace-pre-wrap">
                    {section.content}
                  </p>
                </div>
              )}
              {(section.type === 'message' || section.type === 'contact' || section.type === 'final') && (
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 whitespace-pre-wrap">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.content?.split('\n').map((line, lineIndex) => (
                      <p
                        key={lineIndex}
                        className={`text-white text-opacity-90 leading-normal ${
                          section.type === 'contact' ? 'text-base md:text-xl' : 'text-lg md:text-2xl'
                        }`}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}

      {/* Scroll indicator with improved animation */}
      {currentSectionRef.current === 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-white text-opacity-70 z-10">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <span className="text-xs font-light tracking-widest">SCROLL</span>
            <div className="w-px h-8 bg-white bg-opacity-50" />
          </div>
        </div>
      )}
    </div>
  )
}