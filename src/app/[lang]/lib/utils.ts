import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiSass,
  SiVuedotjs,
  SiNuxtdotjs,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiPhp,
  SiPython,
  SiOpenjdk,
  SiGit,
  SiDocker,
  SiKubernetes,
  SiSwagger,
  SiPostman,
  SiGithubactions,
  SiGoogleanalytics,
  SiGreensock,
  SiThreedotjs,
  SiSwiper,
  SiWordpress,
  SiNginx,
  SiGitlab,
  SiGoogletagmanager,
  SiJquery
} from 'react-icons/si'

import { FaUniversalAccess } from 'react-icons/fa6'
import { TbSeo } from 'react-icons/tb'
import { MdGridView } from 'react-icons/md'
import { RiLayoutRowFill } from 'react-icons/ri'
import { FaCube } from 'react-icons/fa'
import { BsFileEarmarkCode } from 'react-icons/bs'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSkillIcon = (iconName: string) => {
  const iconMap = {
    html: SiHtml5,
    css: SiCss3,
    javascript: SiJavascript,
    sass: SiSass,
    vue: SiVuedotjs,
    nuxt: SiNuxtdotjs,
    react: SiReact,
    nextjs: SiNextdotjs,
    tailwind: SiTailwindcss,
    typescript: SiTypescript,
    nodejs: SiNodedotjs,
    express: SiExpress,
    mysql: SiMysql,
    php: SiPhp,
    python: SiPython,
    java: SiOpenjdk,
    git: SiGit,
    docker: SiDocker,
    kubernetes: SiKubernetes,
    'ci-cd': SiGithubactions,
    swagger: SiSwagger,
    postman: SiPostman,
    accessibility: FaUniversalAccess,
    seo: TbSeo,
    'google-analytics': SiGoogleanalytics,
    'css-grid': MdGridView,
    flexbox: RiLayoutRowFill,
    gsap: SiGreensock,
    threejs: SiThreedotjs,
    spline: FaCube,
    swiper: SiSwiper,
    wordpress: SiWordpress,
    nginx: SiNginx,
    gitlab: SiGitlab,
    gtm: SiGoogletagmanager,
    'json-ld': BsFileEarmarkCode,
    jquery: SiJquery
  }

  return iconMap[iconName as keyof typeof iconMap] || SiReact
}
