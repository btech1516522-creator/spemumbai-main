import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import FeaturedEvents from '@/components/sections/FeaturedEvents'
import LeadershipPreview from '@/components/sections/LeadershipPreview'
import LatestNews from '@/components/sections/LatestNews'
import FeaturedSponsors from '@/components/sections/FeaturedSponsors'
import CallToAction from '@/components/sections/CallToAction'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navigation />
      {/* Spacer to push content below fixed navigation */}
      <div className="h-20"></div>
      <HeroSection />
      <CallToAction />
      <FeaturedEvents />
      <LatestNews />
      <LeadershipPreview />
      <FeaturedSponsors />
      <Footer />
    </main>
  )
} 