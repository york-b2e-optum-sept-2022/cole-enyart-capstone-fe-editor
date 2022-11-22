import {Component} from '@angular/core';
import {ViewService} from "./view.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cole-enyart-capstone-fe-editor';
  viewProcessList: boolean = true;
  viewCreate: boolean = false;
  viewEdit: boolean = false;
  viewFinishedProcessList: boolean = false;


  constructor(private viewService: ViewService) {
    this.viewService.$viewProcessList.pipe().subscribe({
      next: (viewProcessList) => {
        this.viewProcessList = viewProcessList;
      },
      error: () => {
      }
    })

    this.viewService.$viewCreate.pipe().subscribe({
      next: (viewCreate) => {
        this.viewCreate = viewCreate;
      },
      error: () => {
      }
    })

    this.viewService.$viewEdit.pipe().subscribe({
      next: (viewEdit) => {
        this.viewEdit = viewEdit;
      },
      error: () => {
      }
    })

    this.viewService.$viewFinishedProcessList.pipe().subscribe({
      next: (viewFinishedProcessList) => {
        this.viewFinishedProcessList = viewFinishedProcessList;
      },
      error: () => {
      }
    })
  }
}
