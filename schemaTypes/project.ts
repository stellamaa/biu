import {defineArrayMember, defineField, defineType} from 'sanity'
import {ProjectsIcon} from '@sanity/icons'
import {imageWithHotspot} from './shared/imageFields'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Project title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Project location',
      type: 'string',
      description: 'For example: San Isidro, Lima, Perú',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Project size',
      type: 'string',
      description: 'For example: 13 hectares',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Project year',
      type: 'string',
      description: 'For example: 2023 or 2025–2026',
      validation: (rule) => rule.required(),
    }),
    imageWithHotspot('mainImage', 'Project main image'),
    imageWithHotspot(
      'sketchImage',
      'Project sketch image',
      'PNG sketch overlay (upload as PNG when possible).',
    ),
    defineField({
      name: 'imageGallery',
      title: 'Project image gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Project description',
      type: 'text',
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'finalizado',
      title: 'Finalizado',
      type: 'boolean',
      description:
        'Checked when the project is finished. Unchecked means the project is en desarrollo.',
      initialValue: false,
      options: {layout: 'checkbox'},
    }),
    imageWithHotspot(
      'mapImage',
      'Project map image',
      'PNG map overlay (upload as PNG when possible).',
    ),
  ],
  preview: {
    select: {title: 'title', subtitle: 'location', media: 'mainImage'},
  },
})
