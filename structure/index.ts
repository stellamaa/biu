import {InfoOutlineIcon, ProjectsIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('About page')
        .icon(InfoOutlineIcon)
        .child(
          S.document()
            .schemaType('aboutPage')
            .documentId('aboutPage')
            .title('About page'),
        ),
      S.divider(),
      S.documentTypeListItem('project').title('Projects').icon(ProjectsIcon),
    ])
