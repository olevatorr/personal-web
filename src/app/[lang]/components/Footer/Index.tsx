'use client'

import Link from 'next/link'
import { FaGithub, FaLinkedin, FaDownload, FaArrowUp } from 'react-icons/fa'
import { useTranslation } from '@/app/[lang]/lib/useTranslation'
import { usePathname } from 'next/navigation'
import { type Language } from '@/app/[lang]/lib/i18n'
import { useLenis } from '@/app/[lang]/lib/useLenis'

export default function Footer() {
  const pathname = usePathname()
  const currentLang = pathname.split('/')[1] as Language
  const t = useTranslation(currentLang)
  const lenis = useLenis()

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 })
    }
  }

  return (
    <footer className="relative bg-black/50 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Social Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Link
              href="https://github.com/otischen"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <FaGithub className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              <span className="text-gray-300 group-hover:text-white transition-colors">
                {t.footer.social.github}
              </span>
            </Link>

            <Link
              href="https://linkedin.com/in/otischen"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <FaLinkedin className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              <span className="text-gray-300 group-hover:text-white transition-colors">
                {t.footer.social.linkedin}
              </span>
            </Link>

            <Link
              href="/cv/otis-chen-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <FaDownload className="w-4 h-4 text-white" />
              <span className="text-white font-medium">
                {t.footer.social.resume}
              </span>
            </Link>
          </div>

          {/* Move to Top Button */}
          <button
            onClick={handleScrollToTop}
            className="group absolute top-0 right-10 -translate-y-[150%] flex items-center gap-2 px-4 py-2 transition-all duration-200 cursor-pointer"
          >
            <FaArrowUp className="w-4 h-4 text-gray-300 group-hover:text-white transition-colors" />
            <span className="text-gray-300 group-hover:text-white transition-colors text-sm">
              {t.footer.moveToTop}
            </span>
          </button>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} {t.footer.buildBy}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
