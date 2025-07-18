import { motion } from 'motion/react'

interface TitleProps {
  title: string
  subtitle?: string
}

export default function Title({ title, subtitle }: TitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold text-white mb-4">{title}</h2>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
      {subtitle && <p className="text-gray-400 text-xl mt-4">{subtitle}</p>}
    </motion.div>
  )
}
