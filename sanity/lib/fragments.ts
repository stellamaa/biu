export const imageFields = /* groq */ `
  asset->{
    _id,
    url,
    metadata {
      lqip,
      dimensions { width, height, aspectRatio }
    }
  },
  alt,
  hotspot,
  crop
`

export const galleryImageFields = /* groq */ `
  _key,
  ${imageFields}
`
