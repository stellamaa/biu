import {translations, type Locale} from './translations'

export function getLabels(locale: Locale) {
  return translations[locale]
}
