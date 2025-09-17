// pages/Home.tsx
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import RobotModel from '../components/RobotModel'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const modelRef = useRef<any>(null)

  useEffect(() => {
    // Title shrink + move
    gsap.to(titleRef.current, {
      scale: 0.6,
      xPercent: -50,
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top top',
        end: '+=500',
        scrub: true,
      },
    })

    // About fade-in
    gsap.fromTo(
      aboutRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    )

    // 3D model rotation
    if (modelRef.current) {
      gsap.to(modelRef.current.rotation, {
        y: Math.PI * 2,
        duration: 8,
        repeat: -1,
        ease: 'linear',
      })
    }
  }, [])

  return (
    <div className="h-[200vh] w-full bg-black text-white relative">
      {/* Hero Title */}
      <h1
        ref={titleRef}
        className="text-6xl font-bold absolute top-20 left-1/2 -translate-x-1/2"
      >
        Welcome to My Portfolio
      </h1>

      {/* About Section */}
      <div
        ref={aboutRef}
        className="absolute top-[120vh] left-1/2 -translate-x-1/2 text-xl w-2/3 text-center"
      >
        <p>
          Hi, I’m a developer passionate about robotics, 3D design, and
          interactive UIs. Scroll down to explore my work.
        </p>
      </div>

      {/* 3D Model */}
      <div className="absolute right-10 top-1/3 h-[400px] w-[400px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 100 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <RobotModel ref={modelRef} scale={0.05} />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </div>
  )
}
