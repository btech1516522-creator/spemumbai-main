import Link from 'next/link'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Events', href: '/events' },
    { name: 'Resources', href: '/resources' },
    { name: 'Membership', href: '/membership' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="bg-white/80 shadow-md backdrop-blur-md fixed w-full z-50 transition-all duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/spe-logo.png"
              alt="SPE Logo"
              width={48}
              height={48}
              className="mr-2"
            />
            <span className="text-spe-blue font-bold text-2xl">SPE Mumbai</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-spe-gray hover:text-spe-blue transition-colors duration-300 relative group text-base font-semibold"
              >
                {item.name}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-spe-blue transition-all duration-300 group-hover:w-full group-hover:h-0.5"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-7 w-7 text-spe-blue" />
            ) : (
              <Bars3Icon className="h-7 w-7 text-spe-blue" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden transition-all duration-300">
            <div className="px-2 pt-2 pb-3 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-spe-gray hover:text-spe-blue hover:bg-gray-50 rounded-md text-base font-semibold transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}