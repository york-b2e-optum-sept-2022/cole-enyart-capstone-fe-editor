import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProcessService} from "../process.service";
import {Subject, takeUntil} from "rxjs";
import {IProcess} from "../_interfaces/IProcess";

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.css']
})
export class ProcessesComponent implements OnInit, OnDestroy {

  public processList: IProcess[] = [];
  onDestroy = new Subject();

  constructor(private processService: ProcessService) {
    this.processService.$processList.pipe(takeUntil(this.onDestroy)).subscribe({
      next: (processList) => {
        if(processList) {
          this.processList = processList;
        }
      },
      error: () => {}
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

}
