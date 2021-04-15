import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './common/modules/angular-material.module';
import { AddFormComponent } from './modules/home/modules/add-form/add-form.component';
import { ToDoListComponent } from './modules/home/modules/to-do-list/to-do-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {OrderByPipe } from './common/entities/pipes/order-by.pipe';
import {EditFormComponent} from './modules/home/modules/edit-form/edit-form.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './modules/home/home.component';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AppComponent,
    AddFormComponent,
    ToDoListComponent,
    OrderByPipe,
    EditFormComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ScrollingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
