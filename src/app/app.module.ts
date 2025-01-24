import { DatePipe, NgOptimizedImage } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BnNgIdleService } from 'bn-ng-idle'; // import bn-ng-idle service
import { CountUpModule } from 'ngx-countup';
import { ToastrModule } from 'ngx-toastr';
import { API_GATEWAY } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GuestComponent } from './main/guest/guest.component';
import { HeaderComponent } from './main/landing-page/header/header.component';
import { LandingPageModule } from './main/landing-page/landing-page.module';
import { AuthInterceptorService } from './services/interceptors/auth-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    GuestComponent,
    HeaderComponent,

  ],

  imports: [BrowserModule, BrowserAnimationsModule, CountUpModule, AppRoutingModule, BrowserAnimationsModule, MatTableModule, MatFormFieldModule,
    MatPaginatorModule, HttpClientModule, FormsModule, AngularFireModule.initializeApp(API_GATEWAY.firebase),
    ToastrModule.forRoot(), MatFormFieldModule, MatCheckboxModule, MatInputModule, MatRadioModule, MatSelectModule,LandingPageModule,NgOptimizedImage
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    DatePipe,
    BnNgIdleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
