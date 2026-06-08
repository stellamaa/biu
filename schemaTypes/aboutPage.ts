import {defineField, defineType} from 'sanity'
import {InfoOutlineIcon} from '@sanity/icons'
import {imageWithHotspot} from './shared/imageFields'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About page',
  type: 'document',
  icon: InfoOutlineIcon,
  fields: [
    imageWithHotspot('aboutImage', 'About image'),
    defineField({
      name: 'aboutBiuTitle',
      title: 'About BIU title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'biuFoundedYear',
      title: 'BIU founded year',
      type: 'string',
      description: 'For example: 2022',
    }),
    defineField({
      name: 'biuDescription',
      title: 'BIU description',
      type: 'text',
      rows: 10,
      description:
        'Write in Spanish. English is generated automatically on the website.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'aboutBasiTitle',
      title: 'About Basi title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'basiFoundedYear',
      title: 'BASI founded year',
      type: 'string',
      description: 'For example: 2019',
    }),
    defineField({
      name: 'basiDescription',
      title: 'BASI description',
      type: 'text',
      rows: 10,
      description:
        'Write in Spanish. English is generated automatically on the website.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'telephone1',
      title: 'Telephone number 1',
      type: 'string',
    }),
    defineField({
      name: 'telephone2',
      title: 'Telephone number 2',
      type: 'string',
    }),
  ],
  preview: {
    prepare: () => ({title: 'About page'}),
  },
})
