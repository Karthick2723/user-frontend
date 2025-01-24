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
import { AboutSiteComponent } from './main/about-site/about-site.component';
import { ConfigurationComponent } from './main/configuration/configuration.component';
import { ContactusComponent } from './main/contactus/contactus.component';
import { ServiceInqruriesComponent } from './main/contactus/service-inqruries/service-inqruries.component';
import { VariousInquriesComponent } from './main/contactus/various-inquries/various-inquries.component';
import { CookiesInfoComponent } from './main/cookies-info/cookies-info.component';
import { EventsSeminarDetailsComponent } from './main/events-seminar-details/events-seminar-details.component';
import { EventsSeminorComponent } from './main/events-seminor/events-seminor.component';
import { FulllayoutComponent } from './main/fulllayout.component';
import { FundamentalPolicyComponent } from './main/fundamental-policy/fundamental-policy.component';
import { GuestComponent } from './main/guest/guest.component';
import { FooterComponent } from './main/landing-page/footer/footer.component';
import { HeaderComponent } from './main/landing-page/header/header.component';
import { LandingPageModule } from './main/landing-page/landing-page.module';
import { MyAccountDetailsModule } from './main/my-account-details/my-account-details.module';
import { NewsComponent } from './main/news/news.component';
import { OfferingsModule } from './main/offerings/offerings.module';
import { PrivacyPolicyComponent } from './main/privacy-policy/privacy-policy.component';
import { ProdDetailsModule } from './main/prod-details/prod-details.module';
import { SharedModule } from './main/shared/shared.module';
import { SolutionsImageComponent } from './main/solutions/solutions-image/solutions-image.component';
import { SolutionsModule } from './main/solutions/solutions.module';
import { UndercontrucionPageComponent } from './main/undercontrucion-page/undercontrucion-page.component';
import { WhoWeAreComponent } from './main/who-we-are/who-we-are/who-we-are.component';
import { AuthInterceptorService } from './services/interceptors/auth-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    FulllayoutComponent,
    ConfigurationComponent,
    GuestComponent,
    HeaderComponent,
    FooterComponent,
    UndercontrucionPageComponent,
    CookiesInfoComponent,
    EventsSeminorComponent,
    ContactusComponent,
    SolutionsImageComponent,
    VariousInquriesComponent,
    ServiceInqruriesComponent,
    EventsSeminarDetailsComponent,
    WhoWeAreComponent,
    NewsComponent,
    AboutSiteComponent,
    PrivacyPolicyComponent,
    FundamentalPolicyComponent,
  ],

  imports: [BrowserModule, BrowserAnimationsModule, CountUpModule, AppRoutingModule, SharedModule, BrowserAnimationsModule, MatTableModule, MatFormFieldModule,
    MatPaginatorModule, HttpClientModule, FormsModule, MyAccountDetailsModule, OfferingsModule, ProdDetailsModule, AngularFireModule.initializeApp(API_GATEWAY.firebase),
    ToastrModule.forRoot(), MatFormFieldModule, MatCheckboxModule, MatInputModule, MatRadioModule, MatSelectModule,SolutionsModule,LandingPageModule,NgOptimizedImage
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
