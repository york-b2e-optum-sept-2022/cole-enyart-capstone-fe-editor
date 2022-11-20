import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProcessService} from "../process.service";
import {Subject, takeUntil} from "rxjs";
import {IProcess} from "../_interfaces/IProcess";
import {IProcessCreate} from "../_interfaces/IProcessCreate";

@Component({
  selector: 'app-processList',
  templateUrl: './processList.component.html',
  styleUrls: ['./processList.component.css']
})
export class ProcessListComponent implements OnInit, OnDestroy {

  processList: IProcess[] = [];
  selectedProcess!: IProcess | null;
  createProcess: IProcessCreate = {
    title: "",
    stage: [{index: 0, prompt: "", type: "", choice: []}]
  }
  type: Boolean = false;
  indexStage: number = 0;
  indexChoice: number = 0;

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

  onDelete(processId: number) {
    this.processService.deleteProcess(processId);
  }

  onCancel() {
    this.viewCreate = false;
    this.viewEdit = false;
    this.viewProcessList = true;
  }

  onCreate() {
    this.processService.postProcess(this.createProcess);
    this.viewCreate = false;
    this.viewProcessList = true;
  }

  onEdit() {

  }

  onRemoveStage(i: number) {
    if (this.createProcess.stage.length <= 1) {
      return;
    }
    this.createProcess.stage.splice(i, 1);
  }

  onRemoveChoiceText(ind: number, i: number) {
    const index = this.createProcess.stage.filter((x) => x.index === ind);

    if (index[0].choice.length <= 2) {
      // todo add error
      return;
    }
    index[0].choice.splice(i, 1);
  }

  onAddChoiceText(i: number) {
    this.indexChoice += 1;
    const index = this.createProcess.stage.filter((x) => x.index === i);
    index[0].choice.push({index: this.indexChoice, text: ""});
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

  onChange($event: any, i: number) {
    const index = this.createProcess.stage.filter((x) => x.index === i);
    index[0].type = $event;
    if ($event === "choice") {
      this.onAddChoiceText(i);
      this.onAddChoiceText(i);
    } else {
      index[0].choice = [];
    }
  }
}
