export interface IProcess {
  id: number
  title: string
  stage: {prompt: string, type: string, choice: []}[]
}
