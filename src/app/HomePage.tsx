import Hero from './homepage/Hero'
import Romantic from './homepage/Romantic'
import Services from './build_pkg/Services'
import Testimonials from './homepage/Testimonials'
import TrendingPackages from './homepage/TrendingPackages'

export default function Home() {
  return (
    <div className='pt-20'>
      <Hero />
      <Romantic/>
      <TrendingPackages/>
      <Testimonials/>
      <Services />
    </div>
  )
}
