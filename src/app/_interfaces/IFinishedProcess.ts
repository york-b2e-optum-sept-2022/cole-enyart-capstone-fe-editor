export interface IFinishedProcess {
  id: number,
  title: string
  finishedStages: { prompt: string, answer: string, finishedChoices: { text: string, "value": string } [] }[]
}
