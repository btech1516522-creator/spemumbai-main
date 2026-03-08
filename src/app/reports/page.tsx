import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import { prisma } from '@/lib/db'

const staticReports = [
  { title: "Trending Stories", image: "/images/report/rp.png", downloadUrl: "/pdf/Trending-Stories.pdf" },
  { title: "Spectrum 2025",    image: "/images/report/rp2025.png", downloadUrl: "/pdf/Spectrum-2025.pdf" },
  { title: "Spectrum 2024",    image: "/images/report/rp2024.png", downloadUrl: "/pdf/Spectrum-2024.pdf" },
]

async function getReports() {
  try {
    const rows = await prisma.report.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } })
    if (rows.length > 0) return rows.map((r) => ({ title: r.title, image: r.coverImage ?? undefined, downloadUrl: r.pdfUrl }))
  } catch {}
  return staticReports
}

export const revalidate = 0

export default async function Reports() {
  const reports = await getReports()

  return (
    <main className="flex flex-col min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-spe-navy text-white">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white drop-shadow-lg">
           Reports
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Download Spectrum and other reports below.
          </p>
        </div>
      </section>

      {/* Reports Section */}
      <section className="section-padding bg-[#eaf2fb]">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.map((report, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col border border-spe-blue/10 overflow-hidden mx-auto"
                style={{ height: '420px', width: '220px', minWidth: '200px', maxWidth: '240px' }}
              >
                <div className="relative w-full bg-gray-100 flex items-center justify-center" style={{ height: '68%' }}>
                  <img src={report.image} alt={report.title} className="object-cover w-full h-full" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-base md:text-lg font-bold text-spe-navy mb-1 text-center">{report.title}</h3>
                  <a
                    href={report.downloadUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-4 py-2 bg-blue-600 text-white font-semibold rounded-md transition-colors duration-300 text-center mt-2"
                  >
                    Download Report
                  </a>
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