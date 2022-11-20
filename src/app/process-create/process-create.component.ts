import {Component, OnDestroy} from '@angular/core';
import {IProcessCreate} from "../_interfaces/IProcessCreate";
import {Subject, takeUntil} from "rxjs";
import {ViewService} from "../view.service";
import {ProcessService} from "../process.service";

@Component({
  selector: 'app-process-create',
  templateUrl: './process-create.component.html',
  styleUrls: ['./process-create.component.css']
})
export class ProcessCreateComponent implements OnDestroy {

  createProcess: IProcessCreate = {
    title: "",
    stage: [{index: 0, prompt: "", type: "", choice: []}]
  };
  indexStage: number = 0;
  indexChoice: number = 0;
  onDestroy = new Subject();

  constructor(private processService: ProcessService, private viewService: ViewService) {
    this.processService.$processCreate.pipe(takeUntil(this.onDestroy)).subscribe({
      next: (processCreate) => {
        if (processCreate) {
          this.createProcess = processCreate;
        }
      },
      error: () => {}
    })
  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onCreate() {
    this.processService.postProcess(this.createProcess);
    this.viewService.viewProcessList();
  }

  onCancel() {
    this.viewService.viewProcessList();
  }

  onAddStage() {
    this.indexStage += 1;
    this.createProcess.stage.push({
      index: this.indexStage,
      prompt: "",
      type: "",
      choice: []
    });
  }

  onRemoveStage(stageIndex: number) {
    if (this.createProcess.stage.length <= 1) {
      return;
    }
    this.createProcess.stage.splice(stageIndex, 1);
  }

  onAddChoiceText(stageIndex: number) {
    this.indexChoice += 1;
    const index = this.createProcess.stage.filter((x) => x.index === stageIndex);
    index[0].choice.push({index: this.indexChoice, text: ""});
  }

  onRemoveChoiceText(stageIndex: number, choiceIndex: number) {
    const index = this.createProcess.stage.filter((x) => x.index === stageIndex);

    if (index[0].choice.length <= 2) {
      // todo add error
      return;
    }
    index[0].choice.splice(choiceIndex, 1);
  }

  onChange($event: any, stageIndex: number) {
    const index = this.createProcess.stage.filter((x) => x.index === stageIndex);
    index[0].type = $event;
    if ($event === "choice") {
      this.onAddChoiceText(stageIndex);
      this.onAddChoiceText(stageIndex);
    } else {
      index[0].choice = [];
    }
  }

}
