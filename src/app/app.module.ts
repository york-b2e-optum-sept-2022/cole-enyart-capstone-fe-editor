import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProcessListComponent } from './process-list/process-list.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FinishedProcessListComponent } from './finished-process-list/finished-process-list.component';
import { ProcessCreateComponent } from './process-create/process-create.component';
import { ProcessEditComponent } from './process-edit/process-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ProcessListComponent,
    FinishedProcessListComponent,
    ProcessCreateComponent,
    ProcessEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
