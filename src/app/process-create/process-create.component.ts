import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ViewService} from "../view.service";
import {ProcessService} from "../process.service";
import {IProcess} from "../_interfaces/IProcess";

@Component({
  selector: 'app-process-create',
  templateUrl: './process-create.component.html',
  styleUrls: ['./process-create.component.css']
})
export class ProcessCreateComponent implements OnInit, OnDestroy {

  createProcess!: IProcess
  errorMessage: string = "";
  onDestroy = new Subject();

  constructor(private processService: ProcessService, private viewService: ViewService) {
    this.processService.$process.pipe(takeUntil(this.onDestroy)).subscribe({
      next: (process) => {
        this.createProcess = process;
      },
      error: () => {
      }
    });

    this.processService.$processError.pipe(takeUntil(this.onDestroy)).subscribe( {
      next: (errorMessage) => {
        this.errorMessage = errorMessage;
      },
      error: () => {
      }
    });
  }

  ngOnInit() {
    this.processService.$process.next({
      id: 0,
      title: "",
      stages: [{id: 0, prompt: "", type: "", choices: []}]
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onCreate() {
    this.processService.createProcess(this.createProcess);
    this.viewService.viewProcessList();
  }

  onCancel() {
    this.viewService.viewProcessList();
  }

  onAddStage() {
    this.processService.onAddStage();
  }

  onRemoveStage(stageIndex: number) {
    this.processService.onRemoveStage(stageIndex);
  }

  onAddChoiceText(stageIndex: number) {
    this.processService.onAddChoiceText(stageIndex);
  }

  onRemoveChoiceText(stageIndex: number, choiceIndex: number) {
    this.processService.onRemoveChoiceText(stageIndex, choiceIndex);
  }

  onChange($event: any, stageIndex: number) {
    this.processService.onChange($event, stageIndex);
  }

}
