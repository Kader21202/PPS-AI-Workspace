export type SupportedLanguage =
  | 'fr'
  | 'ar'
  | 'ary'
  | 'zgh'
  | 'en'

export type WritingSystem =
  | 'latin'
  | 'arabic'
  | 'arabizi'
  | 'tifinagh'

export type LanguageDefinition = {
  code: SupportedLanguage
  label: string
  nativeLabel: string
  writingSystems: WritingSystem[]
  speechRecognitionLocale?: string
  speechSynthesisLocale?: string
}

export const supportedLanguages: LanguageDefinition[] = [
  {
    code: 'fr',
    label: 'Français',
    nativeLabel: 'Français',
    writingSystems: ['latin'],
    speechRecognitionLocale: 'fr-FR',
    speechSynthesisLocale: 'fr-FR',
  },
  {
    code: 'ar',
    label: 'Arabe standard',
    nativeLabel: 'العربية الفصحى',
    writingSystems: ['arabic'],
    speechRecognitionLocale: 'ar-MA',
    speechSynthesisLocale: 'ar-MA',
  },
  {
    code: 'ary',
    label: 'Darija marocaine',
    nativeLabel: 'الدارجة المغربية',
    writingSystems: [
      'arabic',
      'latin',
      'arabizi',
    ],
    speechRecognitionLocale: 'ar-MA',
    speechSynthesisLocale: 'ar-MA',
  },
  {
    code: 'zgh',
    label: 'Amazighe standard marocain',
    nativeLabel: 'ⵜⴰⵎⴰⵣⵉⵖⵜ',
    writingSystems: [
      'tifinagh',
      'latin',
      'arabic',
    ],
    speechRecognitionLocale: 'zgh-MA',
    speechSynthesisLocale: 'zgh-MA',
  },
  {
    code: 'en',
    label: 'Anglais',
    nativeLabel: 'English',
    writingSystems: ['latin'],
    speechRecognitionLocale: 'en-US',
    speechSynthesisLocale: 'en-US',
  },
]




