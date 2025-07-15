import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  languages,
  defaultLanguage,
  isValidLanguage
} from './app/[lang]/lib/i18n'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // 檢查路徑是否已經包含語系
  const pathnameIsMissingLocale = languages.every(
    locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // 如果沒有語系，重定向到預設語系
  if (pathnameIsMissingLocale) {
    const locale = defaultLanguage
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }

  // 檢查語系是否有效
  const segments = pathname.split('/')
  const localeSegment = segments[1]

  if (localeSegment && !isValidLanguage(localeSegment)) {
    const locale = defaultLanguage
    const remainingPath = segments.slice(2).join('/')
    return NextResponse.redirect(
      new URL(
        `/${locale}${remainingPath ? `/${remainingPath}` : ''}`,
        request.url
      )
    )
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico|.*\\..*).*)'
  ]
}
