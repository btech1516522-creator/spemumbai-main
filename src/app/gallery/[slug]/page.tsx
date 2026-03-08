import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'

const staticEventImages: Record<string, { title: string; images: string[] }> = {
  techconnect6: {
    title: '#TechConnect: AI: A Tool For Defense And A Weapon For Cyber Attack. By Mr. Hitesh Mohan (Cyberwox Energy LLC, Houston, Texas)',
    images: ['/images/gallery5/photo2.jpeg','/images/gallery5/photo3.jpeg','/images/gallery5/photo4.jpeg','/images/gallery5/photo5.jpeg','/images/gallery5/photo6.jpeg','/images/gallery5/photo7.jpeg','/images/gallery5/photo8.jpeg','/images/gallery5/photo9.jpeg'],
  },
  techconnect4: {
    title: '#TechConnect: On Hydraulic Fracturing',
    images: ['/images/gallery4/img1.jpg','/images/gallery4/img2.jpg','/images/gallery4/img3.jpg'],
  },
  techconnect1: {
    title: 'Industry Academia Interaction. #35years Of #SPEMumbaiSection',
    images: ['/images/gallery1/img1.jpeg','/images/gallery1/img2.jpeg','/images/gallery1/img3.jpeg','/images/gallery1/img4.jpeg','/images/gallery1/image1.jpeg','/images/gallery1/image2.jpeg','/images/gallery1/image3.jpeg','/images/gallery5/photo1.jpeg'],
  },
  techconnect2: {
    title: 'A Night of Insights & Celebrations!',
    images: ['/images/gallery2/img1.jpeg','/images/gallery2/img2.jpeg','/images/gallery2/img3.jpeg','/images/gallery2/img4.jpeg','/images/gallery2/img5.jpg','/images/gallery2/img6.jpg','/images/gallery2/img7.jpg','/images/gallery2/img8.jpg','/images/gallery2/img9.jpeg'],
  },
  techconnect3: {
    title: '#TechConnect: An Engaging & Impactful Session!',
    images: ['/images/gallery3/img1.jpeg','/images/gallery3/img2.jpeg','/images/gallery3/img3.jpeg','/images/gallery3/img4.jpeg','/images/gallery3/img5.jpeg'],
  },
  techconnect5: {
    title: "#TechConnect: The Future of Energy and The Role of SPE in Shaping the Industry's Trajectory. By SPE International President 2024 Mr. Terry Palisch",
    images: ['/images/student-chapters/ig1.jpg','/images/student-chapters/ig2.jpg','/images/student-chapters/ig3.jpg','/images/student-chapters/ig4.jpg','/images/student-chapters/ig5.jpg','/images/student-chapters/ig6.jpg','/images/student-chapters/ig7.jpg','/images/student-chapters/ig8.jpg','/images/student-chapters/ig9.jpg','/images/student-chapters/ig10.jpg','/images/student-chapters/ig11.jpg','/images/student-chapters/ig12.jpg','/images/student-chapters/ig13.jpg','/images/student-chapters/ig14.jpg','/images/student-chapters/ig15.jpg','/images/student-chapters/ig16.jpg','/images/student-chapters/ig17.jpg','/images/student-chapters/ig18.jpg','/images/gallery4/ig19.jpg'],
  },
}

async function getGalleryEvent(slug: string) {
  try {
    const row = await prisma.galleryEvent.findUnique({ where: { slug } })
    if (row) {
      let images: string[] = []
      try { images = JSON.parse(row.images) } catch {}
      return { title: row.title, images }
    }
  } catch {}
  return staticEventImages[slug] ?? null
}

export const revalidate = 0

export default async function GalleryEventDetail({ params }: { params: { slug: string } }) {
  const event = await getGalleryEvent(params.slug)

  if (!event) {
    notFound()
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Navigation />
      <section className="pt-32 pb-8 bg-spe-navy text-white">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-white drop-shadow-lg text-center">
            {event.title}
          </h1>
        </div>
      </section>
      <section className="section-padding bg-[#eaf2fb]">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {event.images.map((img, idx) => (
              <div key={idx} className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                <Image src={img} alt={`Photo ${idx + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
