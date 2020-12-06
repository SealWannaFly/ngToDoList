import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditFormComponent} from '../edit-form/edit-form.component';
import {AddFormComponent} from '../add-form/add-form.component';
import {ToDoListComponent} from '../to-do-list/to-do-list.component';
import {HomeComponent} from '../home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, children: [
      {path: 'add-form', component: AddFormComponent},
      {path: 'to-do-list', component: ToDoListComponent}
    ]},
  {path: 'task/:id', component: EditFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
