require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const { PrismaClient } = require('../src/generated/prisma')
const { PrismaPg } = require('@prisma/adapter-pg')

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database with existing static data...\n')

  // ── Leadership ──────────────────────────────────────────────────────────────
  const leadershipCount = await prisma.leadershipMember.count()
  if (leadershipCount === 0) {
    await prisma.leadershipMember.createMany({
      data: [
        { name: 'Pankaj Kumar',       position: 'Director(Production), ONGC',     organization: 'Patronage',                   bio: 'Experienced professional with extensive background in oil and gas operations.', image: '/images/leadership/pankaj.jpg',             sortOrder: 0  },
        { name: 'N K Mitra',          position: 'Chairperson',                    organization: 'Ex-ONGC',                     bio: 'Experienced professional with extensive background in oil and gas operations.', image: '/images/leadership/nk-mitra.jpg',           sortOrder: 1  },
        { name: 'Ravi Shankar',       position: 'Program Chair',                  organization: 'ONGC',                        bio: 'Leading program development and technical sessions for SPE Mumbai Section.',    image: '/images/leadership/ravi-shankar.jpg',       sortOrder: 2  },
        { name: 'Tinku Nischal',      position: 'Secretary',                      organization: 'ONGC',                        bio: 'Managing administrative affairs and coordination for the section.',            image: '/images/leadership/tinku-nischal.jpg',      sortOrder: 3  },
        { name: 'Bhartendu Bhardwaj', position: 'Treasurer',                      organization: 'ONGC',                        bio: 'Overseeing financial management and budgeting for SPE Mumbai Section.',         image: '/images/leadership/bhartendu-bhardwaj.jpg', sortOrder: 4  },
        { name: 'Manav Kanwar',       position: 'Membership Chairperson',         organization: 'SKO',                         bio: 'Leading membership growth and engagement initiatives.',                        image: '/images/leadership/manav-kanwar.jpg',       linkedin: 'https://www.linkedin.com/in/manav-kanwar', sortOrder: 5 },
        { name: 'Reghu Padmanabhan',  position: 'Founder and CEO',                organization: 'ARP108 Energy Solutions LLP', bio: 'Managing external communications and stakeholder engagement.',               image: '/images/leadership/reghu-padmanabhan.jpg',  sortOrder: 6  },
        { name: 'Shashank Jha',       position: 'Scholarship Chair',              organization: 'Artson',                      bio: 'Overseeing scholarship programs and educational initiatives.',                 image: '/images/leadership/shashank-jha.png',       sortOrder: 7  },
        { name: 'Rajiv Nischal',      position: 'Awards and Recognition Chair',   organization: 'IPEOT, ONGC',                 bio: 'Managing awards programs and recognition initiatives.',                        image: '/images/leadership/rajiv-nischal.jpg',      sortOrder: 8  },
        { name: 'Tushar Garg',        position: 'Young Professionals (YP) Chair', organization: 'Baker',                       bio: 'Leading initiatives for young professionals in the industry.',                 image: '/images/leadership/tushar-garg.jpg',        sortOrder: 9  },
        { name: 'Prem Kumar Verma',   position: 'Student Chapter Liaison',        organization: 'Ex-ONGC',                     bio: 'Coordinating with student chapters and educational institutions.',              image: '/images/leadership/prem-kumar-verma.jpg',   sortOrder: 10 },
        { name: 'Mohit Kapoor',       position: 'Social Activities Chair',        organization: 'Innovative Concepts',         bio: 'Organizing social events and networking activities.',                          image: '/images/leadership/mohit-kapoor.jpg',       sortOrder: 11 },
        { name: 'Sanjay Moitra',      position: 'Faculty Advisor',                organization: 'Ex-ONGC',                     bio: 'Providing guidance and support for academic initiatives.',                     image: '/images/leadership/sanjay-moitra.jpg',      sortOrder: 12 },
        { name: 'Samarth Patwardhan', position: 'Faculty Liaison',                organization: 'MIT, Pune',                   bio: 'Building connections between industry and academia.',                          image: '/images/leadership/samarth-patwardhan.jpg', sortOrder: 13 },
        { name: 'Akshay Makhare',     position: 'Webmaster',                      organization: 'Director, Petroinnovate',     bio: 'Managing digital presence and online initiatives.',                            image: '/images/leadership/akshay-makhane.jpg',     sortOrder: 14 },
      ],
    })
    console.log('✓ Leadership seeded (15 members)')
  } else {
    console.log(`— Leadership skipped (${leadershipCount} members already exist)`)
  }

  // ── Reports ──────────────────────────────────────────────────────────────────
  const reportCount = await prisma.report.count()
  if (reportCount === 0) {
    await prisma.report.createMany({
      data: [
        { title: 'Trending Stories', coverImage: '/images/report/rp.png',    pdfUrl: '/pdf/Trending-Stories.pdf', description: 'Latest trending stories from the SPE Mumbai Section.', active: true, sortOrder: 0 },
        { title: 'Spectrum 2025',    coverImage: '/images/report/rp2025.png', pdfUrl: '/pdf/Spectrum-2025.pdf',    description: 'Annual Spectrum magazine for the year 2025.',          active: true, sortOrder: 1 },
        { title: 'Spectrum 2024',    coverImage: '/images/report/rp2024.png', pdfUrl: '/pdf/Spectrum-2024.pdf',    description: 'Annual Spectrum magazine for the year 2024.',          active: true, sortOrder: 2 },
      ],
    })
    console.log('✓ Reports seeded (3 reports)')
  } else {
    console.log(`— Reports skipped (${reportCount} reports already exist)`)
  }

  // ── Events ───────────────────────────────────────────────────────────────────
  const eventCount = await prisma.event.count()
  if (eventCount === 0) {
    await prisma.event.createMany({
      data: [
        {
          title: 'Tech Connect Session',
          date: '2025-07-18',
          location: 'Boundary Hall, MCA',
          description: 'An insightful session featuring industry leaders discussing cutting-edge advancements in AI-driven reservoir evaluation and sustainable energy solutions, including offshore wind and decarbonisation strategies in oil and gas.',
          active: true,
          sortOrder: 0,
        },
      ],
    })
    console.log('✓ Events seeded (1 event)')
  } else {
    console.log(`— Events skipped (${eventCount} events already exist)`)
  }

  // ── Site Content ─────────────────────────────────────────────────────────────
  const heroTitle = await prisma.siteContent.findUnique({ where: { key: 'heroTitle' } })
  if (!heroTitle) {
    await prisma.siteContent.createMany({
      data: [
        { key: 'heroTitle',    value: 'Advancing the Oil and Gas Industry In India' },
        { key: 'heroSubtitle', value: 'Join the Society of Petroleum Engineers Mumbai Section to connect, learn, and grow with industry professionals.' },
      ],
    })
    console.log('✓ Site content seeded')
  } else {
    console.log('— Site content skipped (already exists)')
  }

  // ── Gallery ──────────────────────────────────────────────────────────────────
  const galleryCount = await prisma.galleryEvent.count()
  if (galleryCount === 0) {
    await prisma.galleryEvent.createMany({
      data: [
        {
          slug: 'techconnect6',
          title: '#TechConnect: AI: A Tool For Defense And A Weapon For Cyber Attack. By Mr. Hitesh Mohan (Cyberwox Energy LLC, Houston, Texas)',
          date: '16 June 2025',
          coverImage: '/images/gallery5/photo2.jpeg',
          images: JSON.stringify(['/images/gallery5/photo2.jpeg','/images/gallery5/photo3.jpeg','/images/gallery5/photo4.jpeg','/images/gallery5/photo5.jpeg','/images/gallery5/photo6.jpeg','/images/gallery5/photo7.jpeg','/images/gallery5/photo8.jpeg','/images/gallery5/photo9.jpeg']),
          active: true, sortOrder: 0,
        },
        {
          slug: 'techconnect4',
          title: '#TechConnect: On Hydraulic Fracturing',
          date: '13 May 2025',
          coverImage: '/images/gallery4/img1.jpg',
          images: JSON.stringify(['/images/gallery4/img1.jpg','/images/gallery4/img2.jpg','/images/gallery4/img3.jpg']),
          active: true, sortOrder: 1,
        },
        {
          slug: 'techconnect1',
          title: 'Industry Academia Interaction. #35years Of #SPEMumbaiSection',
          date: '05 April 2025',
          coverImage: '/images/gallery1/img1.jpeg',
          images: JSON.stringify(['/images/gallery1/img1.jpeg','/images/gallery1/img2.jpeg','/images/gallery1/img3.jpeg','/images/gallery1/img4.jpeg','/images/gallery1/image1.jpeg','/images/gallery1/image2.jpeg','/images/gallery1/image3.jpeg','/images/gallery5/photo1.jpeg']),
          active: true, sortOrder: 2,
        },
        {
          slug: 'techconnect2',
          title: 'A Night of Insights & Celebrations!',
          date: '17 March 2025',
          coverImage: '/images/gallery2/img1.jpeg',
          images: JSON.stringify(['/images/gallery2/img1.jpeg','/images/gallery2/img2.jpeg','/images/gallery2/img3.jpeg','/images/gallery2/img4.jpeg','/images/gallery2/img5.jpg','/images/gallery2/img6.jpg','/images/gallery2/img7.jpg','/images/gallery2/img8.jpg','/images/gallery2/img9.jpeg']),
          active: true, sortOrder: 3,
        },
        {
          slug: 'techconnect3',
          title: '#TechConnect: An Engaging & Impactful Session!',
          date: 'February 2025',
          coverImage: '/images/gallery3/img1.jpeg',
          images: JSON.stringify(['/images/gallery3/img1.jpeg','/images/gallery3/img2.jpeg','/images/gallery3/img3.jpeg','/images/gallery3/img4.jpeg','/images/gallery3/img5.jpeg']),
          active: true, sortOrder: 4,
        },
        {
          slug: 'techconnect5',
          title: "#TechConnect: The Future of Energy and The Role of SPE in Shaping the Industry's Trajectory. By SPE International President 2024 Mr. Terry Palisch",
          date: '30 April 2024',
          coverImage: '/images/student-chapters/ig1.jpg',
          images: JSON.stringify(['/images/student-chapters/ig1.jpg','/images/student-chapters/ig2.jpg','/images/student-chapters/ig3.jpg','/images/student-chapters/ig4.jpg','/images/student-chapters/ig5.jpg','/images/student-chapters/ig6.jpg','/images/student-chapters/ig7.jpg','/images/student-chapters/ig8.jpg','/images/student-chapters/ig9.jpg','/images/student-chapters/ig10.jpg','/images/student-chapters/ig11.jpg','/images/student-chapters/ig12.jpg','/images/student-chapters/ig13.jpg','/images/student-chapters/ig14.jpg','/images/student-chapters/ig15.jpg','/images/student-chapters/ig16.jpg','/images/student-chapters/ig17.jpg','/images/student-chapters/ig18.jpg','/images/gallery4/ig19.jpg']),
          active: true, sortOrder: 5,
        },
      ],
    })
    console.log('✓ Gallery seeded (6 events)')
  } else {
    console.log(`— Gallery skipped (${galleryCount} events already exist)`)
  }

  console.log('\n✅ Seeding complete! Open /admin to manage all this data.')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
