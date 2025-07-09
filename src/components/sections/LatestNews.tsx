'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Sample news data - replace with actual news
const newsItems = [
	/*{
		id: 1,
		title: 'Annual SPE Mumbai Technical Conference Announced',
		date: 'March 15, 2025',
		excerpt: 'Join industry leaders for three days of knowledge sharing, networking, and innovation showcases at the Grand Hyatt Mumbai.',
		image: '/images/placeholder-news.jpg',
		slug: '/news/annual-technical-conference'
	},
	{
		id: 2,
		title: 'SPE Mumbai Welcomes New Executive Board',
		date: 'February 20, 2025',
		excerpt: 'We are pleased to announce our newly elected executive board members who will lead the section for the 2025-2026 term.',
		image: '/images/placeholder-news.jpg',
		slug: '/news/new-executive-board'
	},
	{
		id: 3,
		title: 'Distinguished Lecturer Program Kicks Off',
		date: 'January 10, 2025',
		excerpt: 'Our 2025 Distinguished Lecturer Program begins with a presentation on "Advancements in Carbon Capture Technology".',
		image: '/images/placeholder-news.jpg',
		slug: '/news/distinguished-lecturer-program'
	}*/
	{
		id: 1,
		title: 'A Night of Insights & Celebrations!',
		date: '03 months ago',
		excerpt: 'SPE Mumbai Section had the privilege of hosting a Distinguished Lecture by Ryosuke (Rio) Yokote (Rio) from Eni Australia on “Well Dynamic Simulation – Challenging the ‘Just Do This’ Approach.” The session provided a fascinating dive into how simulations enhance well operations, making them safer and more efficient.',
		image: '/images/news/news1.jpeg',
		slug: '/news/a-night-of-insights-and-celebrations'
	},
	{
		id: 2,
		title: '#TechConnect: An Engaging & Impactful Session!',
		date: '29 January 2025',
		excerpt: 'SPE Mumbai Section Monthly TechConnect, held on 29th January 2025 at Trident, BKC, involved intense and deep discussions on key industry topics.',
		image: '/images/news/news2.jpeg',
		slug: '/news/tech-connect-an-engaging-and-impactful-session'
	},
	{
		id: 3,
		title: '#TechConnect Session with TGT Diagnostics ',
		date: '06 months ago',
		excerpt: 'We had an insightful TechConnect session on Through-Barrier Diagnostics for Wells and Reservoirs, presented by Remke Ellis, Subject Matter Expert from TGT Diagnostics..',
		image: '/images/news/news3.jpeg',
		slug: '/news/tech-connect-session-with-tgt-diagnostics'
	}
]

export default function LatestNews() {
	return (
		<>
			{/* Simple horizontal line divider with minimal margin */}
			<hr className="mb-0.5 mt-0 border-t-2 border-spe-blue" />
			<section className="section-padding bg-[#eaf2fb]">
				<div className="container-custom">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="flex flex-col md:flex-row justify-between items-center mb-12"
					>
						<div>
							<h2 className="text-3xl font-bold text-spe-navy mb-2">Latest News</h2>
							<p className="text-gray-600 max-w-2xl">
								Stay updated with the latest news, events, and announcements from SPE Mumbai Section
							</p>
						</div>
						<Link
							href="/news"
							className="inline-block mt-4 md:mt-0 text-spe-blue font-medium hover:text-spe-navy transition-colors duration-300"
						>
							View all news →
						</Link>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{newsItems.map((item, index) => (
							<motion.div
								key={item.id}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
							>
								<div className="relative h-48 w-full">
									<Image
										src={item.image}
										alt={item.title}
										fill
										className="object-cover"
									/>
								</div>
								<div className="p-6">
									<span className="text-sm text-spe-blue font-medium">{item.date}</span>
									<h3 className="text-xl font-bold text-spe-navy mt-2 mb-3 line-clamp-2">
										{item.title}
									</h3>
									<p className="text-gray-600 mb-4 line-clamp-3">
										{item.excerpt}
									</p>
									<Link
										href={item.slug}
										className="inline-block text-spe-blue font-medium hover:text-spe-navy transition-colors duration-300"
									>
										Read more →
									</Link>
								</div>
							</motion.div>
						))}
					</div>
				</div>
			</section>
		</>
	)
}