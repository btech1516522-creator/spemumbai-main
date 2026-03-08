import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { prisma } from '@/lib/db'

const staticGalleryEvents = [
  { slug: 'techconnect6', title: '#TechConnect: AI: A Tool For Defense And A Weapon For Cyber Attack', date: '16 June 2025', coverImage: '/images/gallery5/photo2.jpeg', active: true },
  { slug: 'techconnect4', title: '#TechConnect: On Hydraulic Fracturing', date: '13 May 2025', coverImage: '/images/gallery4/img1.jpg', active: true },
  { slug: 'techconnect1', title: 'Industry Academia Interaction', date: '05 April 2025', coverImage: '/images/gallery1/img1.jpeg', active: true },
  { slug: 'techconnect2', title: 'A Night of Insights & Celebrations!', date: '17 March 2025', coverImage: '/images/gallery2/img1.jpeg', active: true },
  { slug: 'techconnect3', title: '#TechConnect: An Engaging & Impactful Session!', date: 'February 2025', coverImage: '/images/gallery3/img1.jpeg', active: true },
  { slug: 'techconnect5', title: "#TechConnect: The Future of Energy and The Role of SPE in Shaping the Industry's Trajectory", date: '30 April 2024', coverImage: '/images/student-chapters/ig1.jpg', active: true },
]

async function getGalleryEvents() {
  try {
    const rows = await prisma.galleryEvent.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } })
    if (rows.length > 0) return rows
  } catch {}
  return staticGalleryEvents
}

export const revalidate = 0

export default async function Gallery() {
  const galleryEvents = await getGalleryEvents()

  return (
    <main className="flex flex-col min-h-screen">
      <Navigation />

      <section className="pt-32 pb-16 bg-spe-navy text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg">Gallery</h1>
          <p className="text-xl text-blue-100 max-w-3xl">Explore memorable moments from our events and activities.</p>
        </div>
      </section>

      <section className="section-padding bg-[#eaf2fb]">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {galleryEvents.map((event) => (
              <div
                key={event.slug}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border border-spe-blue/10 overflow-hidden mx-auto"
                style={{ height: '320px', width: '320px', minWidth: '260px', maxWidth: '340px' }}
              >
                <div className="relative h-[220px] w-full flex items-center justify-center bg-gray-100">
                  <Image src={event.coverImage} alt={event.title} fill className="object-cover" />
                </div>
                <div className="p-2 flex flex-col justify-between flex-grow">
                  <h3 className="text-base font-semibold text-spe-navy text-center mb-1 line-clamp-2">{event.title}</h3>
                  <div className="text-xs text-spe-blue text-center mb-2">{event.date}</div>
                  <Link
                    href={`/gallery/${event.slug}`}
                    className="inline-block px-4 py-1 bg-blue-600 text-white text-xs font-semibold rounded-md text-center transition-colors duration-200 mx-auto"
                  >
                    Click to View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

