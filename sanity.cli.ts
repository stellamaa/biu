import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'giv7mqda',
    dataset: 'production',
  },
  typegen: {
    enabled: true,
    path: './**/*.{ts,tsx}',
    schema: 'schema.json',
    generates: './sanity.types.ts',
    overloadClientMethods: true,
  },
})
