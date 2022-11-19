export interface IProcessCreate {
  title: string
  stage: { index: number, prompt: string, type: string, choice: { index: number, text: string }[] }[]
}
