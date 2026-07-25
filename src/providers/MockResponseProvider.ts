import type IResponseProvider from './IResponseProvider'

class MockResponseProvider implements IResponseProvider {
  private isArabic(text: string): boolean {
    const arabicCharacters =
      text.match(/[\u0600-\u06FF]/g)?.length ?? 0

    const latinCharacters =
      text.match(/[A-Za-zÀ-ÿ]/g)?.length ?? 0

    return arabicCharacters > latinCharacters
  }

  private buildResponse(question: string): string {
    if (this.isArabic(question)) {
      return `إجابة محلية تجريبية.

السؤال المستلم:

"${question}"

تم إنشاء هذه الإجابة بواسطة MockResponseProvider.

سيتم ربط PPS-Maroc.ia-V2 مع PPS-AI-Workspace في الإصدار V2.1.`
    }

    return `Réponse locale de démonstration.

Question reçue :

"${question}"

Cette réponse est produite par MockResponseProvider.

La connexion avec PPS-Maroc.ia-V2 sera réalisée dans PPS-AI-Workspace V2.1.`
  }

  private async wait(duration: number): Promise<void> {
    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, duration)
    })
  }

  async getResponse(question: string): Promise<string> {
    await this.wait(2000)

    return this.buildResponse(question)
  }

  async streamResponse(
    question: string,
    onChunk: (chunk: string) => void,
  ): Promise<string> {
    await this.wait(800)

    const response = this.buildResponse(question)

    const chunks =
      response.match(/\S+\s*|\s+/g) ?? [response]

    for (const chunk of chunks) {
      onChunk(chunk)
      await this.wait(45)
    }

    return response
  }
}

export default MockResponseProvider
