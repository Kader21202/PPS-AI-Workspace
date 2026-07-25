import type { SupportedLanguage } from '../../models/Language'

type LanguageListener = (
  language: SupportedLanguage,
) => void

export default class LocalizationController {
  private currentLanguage: SupportedLanguage

  private listeners = new Set<LanguageListener>()

  constructor(
    initialLanguage: SupportedLanguage = 'fr',
  ) {
    this.currentLanguage = initialLanguage
  }

  getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage
  }

  setCurrentLanguage(
    language: SupportedLanguage,
  ): void {
    if (this.currentLanguage === language) {
      return
    }

    this.currentLanguage = language

    this.listeners.forEach(listener =>
      listener(language),
    )
  }

  subscribe(
    listener: LanguageListener,
  ): () => void {
    this.listeners.add(listener)

    return () => {
      this.listeners.delete(listener)
    }
  }
}

