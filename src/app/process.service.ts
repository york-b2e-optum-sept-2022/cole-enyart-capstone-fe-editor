import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, first} from "rxjs";
import {IProcess} from "./_interfaces/IProcess";
import {IProcessCreate} from "./_interfaces/IProcessCreate";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  $processList = new BehaviorSubject<IProcess[]>([]);
  $processCreate = new BehaviorSubject<IProcessCreate | null>(null);
  $processEdit = new BehaviorSubject<IProcess | null>(null);

  constructor(private httpService: HttpService) {
    this.getAllProcesses();
  }

  public getAllProcesses() {
    this.httpService.getAllProcesses().pipe(first()).subscribe({
      next: (processList) => {
        this.$processList.next(processList);
      },
      error: () => {}
    })
  }

  public postProcess(process: IProcessCreate) {
    this.httpService.postProcess(process).pipe(first()).subscribe({
      next: () => {
        this.getAllProcesses();
      },
      error: () => {}
    })
  }

  public deleteProcess(processId: number) {
    this.httpService.deleteProcess(processId).pipe(first()).subscribe({
      next: () => {
        this.getAllProcesses();
      },
      error: () => {}
    })
  }

  public selectProcessEdit(processId: number) {
    for (let process of this.$processList.getValue()) {
      if (process.id === processId) {
        this.$processEdit.next(process);
      }
    }
  }
}
