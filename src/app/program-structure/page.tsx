

import Hero from './containers/hero'
import Experience from './containers/experience'
import Empowering from './containers/empowering'
import Campaign from './containers/campaign'
import Duration from './containers/duration'
import Training from './containers/training'
import Scholarship from './containers/scholarship'
import Faqs from './containers/faqs'
import Footer from '@/components/Footer'


export default function Employers() {
  return (
    <main className="flex min-h-screen h-full flex-col">
      <Hero />
      <Duration />
      <Training />
      <Scholarship />
      <Campaign />
      <Faqs />
      <Footer />
    </main>
  )
}
