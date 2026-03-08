import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import CommitteeMember from '@/components/sections/CommitteeMember'
import { leadershipTeam } from '@/data/leadership'
import { prisma } from '@/lib/db'

async function getLeadershipMembers() {
  try {
    const members = await prisma.leadershipMember.findMany({
      orderBy: { sortOrder: 'asc' },
    })
    if (members.length > 0) {
      return members.map((m) => ({
        name: m.name,
        position: m.position,
        organization: m.organization,
        bio: m.bio,
        linkedin: m.linkedin ?? undefined,
        image: m.image ?? undefined,
      }))
    }
  } catch {
    // fall through to static data
  }
  return leadershipTeam
}

export const revalidate = 0

export default async function Leadership() {
  const members = await getLeadershipMembers()

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
      <section className="section-padding bg-[#eaf2fb]">
        <div className="container-custom">
          {/* First member centered in a single row */}
          <div className="flex justify-center mb-8">
            <div className="w-full md:w-2/3 lg:w-1/2">
              <CommitteeMember
                key={members[0].name}
                member={members[0]}
                index={0}
              />
            </div>
          </div>
          {/* Rest of the members in grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.slice(1).map((member, index) => (
              <CommitteeMember
                key={member.name}
                member={member}
                index={index + 1}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}