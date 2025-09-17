// import React from 'react'
// import Header from './components/Header/Header'
// import Footer from './components/Footer/Footer'
import ProvisionalLandingPage from "./pages/ProvisionalLandingPage" 
import Home from './pages/Home'
import Experience from './pages/Experience'
import Education from './pages/Education'
import Projects from './pages/Projects'
import Timeline from './pages/Timeline'
import { useEffect } from "react"
import { initLenis } from "./animations/lenisSetup"

function App() {
    useEffect(() => {
    initLenis() // ✅ global scroll smoothness
  }, [])
  return (
    <>
      {/* <Header /> */}
      <main>
        <ProvisionalLandingPage />
        {/* <Home />
        <Experience />
        <Education />
        <Projects />
        <Timeline /> */}
      </main>
      {/* <Footer /> */}
    </>
  )
}

export default App
