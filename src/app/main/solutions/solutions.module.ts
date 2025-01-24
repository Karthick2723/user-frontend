import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolutionsRoutingModule } from './solutions-routing.module';
import { SolutionsComponent } from './solutions.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SolutionsComponent],
  imports: [
    CommonModule,
    SolutionsRoutingModule,
    ReactiveFormsModule  
  ]
})
export class SolutionsModule { }
