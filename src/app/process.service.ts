import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, first} from "rxjs";
import {IProcess} from "./_interfaces/IProcess";
import {IFinishedProcess} from "./_interfaces/IFinishedProcess";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  $processList = new BehaviorSubject<IProcess[]>([]);
  $finishedProcessList = new BehaviorSubject<IFinishedProcess[]>([]);
  $process = new BehaviorSubject<IProcess>({
    id: 0,
    title: "",
    stages: [{id: 0, prompt: "", type: "", choices: []}]
  });
  $processError = new BehaviorSubject<string>("");
  private NO_CHOICE_ERROR = "Cannot have less then two multiple choice answers";
  private NO_STAGE_ERROR = "Cannot have less than one stage";

  indexStage: number = 0;
  indexChoice: number = 0;

  constructor(private httpService: HttpService) {
    this.getAllProcesses();
  }

  public getAllProcesses() {
    this.httpService.getAllProcesses().pipe(first()).subscribe({
      next: (processList) => {
        for(let process of processList) {
          process.stages?.sort((a, b) => (a.id > b.id ? 1 : -1))
        }

        this.$processList.next(processList);
      },
      error: () => {
      }
    })
  }

  public getAllFinishedProcesses() {
    this.httpService.getAllFinishedProcesses().pipe(first()).subscribe({
      next: (finishedProcessList) => {
        this.$finishedProcessList.next(finishedProcessList);
      },
      error: () => {
      }
    })
  }

  public createProcess(process: IProcess) {
    this.httpService.createProcess(process).pipe(first()).subscribe({
      next: () => {
        this.getAllProcesses();
      },
      error: () => {
      }
    })
  }

  public deleteProcess(processId: number) {
    this.httpService.deleteProcess(processId).pipe(first()).subscribe({
      next: () => {
        this.getAllProcesses();
      },
      error: () => {
      }
    })
  }

  public updateProcess(process: IProcess) {
    this.httpService.updateProcess(process).pipe(first()).subscribe({
      next: () => {
        this.getAllProcesses();
      },
      error: () => {
      }
    })
  }

  public selectProcessEdit(processId: number) {
    for (let process of this.$processList.getValue()) {
      if (process.id === processId) {
        this.$process.next(process);
      }
    }
  }

  public onAddStage() {
    this.$processError.next("");

    this.indexStage -= 1;
    this.$process.getValue().stages.push({
      id: this.indexStage,
      prompt: "",
      type: "",
      choices: []
    });
  }

  onRemoveStage(stageIndex: number) {
    this.$processError.next("");

    if (this.$process.getValue().stages.length <= 1) {
      this.$processError.next(this.NO_STAGE_ERROR);
      return;
    }
    this.$process.getValue().stages.splice(stageIndex, 1);
  }

  onAddChoiceText(stageIndex: number) {
    this.$processError.next("");

    this.indexChoice -= 1;
    const index = this.$process.getValue().stages.filter((stage) => stage.id === stageIndex);
    index[0].choices.push({id: this.indexChoice, text: ""});
  }

  onRemoveChoiceText(stageIndex: number, choiceIndex: number) {
    const index = this.$process.getValue().stages.filter((stage) => stage.id === stageIndex);
    this.$processError.next("");

    if (index[0].choices.length <= 2) {
      this.$processError.next(this.NO_CHOICE_ERROR);
      return;
    }
    index[0].choices.splice(choiceIndex, 1);
  }

  onChange($event: any, stageIndex: number) {
    this.$processError.next("");

    const index = this.$process.getValue().stages.filter((stage) => stage.id === stageIndex);
    index[0].type = $event;

    if ($event === "choice") {
      this.onAddChoiceText(stageIndex);
      this.onAddChoiceText(stageIndex);
    } else {
      index[0].choices = [];
    }
  }

}
