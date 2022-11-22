import {Component, OnDestroy} from '@angular/core';
import {ProcessService} from "../process.service";
import {Subject, takeUntil} from "rxjs";
import {IProcess} from "../_interfaces/IProcess";
import {ViewService} from "../view.service";

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css']
})
export class ProcessListComponent implements OnDestroy {

  processList: IProcess[] = [];
  onDestroy = new Subject();

  constructor(private processService: ProcessService, private viewService: ViewService) {
    this.processService.$processList.pipe(takeUntil(this.onDestroy)).subscribe({
      next: (processList) => {
        this.processList = processList;
      },
      error: () => {
      }
    })
  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onViewCreate() {
    this.viewService.viewCreate();
  }

  onViewEdit(processId: number) {
    this.viewService.viewEdit();
    this.processService.selectProcessEdit(processId);
  }

  onDelete(processId: number) {
    this.processService.deleteProcess(processId);
  }

  onViewFinishedProcessList() {
    this.viewService.viewFinishedProcessList();
    this.processService.getAllFinishedProcesses();
  }
}
