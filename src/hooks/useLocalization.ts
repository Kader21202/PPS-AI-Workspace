import { useEffect, useState } from 'react'
import type { SupportedLanguage } from '../models/Language'
import type {
  LocalizationMessages,
} from '../localization/contracts/LocalizationMessages'
import { localizationRegistry } from '../localization'

export default function useLocalization() {
  const controller =
    localizationRegistry.getController()

  const service =
    localizationRegistry.getService()

  const [currentLanguage, setCurrentLanguage] =
    useState<SupportedLanguage>(
      controller.getCurrentLanguage(),
    )

  useEffect(() => {
    const unsubscribe =
      controller.subscribe(language => {
        setCurrentLanguage(language)
      })

    return unsubscribe
  }, [controller])

  const translate = <
    K extends keyof LocalizationMessages,
  >(
    key: K,
  ): LocalizationMessages[K] =>
    service.translate(currentLanguage, key)

  return {
    currentLanguage,
    setLanguage: (
      language: SupportedLanguage,
    ) => controller.setCurrentLanguage(language),
    t: translate,
  }
}
