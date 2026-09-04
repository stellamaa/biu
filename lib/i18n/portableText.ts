import type {ProjectBySlugQueryResult} from '@/sanity.types'
import {translateText} from './translateContent'
import type {Locale} from './translations'

export type ProjectDescriptionBlock = NonNullable<
  NonNullable<ProjectBySlugQueryResult>['description']
>[number]

export function portableTextHasContent(
  blocks: ProjectDescriptionBlock[] | null | undefined,
): boolean {
  if (!blocks?.length) return false

  return blocks.some((block) => {
    if (block._type !== 'block' || !Array.isArray(block.children)) return false
    return block.children.some(
      (child) =>
        child._type === 'span' &&
        typeof child.text === 'string' &&
        child.text.trim().length > 0,
    )
  })
}

export function portableTextToPlainText(
  blocks: ProjectDescriptionBlock[] | null | undefined,
): string {
  if (!blocks?.length) return ''

  return blocks
    .map((block) => {
      if (block._type !== 'block' || !Array.isArray(block.children)) return ''
      return block.children
        .filter((child) => child._type === 'span')
        .map((child) => child.text ?? '')
        .join('')
    })
    .filter((paragraph) => paragraph.trim().length > 0)
    .join('\n\n')
}

async function translateDescriptionBlock(
  block: ProjectDescriptionBlock,
  locale: Locale,
): Promise<ProjectDescriptionBlock> {
  if (block._type !== 'block' || !Array.isArray(block.children)) {
    return block
  }

  const paragraph = block.children
    .filter((child) => child._type === 'span')
    .map((child) => child.text ?? '')
    .join('')

  if (!paragraph.trim()) return block

  const translated = await translateText(paragraph, locale)
  const [firstChild, ...restChildren] = block.children

  if (!firstChild || firstChild._type !== 'span') {
    return block
  }

  return {
    ...block,
    children: [
      {...firstChild, text: translated},
      ...restChildren.map((child) =>
        child._type === 'span' ? {...child, text: ''} : child,
      ),
    ],
  }
}

export async function translatePortableText(
  blocks: ProjectDescriptionBlock[] | null | undefined,
  locale: Locale,
): Promise<ProjectDescriptionBlock[]> {
  if (!blocks?.length) return []
  if (locale === 'es') return blocks

  return Promise.all(blocks.map((block) => translateDescriptionBlock(block, locale)))
}

export function clonePortableText(
  blocks: ProjectDescriptionBlock[] | null | undefined,
): ProjectDescriptionBlock[] {
  if (!blocks?.length) return []
  return structuredClone(blocks)
}
