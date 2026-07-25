import type IResponseProvider from './IResponseProvider'

class MockResponseProvider implements IResponseProvider {

  private isArabic(text: string): boolean {
    const arabicCharacters = text.match(/[\u0600-\u06FF]/g)?.length ?? 0
    const latinCharacters = text.match(/[A-Za-zÀ-ÿ]/g)?.length ?? 0

    return arabicCharacters > latinCharacters
  }

  async getResponse(question: string): Promise<string> {

    await new Promise((resolve) => {
      setTimeout(resolve, 2000)
    })

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

}

export default MockResponseProvider
