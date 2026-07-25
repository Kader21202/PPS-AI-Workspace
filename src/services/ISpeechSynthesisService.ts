import type {
  SupportedLanguage,
} from '../models/Language'

export type SpeechSynthesisOptions = {
  language: SupportedLanguage
  rate?: number
  pitch?: number
  volume?: number
}

export default interface ISpeechSynthesisService {
  isSupported(): boolean

  speak(
    content: string,
    options: SpeechSynthesisOptions,
  ): void

  pause(): void
  resume(): void
  stop(): void
}
