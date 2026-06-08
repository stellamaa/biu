import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  basePath: '/admin',
  projectId: 'giv7mqda',
  dataset: 'production',
  title: 'Biu',
  plugins: [structureTool({structure})],
  schema: {
    types: schemaTypes,
  },
})