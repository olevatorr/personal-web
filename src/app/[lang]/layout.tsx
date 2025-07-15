import type { Metadata } from 'next'
import Header from '@/app/[lang]/components/layout/header'
import LenisProvider from '@/app/[lang]/components/LenisProvider'
import CustomScrollBar from '@/app/[lang]/components/CustomScrollBar'
import './globals.css'
import { JetBrains_Mono } from 'next/font/google'
import { Chocolate_Classical_Sans } from 'next/font/google'
import { ReactElement } from 'react'
import { languages } from '@/app/[lang]/lib/i18n'
type RootLayoutProps = {
  children: ReactElement
  params: Promise<{ lang: string }>
}
export async function generateStaticParams() {
  return languages.map(lang => ({ lang }))
}

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetBrains-mono',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800']
})

const huninnSans = Chocolate_Classical_Sans({
  variable: '--font-chocolate-sans',
  subsets: ['latin'],
  weight: ['400']
})

export const metadata: Metadata = {
  title: 'Otis Chen | Frontend Developer',
  description:
    "Hello, I'm Otis Chen. A Frontend Developer with hands-on experience in building high-performance, responsive, and user-friendly web applications."
}

export default async function RootLayout({
  children,
  params
}: RootLayoutProps) {
  const { lang } = await params

  return (
    <html lang={lang}>
      <body
        className={`${jetBrainsMono.variable} ${huninnSans.variable} antialiased *:font-mix `}
      >
        <LenisProvider>
          <Header />
          {children}
          <CustomScrollBar />
        </LenisProvider>
      </body>
    </html>
  )
}
