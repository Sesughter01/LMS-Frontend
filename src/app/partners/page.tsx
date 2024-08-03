

import Hero from './containers/hero'
import HowTo from './containers/howTo'
import Experience from './containers/experience'
import Empowering from './containers/empowering'
import Campaign from './containers/campaign'
import Footer from '@/components/Footer'


export default function Employers() {
  return (
    <main className="flex min-h-screen h-full flex-col">
      <Hero />
      <HowTo />
      <Experience />
      <Empowering />
      <Campaign />
      <Footer />
    </main>
  )
}
