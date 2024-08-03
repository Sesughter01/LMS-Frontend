
import Hero from './containers/hero'


import Testimonial from './containers/testimonial'
import Training from './containers/training'
import HowTo from './containers/howTo'
import Placement from './containers/placement'
import Scholarship from './containers/scholarship'
import Footer from '@/components/Footer'


export default function Employers() {
  return (
    <main className="flex min-h-screen h-full flex-col">
      <Hero />
      <Training />
      <HowTo />
      <Placement />
      <Scholarship />
      <Testimonial />
      <Footer/>
    </main>
  )
}
