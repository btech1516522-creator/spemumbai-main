import Link from 'next/link'
import { FaLinkedin, FaTwitter, FaFacebook, FaYoutube, FaInstagram } from 'react-icons/fa'

const footerLinks = {
  membership: [
    { name: 'Join SPE', href: 'https://www.spe.org/en/join/' },
    { name: 'Membership Benefits', href: '/membership/benefits' },
    { name: 'Student Chapters', href: '/students' },
    { name: 'Student Chapter Directory', href: '/membership/student-chapters' },
    { name: 'Member Directory', href: '/membership/directory' },
  ],
  events: [
    { name: 'Upcoming Events', href: '/events' },
    { name: 'Past Events', href: '/events/past' },
    { name: 'Event Calendar', href: '/events/calendar' },
    { name: 'Sponsorship', href: '/events/sponsorship' },
  ],
  about: [
    { name: 'About SPE', href: '/about' },
    { name: 'Leadership', href: '/leadership' },
    { name: 'Committees', href: '/about/committees' },
    { name: 'Volunteering', href: '/volunteering' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-spe-navy text-white">
      <div className="container-custom py-12">
        {/* Newsletter Subscription */}
        <div className="mb-12 pb-10 border-b border-spe-gray-700">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="mb-6 md:mb-0 md:max-w-md">
              <h3 className="text-2xl font-extrabold text-white mb-2">Stay Updated</h3>
              <p className="text-blue-200">
                Subscribe to our newsletter for the latest events, news, and updates from SPE Mumbai Section
              </p>
            </div>
            <form className="w-full md:w-auto flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 w-full sm:w-64 mb-3 sm:mb-0 sm:mr-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-spe-blue"
                required
              />
              <button
                type="submit"
                className="px-5 py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Membership Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Membership</h3>
            <ul className="space-y-2">
              {footerLinks.membership.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('http') ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-100 hover:text-white text-base transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-blue-100 hover:text-white text-base transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Events Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Events</h3>
            <ul className="space-y-2">
              {footerLinks.events.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-blue-100 hover:text-white text-base transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-blue-100 hover:text-white text-base transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <address className="not-italic space-y-2 text-base">
              <p className="text-blue-100">SPE Mumbai Section</p>
              <p className="text-blue-100">Mumbai, Maharashtra</p>
              <p className="text-blue-100">India</p>
              <p className="mt-4">
                <a href="mailto:info@spemumbai.org" className="hover:text-white text-blue-100 transition-colors duration-200">
                  info@spemumbai.org
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Social Links and Copyright */}
        <div className="mt-12 pt-8 border-t border-spe-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a
                href="https://linkedin.com/company/spe-mumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com/spemumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <FaTwitter className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com/spemumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition-colors duration-200"
                aria-label="Facebook"
              >
                <FaFacebook className="h-6 w-6" />
              </a>
              <a
                href="https://youtube.com/user/spemumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition-colors duration-200"
                aria-label="YouTube"
              >
                <FaYoutube className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com/spemumbai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-100 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
            <div className="text-blue-200 text-sm">
              <p className="text-white">© {new Date().getFullYear()} SPE Mumbai Section. All rights reserved.</p>
              <p className="mt-1">
                <Link href="/privacy-policy" className="hover:text-white text-blue-100 transition-colors duration-200 mr-4">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="hover:text-white text-blue-100 transition-colors duration-200">
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