export type Locale = 'en' | 'es'

export const translations = {
  en: {
    landscapeArchitecture: 'Landscape Architecture',
    projects: 'Projects',
    about: 'About',
    inProgress: 'In Progress',
    founded: 'Founded',
  },
  es: {
    landscapeArchitecture: 'Arquitectura del paisaje',
    projects: 'Proyectos',
    about: 'Acerca',
    inProgress: 'en desarrollo',
    founded: 'Fundada en',
  },
} as const

export type TranslationKey = keyof (typeof translations)['en']
