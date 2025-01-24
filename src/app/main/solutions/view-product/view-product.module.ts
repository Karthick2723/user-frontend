import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewProductRoutingModule } from './view-product-routing.module';
import { ViewProductComponent } from './view-product.component';


@NgModule({
  declarations: [ViewProductComponent],
  imports: [
    CommonModule,
    ViewProductRoutingModule,
    ReactiveFormsModule
  ]
})
export class ViewProductModule { }
