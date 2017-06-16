import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {HotTableModule} from "ng2-handsontable";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HotTableModule
  ],
  providers: [HotTableModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
