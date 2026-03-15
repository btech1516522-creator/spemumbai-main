import Link from 'next/link'
import { FaLinkedin, FaTwitter, FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa'

const footerLinks = {
  membership: [
    { name: 'Join SPE', href: 'https://www.spe.org/en/join/' },
    { name: 'Membership Benefits', href: 'https://www.spe.org/en/members/benefits/' },
    { name: 'Student Chapters', href: '/students' },
    { name: 'Student Chapter Directory', href: 'https://www.spe.org/en/students/' },
    { name: 'Member Directory', href: 'https://www.spe.org/en/memberbasics/' },
  ],
  events: [
    { name: 'Upcoming Events', href: '/events' },
    { name: 'Past Events', href: '/events/past' },
    { name: 'Event Calendar', href: '/events/calendar' },
    { name: 'Sponsorship', href: '/events/sponsorship' },
  ],
  about: [
    { name: 'About SPE', href: 'https://www.spe.org/en/about/' },
    { name: 'Leadership', href: '/leadership' },
    { name: 'Committees', href: '/about/committees' },
    { name: 'Volunteering', href: '/volunteering' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
  ],
}

const socialLinks = [
  { icon: FaLinkedin, href: 'https://linkedin.com/company/spe-mumbai', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://twitter.com/spemumbai', label: 'Twitter' },
  { icon: FaFacebook, href: 'https://facebook.com/spemumbai', label: 'Facebook' },
  { icon: FaYoutube, href: 'https://youtube.com/user/spemumbai', label: 'YouTube' },
  { icon: FaInstagram, href: 'https://instagram.com/spemumbai', label: 'Instagram' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-spe-navy via-[#001233] to-[#000a1f]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-spe-blue-400/40 to-transparent" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-spe-blue-400/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

      <div className="container-custom relative z-10 py-16">
        {/* Newsletter */}
        <div className="mb-16 pb-12 border-b border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="md:max-w-md">
              <h3 className="text-2xl font-extrabold text-white mb-2 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-spe-blue-400 to-blue-500 flex items-center justify-center text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </span>
                Stay Updated
              </h3>
              <p className="text-blue-200/70 text-sm leading-relaxed">
                Get the latest events, news, and updates from SPE Mumbai Section delivered to your inbox.
              </p>
            </div>
            <form className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-5 py-3.5 w-full sm:w-72 rounded-xl text-spe-gray-800 bg-white/95 focus:outline-none focus:ring-2 focus:ring-spe-blue-400 placeholder-spe-gray-400 text-sm font-medium shadow-inner-glow"
                  required
                />
              </div>
              <button type="submit"
                className="btn-gradient text-sm whitespace-nowrap !px-7">
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {[
            { title: 'Membership', links: footerLinks.membership },
            { title: 'Events', links: footerLinks.events },
            { title: 'About', links: footerLinks.about },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
                <span className="w-5 h-[2px] bg-gradient-to-r from-spe-blue-400 to-transparent rounded-full" />
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith('http') ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer"
                        className="text-blue-200/60 hover:text-white text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                        {link.name}
                      </a>
                    ) : (
                      <Link href={link.href}
                        className="text-blue-200/60 hover:text-white text-sm transition-all duration-200 hover:translate-x-1 inline-block">
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-5 h-[2px] bg-gradient-to-r from-spe-blue-400 to-transparent rounded-full" />
              Contact
            </h3>
            <address className="not-italic space-y-2.5 text-sm text-blue-200/60">
              <p>SPE Mumbai Section</p>
              <p>Mumbai, Maharashtra, India</p>
              <p className="mt-4">
                <a href="mailto:info@spemumbai.org" className="hover:text-white transition-colors duration-200 flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  info@spemumbai.org
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-blue-200/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5">
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Copyright & legal */}
            <div className="text-center md:text-right">
              <p className="text-blue-200/50 text-xs">
                &copy; {new Date().getFullYear()} SPE Mumbai Section. All rights reserved.
              </p>
              <p className="mt-1 flex items-center gap-3 justify-center md:justify-end">
                <Link href="/privacy-policy" className="text-blue-200/40 hover:text-white text-xs transition-colors duration-200">
                  Privacy Policy
                </Link>
                <span className="text-blue-200/20">|</span>
                <Link href="/terms-of-service" className="text-blue-200/40 hover:text-white text-xs transition-colors duration-200">
                  Terms of Service
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}