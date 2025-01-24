import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  exports: []
})
export class LandingPageModule { 
}
