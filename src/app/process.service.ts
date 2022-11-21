import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, first} from "rxjs";
import {IProcess} from "./_interfaces/IProcess";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  $processList = new BehaviorSubject<IProcess[]>([]);
  $process = new BehaviorSubject<IProcess>({
    id: -1,
    title: "",
    stage: [{id: -1, prompt: "", type: "", choice: []}]
  });
  // $processEdit = new BehaviorSubject<IProcess | null>(null);

  indexStage: number = 0;
  indexChoice: number = 0;

  constructor(private httpService: HttpService) {
    this.getAllProcesses();
  }

  public getAllProcesses() {
    this.httpService.getAllProcesses().pipe(first()).subscribe({
      next: (processList) => {
        this.$processList.next(processList);
      },
      error: () => {
      }
    })
  }

  public postProcess(process: IProcess) {
    this.httpService.postProcess(process).pipe(first()).subscribe({
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

  public selectProcessEdit(processId: number) {
    for (let process of this.$processList.getValue()) {
      if (process.id === processId) {
        this.$process.next(process);
      }
    }
  }

  public onAddStage() {
    this.indexStage += 1;

    this.$process.getValue().stage.push({
      id: this.indexStage,
      prompt: "",
      type: "",
      choice: []
    });
  }

  onRemoveStage(stageIndex: number) {
    if (this.$process.getValue().stage.length <= 1) {
      return;
    }
    this.$process.getValue().stage.splice(stageIndex, 1);
  }

  onAddChoiceText(stageIndex: number) {
    this.indexChoice += 1;
    const index = this.$process.getValue().stage.filter((x) => x.id === stageIndex);
    index[0].choice.push({id: this.indexChoice, text: ""});
  }

  onRemoveChoiceText(stageIndex: number, choiceIndex: number) {
    const index = this.$process.getValue().stage.filter((x) => x.id === stageIndex);

    if (index[0].choice.length <= 2) {
      // todo add error
      return;
    }
    index[0].choice.splice(choiceIndex, 1);
  }

  onChange($event: any, stageIndex: number) {
    const index = this.$process.getValue().stage.filter((x) => x.id === stageIndex);
    index[0].type = $event;
    if ($event === "choice") {
      this.onAddChoiceText(stageIndex);
      this.onAddChoiceText(stageIndex);
    } else {
      index[0].choice = [];
    }
  }
}
