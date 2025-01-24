import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdDetailsComponent } from './prod-details.component';

const routes: Routes = [{ path: '', component: ProdDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdDetailsRoutingModule { }
