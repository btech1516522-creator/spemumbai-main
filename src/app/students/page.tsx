'use client'

import { useState } from 'react'
import Image from 'next/image'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { motion } from 'framer-motion'
import {
	AcademicCapIcon,
	UsersIcon,
	BookOpenIcon,
	BriefcaseIcon,
	BuildingLibraryIcon,
	CalendarIcon,
	UserCircleIcon,
} from '@heroicons/react/24/outline'

export default function Students() {

	type ChapterLeadership = {
		position: string
		name: string
	}

	type StudentChapter = {
		id: string
		name: string
		university: string
		location: string
		established: string
		description: string
		image: string
		achievements: string[]
		activities: string[]
		leadership: ChapterLeadership[]
	}

	const studentChapters: StudentChapter[] = [
		{
			id: 'iitb',
			name: 'IIT Bombay Student Chapter',
			university: 'Indian Institute of Technology Bombay',
			location: 'Powai, Mumbai',
			established: '2013',
			description:
				'The IIT Bombay student chapter focuses on technical knowledge dissemination, peer learning, and industry interaction. It supports students through talks, mentoring, and skill-building sessions aligned with the evolving energy landscape.',
			image: '/images/student-chapters/iitb-logo.png',
			achievements: [
				'Hosted technical seminars and industry speaker sessions',
				'Student participation in paper/poster competitions',
				'Collaborations with section-level events and workshops',
			],
			activities: [
				'Technical talks and panel discussions',
				'Workshops and short courses',
				'Networking meetups and mentoring circles',
			],
			leadership: [
				{ position: 'Faculty Advisor', name: 'Chapter Advisor' },
				{ position: 'President', name: 'Student Lead' },
				{ position: 'Secretary', name: 'Student Coordinator' },
				{ position: 'Treasurer', name: 'Student Treasurer' },
			],
		},
		{
			id: 'wadia',
			name: 'Nowrosjee Wadia College Student Chapter',
			university: 'Nowrosjee Wadia College (Department of Geology & Petroleum Technology)',
			location: 'Pune, Maharashtra',
			established: '2015',
			description:
				'Affiliated with the SPE Mumbai Section, the Nowrosjee Wadia College student chapter bridges academic foundations with industry practices through outreach, events, and technical activities.',
			image: '/images/student-chapters/wadia-logo.png',
			achievements: [
				'Recognized for consistent chapter engagement and outreach',
				'Organized academic-industry interaction sessions',
				'Student volunteer participation in section programs',
			],
			activities: [
				'Guest lectures and technical webinars',
				'Student-led awareness and outreach initiatives',
				'Team activities and professional development sessions',
			],
			leadership: [
				{ position: 'Faculty Advisor', name: 'Chapter Advisor' },
				{ position: 'President', name: 'Student Lead' },
				{ position: 'Secretary', name: 'Student Coordinator' },
				{ position: 'Treasurer', name: 'Student Treasurer' },
			],
		},
		{
			id: 'mitwpu',
			name: 'MIT-WPU Student Chapter',
			university: 'MIT World Peace University',
			location: 'Pune, Maharashtra',
			established: '2020',
			description:
				'The MIT-WPU student chapter promotes learning and professional growth through speaker sessions, project showcases, and collaborations that encourage multidisciplinary participation in energy and sustainability topics.',
			image: '/images/student-chapters/mitwpu-logo.png',
			achievements: [
				'Conducted student-driven technical knowledge sessions',
				'Improved student engagement through interactive events',
				'Participation in section-led activities and volunteering',
			],
			activities: [
				'Career and skills workshops',
				'Technical sessions and study groups',
				'Industry interaction and networking events',
			],
			leadership: [
				{ position: 'Faculty Advisor', name: 'Chapter Advisor' },
				{ position: 'President', name: 'Student Lead' },
				{ position: 'Secretary', name: 'Student Coordinator' },
				{ position: 'Treasurer', name: 'Student Treasurer' },
			],
		},
	]

	type ChapterId = StudentChapter['id']
	const [activeChapter, setActiveChapter] = useState<ChapterId>('iitb')
	const selectedChapter = studentChapters.find((c) => c.id === activeChapter) ?? studentChapters[0]

	return (
		<div className="min-h-screen flex flex-col bg-[#081428] text-white">
			<Navigation />

			<main className="flex-grow pt-20">

{/* HERO */}

<section className="relative overflow-hidden py-32">

<div className="absolute inset-0 bg-gradient-to-br from-[#0b2140] via-[#1a4f78] to-[#0b2140]" />

<div className="absolute top-[-200px] left-[15%] w-[700px] h-[700px] bg-sky-500/20 blur-[200px] rounded-full"/>

<div className="absolute bottom-[-200px] right-[15%] w-[600px] h-[600px] bg-cyan-400/20 blur-[180px] rounded-full"/>

<div className="container-custom relative z-10">

<motion.div
initial={{opacity:0,y:20}}
animate={{opacity:1,y:0}}
transition={{duration:.7}}
className="max-w-3xl"
>

<span className="inline-block px-5 py-2 bg-sky-500/10 text-sky-300 border border-sky-400/20 rounded-full text-xs mb-6 tracking-widest uppercase">
Future Leaders
</span>

<h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-white">

Student

<span className="block bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 text-transparent bg-clip-text">

Chapters

</span>

</h1>

<p className="text-lg text-sky-100/70 leading-relaxed max-w-2xl">

SPE Mumbai Section proudly supports student chapters nurturing the next generation of petroleum engineers and geoscientists.

</p>

</motion.div>

</div>

</section>


{/* OVERVIEW CARDS */}

<section className="py-24 bg-gradient-to-b from-[#0a1d3a] via-[#14335a] to-[#0a1d3a]">

<div className="container-custom">

<div className="text-center mb-16">

<h2 className="text-4xl font-bold mb-4 text-white">

Empowering Students in Energy Education

</h2>

<div className="mx-auto w-24 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent"/>

</div>


<div className="grid md:grid-cols-3 gap-8">

{[
{
icon:AcademicCapIcon,
title:'Educational Growth',
desc:'Access journals, research resources and petroleum engineering knowledge'
},
{
icon:UsersIcon,
title:'Networking',
desc:'Connect with global industry professionals and students'
},
{
icon:BookOpenIcon,
title:'Leadership Development',
desc:'Build leadership and teamwork skills through SPE programs'
}
].map((item,i)=>(

<motion.div
key={i}
whileHover={{y:-8}}
className="bg-white/5 backdrop-blur-xl border border-sky-400/20 rounded-2xl p-8 text-center"
>

<div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-400/20 flex items-center justify-center">

<item.icon className="w-7 h-7 text-sky-300"/>

</div>

<h3 className="text-xl font-semibold mb-3">{item.title}</h3>

<p className="text-sky-100/70 text-sm">{item.desc}</p>

</motion.div>

))}

</div>

</div>

</section>


{/* CHAPTER SELECTOR */}

<section className="py-20">

<div className="container-custom">


				<div className="flex flex-wrap justify-center gap-4 mb-12">
					{studentChapters.map((chapter) => (
						<button
							key={chapter.id}
							onClick={() => setActiveChapter(chapter.id)}
							className={`px-6 py-3 rounded-full text-sm font-semibold transition

${activeChapter === chapter.id

? 'bg-gradient-to-r from-sky-500 to-cyan-400 text-white shadow-lg'

: 'bg-white/10 text-sky-200 hover:bg-white/20'}

`}
						>
							{chapter.name}
						</button>
					))}
				</div>

				<motion.div
					key={selectedChapter.id}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="bg-white/5 backdrop-blur-2xl border border-sky-400/20 rounded-3xl p-10"
				>

<div className="grid md:grid-cols-3 gap-10">


{/* IMAGE */}

<div>

<div className="relative aspect-square rounded-2xl overflow-hidden bg-white/10">

											<Image
												src={selectedChapter.image}
												alt={selectedChapter.name}
												fill
												sizes="(min-width: 768px) 33vw, 100vw"
												className="object-contain p-6"
											/>

</div>

<div className="mt-6 space-y-4 text-sm">

<div className="flex gap-3">

<BuildingLibraryIcon className="w-5 text-sky-400"/>

					  <span>{selectedChapter.university}</span>

</div>

<div className="flex gap-3">

<CalendarIcon className="w-5 text-sky-400"/>

					  <span>Established {selectedChapter.established}</span>

</div>

<div className="flex gap-3">

<BriefcaseIcon className="w-5 text-sky-400"/>

					  <span>{selectedChapter.location}</span>

</div>

</div>

</div>


{/* DETAILS */}

<div className="md:col-span-2">

<h3 className="text-3xl font-bold mb-4">

					{selectedChapter.name}

</h3>

<p className="text-sky-100/70 mb-8">

					{selectedChapter.description}

</p>


<div className="grid md:grid-cols-2 gap-8">

<div>

<h4 className="font-semibold mb-3 flex items-center gap-2">

<UsersIcon className="w-5 text-sky-400"/>

Achievements

</h4>

<ul className="space-y-2 text-sky-100/80 text-sm">

											{selectedChapter.achievements.map((achievement, i) => (
												<li key={i}>• {achievement}</li>
											))}

</ul>

</div>

<div>

<h4 className="font-semibold mb-3 flex items-center gap-2">

<CalendarIcon className="w-5 text-sky-400"/>

Activities

</h4>

<ul className="space-y-2 text-sky-100/80 text-sm">

											{selectedChapter.activities.map((activity, i) => (
												<li key={i}>• {activity}</li>
											))}

</ul>

</div>

</div>


{/* LEADERSHIP */}

<div className="mt-10 pt-8 border-t border-white/10">

<h4 className="flex items-center gap-2 font-semibold mb-6">

<UserCircleIcon className="w-5 text-sky-400"/>

Chapter Leadership

</h4>

<div className="grid md:grid-cols-4 gap-4">

					  {selectedChapter.leadership.map((l, i) => (
<div
key={i}
className="bg-white/5 border border-white/10 rounded-xl p-4"
>

<p className="font-medium">{l.name}</p>

<p className="text-xs text-sky-200">{l.position}</p>

</div>
					  ))}

</div>

</div>

</div>

</div>

	</motion.div>

</div>

</section>


				<Footer />
			</main>
		</div>
	)
}