import {Component, OnDestroy} from '@angular/core';
import {IProcess} from "../_interfaces/IProcess";
import {Subject, takeUntil} from "rxjs";
import {ProcessService} from "../process.service";
import {ViewService} from "../view.service";

@Component({
  selector: 'app-process-edit',
  templateUrl: './process-edit.component.html',
  styleUrls: ['./process-edit.component.css']
})
export class ProcessEditComponent implements OnDestroy {

  editProcess!: IProcess;
  errorMessage: string = "";
  onDestroy = new Subject();

  constructor(private processService: ProcessService, private viewService: ViewService) {
    this.processService.$process.pipe(takeUntil(this.onDestroy)).subscribe({
      next: (processEdit) => {
          this.editProcess = processEdit;
      },
      error: () => {}
    });

    this.processService.$processError.pipe(takeUntil(this.onDestroy)).subscribe( {
      next: (errorMessage) => {
        this.errorMessage = errorMessage;
      },
      error: () => {
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onEdit() {
    this.processService.updateProcess(this.editProcess);
    this.viewService.viewProcessList();
  }

  onCancel() {
    this.viewService.viewProcessList();
    this.processService.getAllProcesses();
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
