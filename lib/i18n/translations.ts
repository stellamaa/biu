export type Locale = 'en' | 'es'

export const translations = {
  en: {
    landscapeArchitecture: 'Landscape Architecture',
    projects: 'Projects',
    about: 'About',
    inProgress: 'In Progress',
    founded: 'Founded',
    finalizado: 'Finalizado',
    images: 'images',
    projectInfo: 'Project info',
  },
  es: {
    landscapeArchitecture: 'Arquitectura del paisaje',
    projects: 'Proyectos',
    about: 'Acerca',
    inProgress: 'en desarrollo',
    founded: 'Fundada en',
    finalizado: 'Finalizado',
    images: 'imágenes',
    projectInfo: 'Información del proyecto',
  },
} as const

export type TranslationKey = keyof (typeof translations)['en']
