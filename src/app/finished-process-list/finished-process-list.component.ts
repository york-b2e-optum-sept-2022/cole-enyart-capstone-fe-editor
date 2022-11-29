import {Component, OnDestroy} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ProcessService} from "../process.service";
import {ViewService} from "../view.service";
import {IFinishedProcess} from "../_interfaces/IFinishedProcess";

@Component({
  selector: 'app-finished-process-list',
  templateUrl: './finished-process-list.component.html',
  styleUrls: ['./finished-process-list.component.css']
})
export class FinishedProcessListComponent implements OnDestroy {

  finishedProcessList: IFinishedProcess[] = [];
  onDestroy = new Subject();

  constructor(private processService: ProcessService, private viewService: ViewService) {
    this.processService.$finishedProcessList.pipe(takeUntil(this.onDestroy)).subscribe({
      next: (finishedProcessList) => {
        this.finishedProcessList = finishedProcessList;
      },
      error: () => {
      }
    })
  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onViewProcessList() {
    this.viewService.viewProcessList();
    this.processService.getAllProcesses();
  }
}
