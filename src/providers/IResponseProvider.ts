export default interface IResponseProvider {
  getResponse(question: string): Promise<string>
}
