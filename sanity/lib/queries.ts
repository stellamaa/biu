import {defineQuery} from 'next-sanity'
import {galleryImageFields, imageFields} from './fragments'

export const landingProjectsQuery = defineQuery(/* groq */ `
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    location,
    size,
    year,
    finalizado,
    mainImage {
      ${imageFields}
    },
    sketchImage {
      ${imageFields}
    }
  }
`)

export const projectsQuery = defineQuery(/* groq */ `
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    location,
    size,
    year,
    description,
    finalizado,
    mainImage {
      ${imageFields}
    },
    sketchImage {
      ${imageFields}
    },
    mapImage {
      ${imageFields}
    },
    imageGallery[] {
      ${galleryImageFields}
    }
  }
`)

export const projectBySlugQuery = defineQuery(/* groq */ `
  *[_type == "project" && (slug.current == $slug || _id == $slug)][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    location,
    size,
    year,
    description,
    finalizado,
    mainImage {
      ${imageFields}
    },
    sketchImage {
      ${imageFields}
    },
    mapImage {
      ${imageFields}
    },
    imageGallery[] {
      ${galleryImageFields}
    }
  }
`)

export const aboutPageQuery = defineQuery(/* groq */ `
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    aboutBiuTitle,
    biuFoundedYear,
    biuDescription,
    email,
    telephone1,
    telephone2,
    aboutImage {
      ${imageFields}
    }
  }
`)
