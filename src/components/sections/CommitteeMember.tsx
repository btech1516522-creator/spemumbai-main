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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row"
    >
      <div className="relative w-full md:w-1/3 h-64 md:h-auto">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-spe-gray-100">
            <FaUser className="text-7xl text-spe-blue-300" />
          </div>
        )}
        {linkedin && (
          <a 
            href={linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 bg-spe-blue-500 text-white p-2 rounded-full hover:bg-spe-blue-700 transition-colors"
          >
            <FaLinkedin size={20} />
          </a>
        )}
      </div>
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-xl font-bold text-spe-blue-700">{name}</h3>
          <p className="text-lg font-semibold text-spe-gray-700">{position}</p>
          <p className="text-spe-gray-800 mb-2">{organization}</p>
          <p className="text-spe-gray-700">{bio}</p>
        </div>
      </div>
    </motion.div>
  )
} 