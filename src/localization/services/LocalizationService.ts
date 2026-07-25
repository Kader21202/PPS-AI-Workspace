import type { SupportedLanguage } from '../../models/Language'
import type { LocalizationMessages } from '../contracts/LocalizationMessages'

import fr from '../resources/fr'
import ar from '../resources/ar'
import ary from '../resources/ary'
import zgh from '../resources/zgh'
import en from '../resources/en'

const resources: Record<
  SupportedLanguage,
  LocalizationMessages
> = {
  fr,
  ar,
  ary,
  zgh,
  en,
}

export default class LocalizationService {
  getMessages(
    language: SupportedLanguage,
  ): LocalizationMessages {
    return resources[language]
  }

  translate<
    K extends keyof LocalizationMessages,
  >(
    language: SupportedLanguage,
    key: K,
  ): LocalizationMessages[K] {
    return resources[language][key]
  }
}
