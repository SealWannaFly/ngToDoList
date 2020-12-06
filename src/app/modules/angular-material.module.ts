import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatSelectModule,
  MatInputModule
];

@NgModule({
  imports: [
    CommonModule,
    ...materialModules
  ],
  exports: [
    ...materialModules
  ],
})

export class AngularMaterialModule { }
