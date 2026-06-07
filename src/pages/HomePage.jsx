import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import BrandStrip from '../components/BrandStrip'
import About from '../components/About'
import Services from '../components/Services'
import FeaturedWork from '../components/FeaturedWork'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <BrandStrip />
        <About />
        <Services />
        <FeaturedWork />
      </main>
      <Footer />
    </div>
  )
}
