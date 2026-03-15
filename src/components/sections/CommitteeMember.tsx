'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaLinkedin, FaUser } from 'react-icons/fa'
import { CommitteeMember as CommitteeMemberType } from '@/data/leadership'

interface CommitteeMemberProps {
  member: CommitteeMemberType;
  index: number;
}

export default function CommitteeMember({ member, index }: CommitteeMemberProps) {
  const { name, position, organization, bio, linkedin, image } = member;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-500 border border-spe-gray-100 hover:border-spe-blue-200 hover:shadow-elevated hover:-translate-y-2"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-spe-navy via-spe-blue-400 to-spe-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Photo container — fixed aspect ratio for uniform sizing */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-gradient-to-br from-spe-blue-50 to-spe-gray-100">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-spe-blue-100 to-spe-blue-200 flex items-center justify-center">
              <FaUser className="text-4xl text-spe-blue-400" />
            </div>
          </div>
        )}

        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {/* LinkedIn icon overlay — bottom right */}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-spe-navy p-2.5 rounded-xl hover:bg-spe-navy hover:text-white transition-all duration-300 shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          >
            <FaLinkedin size={16} />
          </a>
        )}
      </div>

      {/* Info section */}
      <div className="p-5 flex flex-col flex-1 text-center">
        <h3 className="text-lg font-bold text-spe-navy mb-0.5 group-hover:text-spe-blue-500 transition-colors duration-300 leading-snug">{name}</h3>
        <p className="text-sm font-semibold text-spe-blue-500 mb-0.5 leading-snug">{position}</p>
        <p className="text-xs text-spe-gray-400 font-medium tracking-wide uppercase">{organization}</p>
      </div>
    </motion.div>
  )
} 