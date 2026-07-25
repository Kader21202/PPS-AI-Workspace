export default interface IResponseProvider {
  getResponse(question: string): Promise<string>

  streamResponse(
    question: string,
    onChunk: (chunk: string) => void,
  ): Promise<string>
}
