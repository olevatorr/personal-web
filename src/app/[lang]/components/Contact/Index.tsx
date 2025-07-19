'use client'

import { useState } from 'react'
import { useTranslation } from '@/app/[lang]/lib/useTranslation'
import { usePathname } from 'next/navigation'
import { type Language } from '@/app/[lang]/lib/i18n'
import { motion } from 'framer-motion'
import Title from '@/app/[lang]/components/Atom/Title'
import { cn } from '@/app/[lang]/lib/utils'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormStatus {
  type: 'idle' | 'sending' | 'success' | 'error'
  message: string
}

export default function Contact() {
  const pathname = usePathname()
  const currentLang = pathname.split('/')[1] as Language
  const t = useTranslation(currentLang)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  })
  const [animationComplete, setAnimationComplete] = useState(false)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: 'sending', message: t.contact.form.sending })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ type: 'success', message: t.contact.form.success })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus({
          type: 'error',
          message: data.error || t.contact.form.error
        })
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setStatus({ type: 'error', message: t.contact.form.error })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  const formVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0
    }
  }

  return (
    <section
      id={t.header.navigation[3]}
      className="relative min-h-dvh py-20 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <Title title={t.contact.title} subtitle={t.contact.subtitle} />

        <motion.div
          className="max-w-2xl mx-auto"
          variants={formVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
          >
            <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {t.contact.form.name.label}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t.contact.form.name.placeholder}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </motion.div>

            <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {t.contact.form.email.label}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.contact.form.email.placeholder}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </motion.div>

            <motion.div variants={itemVariants} transition={{ duration: 0.5 }}>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                {t.contact.form.message.label}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t.contact.form.message.placeholder}
                rows={6}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={status.type === 'sending'}
              className={cn(
                "w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
                animationComplete
                  ? 'transition-all duration-300 '
                  : ''
              )}
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              whileTap={{ scale: 0.98 }}
              onAnimationComplete={() => setAnimationComplete(true)}
            >
              {status.type === 'sending'
                ? t.contact.form.sending
                : t.contact.form.submit}
            </motion.button>

            {status.type !== 'idle' && (
              <motion.div
                className={`text-center p-2 px-4 rounded-lg absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full ${
                  status.type === 'success'
                    ? 'bg-green-500/20 text-green-300'
                    : status.type === 'error'
                      ? 'bg-red-500/20 text-red-300'
                      : 'bg-blue-500/20 text-blue-300'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {status.message}
              </motion.div>
            )}
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
