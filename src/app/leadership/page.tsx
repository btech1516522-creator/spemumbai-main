import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import CommitteeMember from '@/components/sections/CommitteeMember'
import { leadershipTeam } from '@/data/leadership'

export default function Leadership() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-spe-navy text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg">
            Our Leadership Team
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Meet the dedicated professionals leading the SPE Mumbai Section towards excellence in the oil and gas industry.
          </p>
        </div>
      </section>

      {/* Committee Members Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeam.map((member, index) => (
              <CommitteeMember
                key={member.name}
                member={member}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}