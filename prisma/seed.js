require('dotenv').config({ path: require('path').join(__dirname, '../.env.local') })

const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const { Pool } = require('pg')

const pool = new Pool({ connectionString: process.env.DIRECT_URL })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

// Convert Windows paths to relative paths for storage-agnostic operation
function normalizePathToRelative(localPath) {
  if (!localPath) return localPath
  if (localPath.startsWith('http')) return localPath
  
  // Convert Windows backslashes to forward slashes
  const cleanPath = localPath.replace(/\\/g, '/')
  
  // Ensure it starts with /
  return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`
}

async function main() {
  console.log('Seeding database with existing static data...')

  // ── Leadership ──────────────────────────────────────────────────────────────
  const leadershipCount = await prisma.leadershipMember.count()
  if (leadershipCount === 0) {
    await prisma.leadershipMember.createMany({
      data: [
        { name: 'Pankaj Kumar',       position: 'Director(Production), ONGC', organization: 'Patronage',              bio: 'Experienced professional with extensive background in oil and gas operations.',  image: normalizePathToRelative('/images/leadership/pankaj.jpg'),                sortOrder: 0  },
        { name: 'N K Mitra',          position: 'Chairperson',                organization: 'Ex-ONGC',                bio: 'Experienced professional with extensive background in oil and gas operations.',  image: normalizePathToRelative('/images/leadership/nk-mitra.jpg'),              sortOrder: 1  },
        { name: 'Ravi Shankar',       position: 'Program Chair',              organization: 'ONGC',                   bio: 'Leading program development and technical sessions for SPE Mumbai Section.',      image: normalizePathToRelative('/images/leadership/ravi-shankar.jpg'),          sortOrder: 2  },
        { name: 'Tinku Nischal',      position: 'Secretary',                  organization: 'ONGC',                   bio: 'Managing administrative affairs and coordination for the section.',              image: normalizePathToRelative('/images/leadership/tinku-nischal.jpg'),         sortOrder: 3  },
        { name: 'Bhartendu Bhardwaj', position: 'Treasurer',                  organization: 'ONGC',                   bio: 'Overseeing financial management and budgeting for SPE Mumbai Section.',           image: normalizePathToRelative('/images/leadership/bhartendu-bhardwaj.jpg'),    sortOrder: 4  },
        { name: 'Manav Kanwar',       position: 'Membership Chairperson',     organization: 'SKO',                    bio: 'Leading membership growth and engagement initiatives.',                          image: normalizePathToRelative('/images/leadership/manav-kanwar.jpg'),          linkedin: 'https://www.linkedin.com/in/manav-kanwar', sortOrder: 5 },
        { name: 'Reghu Padmanabhan',  position: 'Founder and CEO',            organization: 'ARP108 Energy Solutions LLP', bio: 'Managing external communications and stakeholder engagement.',             image: normalizePathToRelative('/images/leadership/reghu-padmanabhan.jpg'),     sortOrder: 6  },
        { name: 'Shashank Jha',       position: 'Scholarship Chair',          organization: 'Artson',                 bio: 'Overseeing scholarship programs and educational initiatives.',                   image: normalizePathToRelative('/images/leadership/shashank-jha.png'),          sortOrder: 7  },
        { name: 'Rajiv Nischal',      position: 'Awards and Recognition Chair',   organization: 'IPEOT, ONGC',         bio: 'Managing awards programs and recognition initiatives.',                        image: normalizePathToRelative('/images/leadership/rajiv-nischal.jpg'),      sortOrder: 8  },
        { name: 'Tushar Garg',        position: 'Young Professionals (YP) Chair', organization: 'Baker',               bio: 'Leading initiatives for young professionals in the industry.',                 image: normalizePathToRelative('/images/leadership/tushar-garg.jpg'),        sortOrder: 9  },
        { name: 'Prem Kumar Verma',   position: 'Student Chapter Liaison',        organization: 'Ex-ONGC',             bio: 'Coordinating with student chapters and educational institutions.',              image: normalizePathToRelative('/images/leadership/prem-kumar-verma.jpg'),   sortOrder: 10 },
        { name: 'Mohit Kapoor',       position: 'Social Activities Chair',        organization: 'Innovative Concepts',  bio: 'Organizing social events and networking activities.',                          image: normalizePathToRelative('/images/leadership/mohit-kapoor.jpg'),       sortOrder: 11 },
        { name: 'Sanjay Moitra',      position: 'Faculty Advisor',                organization: 'Ex-ONGC',             bio: 'Providing guidance and support for academic initiatives.',                     image: normalizePathToRelative('/images/leadership/sanjay-moitra.jpg'),      sortOrder: 12 },
        { name: 'Samarth Patwardhan', position: 'Faculty Liaison',                organization: 'MIT, Pune',           bio: 'Building connections between industry and academia.',                          image: normalizePathToRelative('/images/leadership/samarth-patwardhan.jpg'), sortOrder: 13 },
        { name: 'Akshay Makhare',     position: 'Webmaster',                      organization: 'Director, Petroinnovate', bio: 'Managing digital presence and online initiatives.',                          image: normalizePathToRelative('/images/leadership/akshay-makhane.jpg'),     sortOrder: 14 },
      ],
    })
    console.log('✓ Leadership seeded (15 members)')
  } else {
    console.log(`— Leadership skipped (${leadershipCount} members already exist)`)
  }

  // ── Reports ─────────────────────────────────────────────────────────────────
  const reportCount = await prisma.report.count()
  if (reportCount === 0) {
    await prisma.report.createMany({
      data: [
        { title: 'Trending Stories', coverImage: normalizePathToRelative('/images/report/rp.png'),     pdfUrl: normalizePathToRelative('/pdf/Trending-Stories.pdf'), description: 'Latest trending stories from the SPE Mumbai Section.',  active: true, sortOrder: 0 },
        { title: 'Spectrum 2025',    coverImage: normalizePathToRelative('/images/report/rp2025.png'),  pdfUrl: normalizePathToRelative('/pdf/Spectrum-2025.pdf'),    description: 'Annual Spectrum magazine for the year 2025.',           active: true, sortOrder: 1 },
        { title: 'Spectrum 2024',    coverImage: normalizePathToRelative('/images/report/rp2024.png'),  pdfUrl: normalizePathToRelative('/pdf/Spectrum-2024.pdf'),    description: 'Annual Spectrum magazine for the year 2024.',           active: true, sortOrder: 2 },
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

  const defaultDashboardGraphs = Array.from({ length: 9 }, (_, i) => normalizePathToRelative(`/images/dashboard/graph${i + 1}.jpg`))
  await prisma.siteContent.upsert({
    where: { key: 'dashboardGraphs' },
    update: {},
    create: { key: 'dashboardGraphs', value: JSON.stringify(defaultDashboardGraphs) },
  })

  // ── Gallery ──────────────────────────────────────────────────────────────────
  const galleryCount = await prisma.galleryEvent.count()
  if (galleryCount === 0) {
    await prisma.galleryEvent.createMany({
      data: [
        {
          slug: 'techconnect6',
          title: '#TechConnect: AI: A Tool For Defense And A Weapon For Cyber Attack. By Mr. Hitesh Mohan (Cyberwox Energy LLC, Houston, Texas)',
          date: '16 June 2025',
          coverImage: normalizePathToRelative('/images/gallery5/photo2.jpeg'),
          images: JSON.stringify([normalizePathToRelative('/images/gallery5/photo2.jpeg'), normalizePathToRelative('/images/gallery5/photo3.jpeg'), normalizePathToRelative('/images/gallery5/photo4.jpeg'), normalizePathToRelative('/images/gallery5/photo5.jpeg'), normalizePathToRelative('/images/gallery5/photo6.jpeg'), normalizePathToRelative('/images/gallery5/photo7.jpeg'), normalizePathToRelative('/images/gallery5/photo8.jpeg'), normalizePathToRelative('/images/gallery5/photo9.jpeg')]),
          active: true, sortOrder: 0,
        },
      ],
    })
    console.log('✓ Gallery seeded (6 events)')
  } else {
    console.log(`— Gallery skipped (${galleryCount} events already exist)`)
  }

  // ── Student Chapters ─────────────────────────────────────────────────────────
  const defaultStudentChapters = [
    {
      name: 'IIT Bombay Student Chapter',
      university: 'Indian Institute of Technology Bombay',
      location: 'Mumbai, Maharashtra',
      established: '2013',
      description: 'The IITB student chapter was started in 2013 and focuses on technical knowledge dissemination concerning exploration, development, and production of oil and gas resources. The chapter celebrates its annual day with seminars, group activities, and quiz competitions.',
      website: 'https://www.geos.iitb.ac.in/index.php/spe/',
      image: normalizePathToRelative('/images/student-chapters/bombay.jpeg'),
      achievements: JSON.stringify([
        'Regularly organizes technical seminars and workshops',
        'Conducts intercollege quiz competitions like PETROGNOSIS',
        'Hosts industry professionals for guest lectures',
        'Provides networking opportunities with industry experts',
      ]),
      activities: JSON.stringify([
        'Seminar on Introduction to Unconventional Shale Gas Drilling and Production',
        'PETROGNOSIS v.1 Intercollege Quiz Competition',
        'Seminar on Evolution of oil industry and current challenges',
        'Industry counseling sessions by professionals',
        'Annual day celebrations with technical presentations',
      ]),
      leadership: JSON.stringify([
        { position: 'President', name: 'Dhananjoy Mandal' },
        { position: 'Vice President', name: 'Naveen' },
        { position: 'General Secretary', name: 'Shiva Rana' },
        { position: 'Treasurer', name: 'Saikat Mandal' },
        { position: 'Faculty Advisor', name: 'Bharath Chandra Shekar' },
      ]),
      active: true,
    },
    {
      name: 'MIT-World Peace University Chapter',
      university: 'MIT-World Peace University',
      location: 'Pune, Maharashtra',
      established: '01 Jun 1988',
      description: 'Established in 1988, the MIT-WPU chapter has a long history of excellence in petroleum education. It has consistently received recognition for outstanding performance, earning the Student Chapter Excellence Award for multiple consecutive years (2019-2023) and other prestigious accolades from SPE International.',
      website: 'https://www.spe.org/en/chapter/5684/',
      image: normalizePathToRelative('/images/student-chapters/mit.jpeg'),
      achievements: JSON.stringify([
        'Student Chapter Excellence Award (2019-2023)',
        'Outstanding Student Chapter (2014-2015)',
        'Gold Standard Chapter (2011, 2013)',
        'Consistently recognized among top SPE student chapters worldwide',
        'Strong record of student leadership development',
      ]),
      activities: JSON.stringify([
        'Technical workshops and seminars on petroleum engineering topics',
        'Industry-academia collaboration initiatives',
        'Field trips to petroleum facilities and operational sites',
        'Career development events and professional networking sessions',
        'Participation in SPE international competitions and events',
        'Annual technical symposiums featuring industry experts',
      ]),
      leadership: JSON.stringify([
        { position: 'President', name: 'Prasad Sandeep Tajanpure' },
        { position: 'Vice President', name: 'Yash Mahavir Nirmal' },
        { position: 'Program Chairperson', name: 'Rohit Mohan Cherukupalli' },
        { position: 'Secretary', name: 'Deepika Dangi' },
        { position: 'Treasurer', name: 'Samarth Balasaheb Kendre' },
        { position: 'Membership Chairperson', name: 'Anshuman Goswami' },
        { position: 'Social Activities Chair', name: 'Rishi MaheshGhosalkar' },
        { position: 'Faculty Advisor', name: 'Professor Samarth Dilip Patwardhan' },
      ]),
      active: true,
    },
    {
      name: 'Nowrosjee Wadia College Student Chapter',
      university: 'Nowrosjee Wadia College',
      location: 'Pune, Maharashtra',
      established: '26 Jan 2015',
      description: 'Established on January 26, 2015, the Nowrosjee Wadia College Student Chapter is affiliated with the SPE Mumbai Section. The Department of Geology and Petroleum Technology hosts this active student chapter focused on bridging academic knowledge with industry practices.',
      website: 'https://petrotechwadia.in/spe-chapter/',
      image: normalizePathToRelative('/images/student-chapters/wadia_college.jpeg'),
      achievements: JSON.stringify([
        'Student Chapter Excellence Award (2023)',
        'Presidential Award for Outstanding Student Chapter (2022)',
        'Student Chapter Excellence Award (2021)',
        'Organizes annual exhibitions showcasing petroleum technology innovations',
      ]),
      activities: JSON.stringify([
        'Annual exhibition and student project showcase',
        'Invited talks from industry experts',
        'Geological field work and industrial visits',
        'Skills development workshops on technical and soft skills',
      ]),
      leadership: JSON.stringify([
        { position: 'President', name: 'Shravani Pramod Khopikar' },
        { position: 'Vice President', name: 'Siddhi Anil Gadkerkar' },
        { position: 'Secretary', name: 'Sarvesh Ravindra Jade' },
        { position: 'Treasurer', name: 'Yash Umesh Waghmare' },
        { position: 'Faculty Advisor', name: 'Sagar Mahendra Thakurdas' },
      ]),
      active: true,
    },
    {
      name: 'Indian Institute of Technology (ISM), Dhanbad Chapter',
      university: 'Indian Institute of Technology (ISM), Dhanbad',
      location: 'Dhanbad, India',
      established: '01 Mar 1988',
      description: 'Long-standing SPE student chapter with consistent excellence in student chapter awards and member engagement.',
      website: '',
      image: normalizePathToRelative('/images/student-chapters/ism.jpeg'),
      achievements: JSON.stringify([
        'Presidential Award for Outstanding Student Chapter (2024)',
        'Student Chapter Excellence Award (2023)',
        'Student Chapter Excellence Award (2022)',
        'Gold Standard Chapter recognitions',
      ]),
      activities: JSON.stringify([]),
      leadership: JSON.stringify([
        { position: 'President', name: 'Shubham Choudhary' },
        { position: 'Vice President', name: 'Kunal Prasad' },
        { position: 'Secretary', name: 'Priyanshu Kumar' },
        { position: 'Treasurer', name: 'Madhur Gupta' },
        { position: 'Faculty Advisor', name: 'Dr. Neetish Kumar Maurya' },
      ]),
      active: true,
    },
  ]

  const existingStudentRows = await prisma.studentChapter.findMany({ select: { name: true } })
  const existingStudentNames = new Set(existingStudentRows.map((row) => row.name))
  const missingStudentRows = defaultStudentChapters
    .filter((row) => !existingStudentNames.has(row.name))
    .map((row, idx) => ({
      ...row,
      sortOrder: existingStudentRows.length + idx,
    }))

  if (missingStudentRows.length > 0) {
    await prisma.studentChapter.createMany({ data: missingStudentRows })
    console.log(`✓ Student Chapters backfilled (${missingStudentRows.length} added)`)
  } else {
    console.log('— Student Chapters already up to date')
  }

  // ── Volunteer Roles ──────────────────────────────────────────────────────────
  const defaultVolunteerRoles = [
    {
      title: 'Schools Career Guidance Volunteer',
      category: 'education',
      description: 'Inspire the next generation by providing inclusive information on energy transition skills and career pathways, guiding students toward positive destinations.',
      responsibilities: 'Set up stand materials at career fairs, talk to parents and students about your career journey, energy careers in general, STEM subjects, and educational resources.',
      timeCommitment: 'Career fairs usually last a couple of hours, mostly in the evening though some schools hold them during the day.',
      location: 'Various schools and colleges across Mumbai.',
      teamWork: 'We typically send teams of 2-3 people to each event.',
      skills: 'Good communication and passion for STEM and the energy industry.',
      benefits: 'Inspire students and improve public speaking while giving back to the community.',
      active: true,
    },
    {
      title: 'Events Committee Volunteer',
      category: 'events',
      description: 'Help organize and run SPE Mumbai technical sessions, workshops, networking events, and annual conference.',
      responsibilities: 'Support planning, speakers, venues, registrations, and on-ground logistics.',
      timeCommitment: 'Monthly committee meetings and additional support around event dates.',
      location: 'SPE Mumbai office/virtual meetings and event venues across Mumbai.',
      teamWork: 'Work as part of the Events Committee team with regular collaboration.',
      skills: 'Organization, attention to detail, communication, and teamwork.',
      benefits: 'Develop event management skills and expand professional network.',
      active: true,
    },
    {
      title: 'Communications and Social Media Volunteer',
      category: 'communication',
      description: 'Help maintain SPE Mumbai online presence and develop content that engages members and promotes activities.',
      responsibilities: 'Create content for social channels, assist with newsletters, and support event coverage.',
      timeCommitment: 'Flexible, approximately 3-5 hours per week with additional time for major campaigns.',
      location: 'Mostly remote work with occasional meetings at SPE Mumbai office.',
      teamWork: 'Collaborate with Communications Committee and other volunteers.',
      skills: 'Strong writing/communication skills and familiarity with social media platforms.',
      benefits: 'Build portfolio and digital communication experience with industry visibility.',
      active: true,
    },
    {
      title: 'Student Chapter Mentor',
      category: 'mentoring',
      description: 'Support and guide SPE student chapters to bridge the gap between academia and industry.',
      responsibilities: 'Advise chapter leaders, give talks/workshops, and guide student activities.',
      timeCommitment: 'Monthly check-ins with occasional university event participation.',
      location: 'Universities across Mumbai with SPE student chapters.',
      teamWork: 'Coordinate with student officers, faculty advisors, and SPE Mumbai mentors.',
      skills: 'Industry experience, mentorship mindset, communication and listening skills.',
      benefits: 'Shape the next generation of professionals and strengthen academia-industry connections.',
      active: true,
    },
  ]

  const existingVolunteerRows = await prisma.volunteerRole.findMany({ select: { title: true, category: true } })
  const existingVolunteerKeys = new Set(existingVolunteerRows.map((row) => `${row.category}|${row.title}`))
  const missingVolunteerRows = defaultVolunteerRoles
    .filter((row) => !existingVolunteerKeys.has(`${row.category}|${row.title}`))
    .map((row, idx) => ({
      ...row,
      sortOrder: existingVolunteerRows.length + idx,
    }))

  if (missingVolunteerRows.length > 0) {
    await prisma.volunteerRole.createMany({ data: missingVolunteerRows })
    console.log(`✓ Volunteer Roles backfilled (${missingVolunteerRows.length} added)`)
  } else {
    console.log('— Volunteer Roles already up to date')
  }

  console.log('\n✅ Seeding complete! Open /admin to manage all this data.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
