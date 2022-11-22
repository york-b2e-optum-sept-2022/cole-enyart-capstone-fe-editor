export interface IFinishedProcess {
  id: number,
  title: string
  finishedStages: { prompt: string, answer: string }[]
}
