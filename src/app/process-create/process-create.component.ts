import {Component, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ViewService} from "../view.service";
import {ProcessService} from "../process.service";
import {IProcess} from "../_interfaces/IProcess";

@Component({
  selector: 'app-process-create',
  templateUrl: './process-create.component.html',
  styleUrls: ['./process-create.component.css']
})
export class ProcessCreateComponent implements OnDestroy {

  createProcess!: IProcess
  // indexStage: number = 0;
  // indexChoice: number = 0;
  onDestroy = new Subject();

  constructor(private processService: ProcessService, private viewService: ViewService) {
    this.processService.$process.pipe(takeUntil(this.onDestroy)).subscribe({
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
    this.processService.onAddStage();

    // this.indexStage += 1;
    // this.createProcess.stage.push({
    //   index: this.indexStage,
    //   prompt: "",
    //   type: "",
    //   choice: []
    // });
  }

  onRemoveStage(stageIndex: number) {
    this.processService.onRemoveStage(stageIndex);

    // if (this.createProcess.stage.length <= 1) {
    //   return;
    // }
    // this.createProcess.stage.splice(stageIndex, 1);
  }

  onAddChoiceText(stageIndex: number) {
    this.processService.onAddChoiceText(stageIndex);

    // this.indexChoice += 1;
    // const index = this.createProcess.stage.filter((x) => x.index === stageIndex);
    // index[0].choice.push({index: this.indexChoice, text: ""});
  }

  onRemoveChoiceText(stageIndex: number, choiceIndex: number) {
    this.processService.onRemoveChoiceText(stageIndex, choiceIndex);

    // const index = this.createProcess.stage.filter((x) => x.index === stageIndex);
    //
    // if (index[0].choice.length <= 2) {
    //   // todo add error
    //   return;
    // }
    // index[0].choice.splice(choiceIndex, 1);
  }

  onChange($event: any, stageIndex: number) {
    this.processService.onChange($event, stageIndex);

    // const index = this.createProcess.stage.filter((x) => x.index === stageIndex);
    // index[0].type = $event;
    // if ($event === "choice") {
    //   this.onAddChoiceText(stageIndex);
    //   this.onAddChoiceText(stageIndex);
    // } else {
    //   index[0].choice = [];
    // }
  }

}
