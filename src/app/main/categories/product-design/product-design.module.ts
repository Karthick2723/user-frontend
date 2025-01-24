import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDesignRoutingModule } from './product-design-routing.component';
import { ProductDesignComponent } from './product-design.component';


@NgModule({
  declarations: [ProductDesignComponent],
  imports: [
    CommonModule,
    ProductDesignRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductDesignModule { }
