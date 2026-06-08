import {defineQuery} from 'next-sanity'
import {galleryImageFields, imageFields} from './fragments'

export const projectsQuery = defineQuery(/* groq */ `
  *[_type == "project"] | order(_createdAt desc) {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
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

export const projectByIdQuery = defineQuery(/* groq */ `
  *[_type == "project" && _id == $id][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
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
    aboutBasiTitle,
    basiFoundedYear,
    basiDescription,
    email,
    telephone1,
    telephone2,
    aboutImage {
      ${imageFields}
    }
  }
`)
