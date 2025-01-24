import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdDetailsRoutingModule } from './prod-details-routing.module';
import { ProdDetailsComponent } from './prod-details.component';
import { FormsModule } from '@angular/forms';
import { OfferingsModule } from '../offerings/offerings.module';


@NgModule({
  declarations: [
    ProdDetailsComponent
  ],
  imports: [
    CommonModule,
    ProdDetailsRoutingModule, FormsModule,
    OfferingsModule
  ]
})
export class ProdDetailsModule { }
