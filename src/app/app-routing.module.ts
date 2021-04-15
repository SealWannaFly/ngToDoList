import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditFormComponent} from './modules/home/modules/edit-form/edit-form.component';
import {AddFormComponent} from './modules/home/modules/add-form/add-form.component';
import {ToDoListComponent} from './modules/home/modules/to-do-list/to-do-list.component';
import {HomeComponent} from './modules/home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, children: [
      {path: 'add-form', component: AddFormComponent},
      {path: 'to-do-list', component: ToDoListComponent}
    ]},
  {path: 'task/:id', component: EditFormComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
