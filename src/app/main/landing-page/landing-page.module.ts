import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { LandingImageComponent } from './landing-image/landing-image.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [LandingPageComponent,LandingImageComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  exports: [LandingImageComponent]
})
export class LandingPageModule { 
}
