import {defineField} from 'sanity'

export const imageAltField = defineField({
  name: 'alt',
  type: 'string',
  title: 'Alternative text',
})

export const imageWithHotspot = (name: string, title: string, description?: string) =>
  defineField({
    name,
    type: 'image',
    title,
    description,
    options: {hotspot: true},
    fields: [imageAltField],
  })
