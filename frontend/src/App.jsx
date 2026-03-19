import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Admin from './components/Admin'

function App() {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const handleRouteChange = () => {
      setIsAdmin(window.location.pathname === '/admin')
    }

    window.addEventListener('popstate', handleRouteChange)
    handleRouteChange()

    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])

  if (isAdmin) {
    return (
      <div className="w-full min-h-screen">
        <Navigation />
        <Admin />
        <Footer />
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
