import type {
  SupportedLanguage,
} from '../models/Language'

export type SpeechRecognitionResult = {
  transcript: string
  language: SupportedLanguage
  isFinal: boolean
}

export type SpeechRecognitionCallbacks = {
  onResult: (
    result: SpeechRecognitionResult,
  ) => void
  onError: (error: Error) => void
  onEnd: () => void
}

export default interface ISpeechRecognitionService {
  isSupported(): boolean

  start(
    language: SupportedLanguage,
    callbacks: SpeechRecognitionCallbacks,
  ): void

  stop(): void
}
