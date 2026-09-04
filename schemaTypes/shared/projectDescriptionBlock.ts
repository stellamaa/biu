import {defineArrayMember, defineField} from 'sanity'

/** Portable Text blocks for project descriptions — paragraphs only. */
export const projectDescriptionBlock = defineArrayMember({
  type: 'block',
  styles: [{title: 'Paragraph', value: 'normal'}],
  lists: [],
  marks: {
    decorators: [],
    annotations: [],
  },
})

export const projectDescriptionField = defineField({
  name: 'description',
  title: 'Project description',
  type: 'array',
  of: [projectDescriptionBlock],
  description:
    'Write in Spanish. Press Enter for a new paragraph. English is generated automatically on the website.',
  validation: (rule) => rule.required().min(1),
})
