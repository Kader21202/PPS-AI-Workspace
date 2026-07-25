import type IResponseProvider from './IResponseProvider'

type PPSMarocV2ChatResponse = {
  question?: string
  answer: string
  sources?: unknown[]
  metadata?: Record<string, unknown>
}

class PPSMarocV2ResponseProvider implements IResponseProvider {
  private readonly endpoint: string

  constructor(
    endpoint = 'http://127.0.0.1:3001/api/chat',
  ) {
    this.endpoint = endpoint
  }

  async getResponse(question: string): Promise<string> {
    const normalizedQuestion = question.trim()

    if (!normalizedQuestion) {
      throw new Error(
        'PPSMarocV2ResponseProvider requires a non-empty question.',
      )
    }

    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: normalizedQuestion,
      }),
    })

    if (!response.ok) {
      throw new Error(
        `PPS-Maroc.ia-V2 request failed with status ${response.status}.`,
      )
    }

    const payload =
      (await response.json()) as PPSMarocV2ChatResponse

    if (
      typeof payload.answer !== 'string' ||
      !payload.answer.trim()
    ) {
      throw new Error(
        'PPS-Maroc.ia-V2 returned an invalid or empty answer.',
      )
    }

    return payload.answer
  }

  async streamResponse(
    question: string,
    onChunk: (chunk: string) => void,
  ): Promise<string> {
    const answer = await this.getResponse(question)

    const chunks =
      answer.match(/\S+\s*|\s+/g) ?? [answer]

    for (const chunk of chunks) {
      onChunk(chunk)

      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 25)
      })
    }

    return answer
  }
}

export default PPSMarocV2ResponseProvider
