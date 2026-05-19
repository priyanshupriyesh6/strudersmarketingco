import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import BrandStrip from '../components/BrandStrip'
import Footer from '../components/Footer'
import VideoScrollScene from '../components/VideoScrollScene'

export default function HomePage() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main>
        <Hero />
        {/* Brand video scroll scene after hero */}
        <VideoScrollScene height="200vh" label="Struders Marketing Co." />
        <Stats />
        <BrandStrip />
      </main>
      <Footer />
    </div>
  )
}
