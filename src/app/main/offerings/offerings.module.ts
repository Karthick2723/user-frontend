import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfferingsRoutingModule } from './offerings-routing.module';
import { OfferingsComponent } from './offerings.component';
import { ProductBannerComponent } from './product-banner/product-banner/product-banner.component';
import { CategoryComponent } from './category/category.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


@NgModule({
  declarations: [
    OfferingsComponent, ProductBannerComponent, CategoryComponent, ContactUsComponent
  ],
  imports: [
    CommonModule,
    OfferingsRoutingModule,

  ],
  exports: [
    ContactUsComponent
  ]
})
export class OfferingsModule { }
