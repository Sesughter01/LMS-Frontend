
import WhyIs from './containers/whyIs'
import Hero from './containers/hero'


import Testimonial from './containers/testimonial'
import Offers from './containers/offers'
import Training from './containers/training'
import Quote from './containers/quote'
import NewsLetter from './containers/newsLetter'
import Footer from '@/components/Footer'


export default function Employers() {
  return (
    <main className="flex min-h-screen h-full flex-col">
      <Hero />
      <Offers />
      <WhyIs />
      <Training />
      <Quote />
      <NewsLetter />
      <Testimonial />
      <Footer />
    </main>
  )
}
