import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  public $viewProcessList = new BehaviorSubject<boolean>(true);
  public $viewCreate = new BehaviorSubject<boolean>(false);
  public $viewEdit = new BehaviorSubject<boolean>(false);
  public $viewFinishedProcessList = new BehaviorSubject<boolean>(false);

  constructor() { }

  public viewProcessList() {
    this.viewCloseAll();
    this.$viewProcessList.next(true);
  }

  public viewCreate() {
    this.viewCloseAll();
    this.$viewCreate.next(true);
  }

  public viewEdit() {
    this.viewCloseAll();
    this.$viewEdit.next(true);
  }

  public viewFinishedProcessList() {
    this.viewCloseAll();
    this.$viewFinishedProcessList.next(true);
  }

  public viewCloseAll() {
    this.$viewProcessList.next(false);
    this.$viewCreate.next(false);
    this.$viewEdit.next(false);
    this.$viewFinishedProcessList.next(false);
  }

}
