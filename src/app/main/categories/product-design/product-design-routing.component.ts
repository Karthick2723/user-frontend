import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDesignComponent } from './product-design.component';

const routes: Routes = [
  {
    path: '',
    component: ProductDesignComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDesignRoutingModule { }
