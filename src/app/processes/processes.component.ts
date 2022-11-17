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

  processList: IProcess[] = [];
  selectedProcess!: IProcess | null;

  viewProcessList: boolean = true;
  viewCreate: boolean = false;
  viewEdit: boolean = false;
  onDestroy = new Subject();

  constructor(private processService: ProcessService) {
    this.processService.$processList.pipe(takeUntil(this.onDestroy)).subscribe({
      next: (processList) => {
        if (processList) {
          this.processList = processList;
        }
      },
      error: () => {
      }
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy.next(null);
    this.onDestroy.complete();
  }

  onViewCreate() {
    this.viewCreate = true;
    this.viewProcessList = false;
  }

  onViewEdit(processId: number) {
    this.viewEdit = true;
    this.viewProcessList = false;

    for (let process of this.processList) {
      if (process.id === processId) {
        this.selectedProcess = process;
      }
    }
  }

  onDelete() {

  }

  onCancel() {
    this.viewCreate = false;
    this.viewEdit = false;
    this.viewProcessList = true;
  }

  onCreate() {

  }

  onEdit() {

  }

}
