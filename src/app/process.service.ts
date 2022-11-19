import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {BehaviorSubject, first} from "rxjs";
import {IProcess} from "./_interfaces/IProcess";
import {IProcessCreate} from "./_interfaces/IProcessCreate";

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  $processList = new BehaviorSubject<IProcess[] | null>(null);

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

  deleteProcess(processId: number) {
    this.httpService.deleteProcess(processId).pipe(first()).subscribe({
      next: () => {
        this.getAllProcesses();
      },
      error: () => {}
    })
  }
}
