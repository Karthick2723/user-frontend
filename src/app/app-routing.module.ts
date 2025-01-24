import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import LoginComponent from './authentication/login/login.component';
import { AboutSiteComponent } from './main/about-site/about-site.component';
import { ServiceInqruriesComponent } from './main/contactus/service-inqruries/service-inqruries.component';
import { VariousInquriesComponent } from './main/contactus/various-inquries/various-inquries.component';
import { CookiesInfoComponent } from './main/cookies-info/cookies-info.component';
import { EventsSeminorComponent } from './main/events-seminor/events-seminor.component';
import { FulllayoutComponent } from './main/fulllayout.component';
import { FundamentalPolicyComponent } from './main/fundamental-policy/fundamental-policy.component';
import { GuestComponent } from './main/guest/guest.component';
import { LandingPageComponent } from './main/landing-page/landing-page.component';
import { MyAccountDetailsComponent } from './main/my-account-details/my-account-details/my-account-details.component';
import { OrderDetailsComponent } from './main/my-account-details/order-details/order-details.component';
import { NewsComponent } from './main/news/news.component';
import { CategoryComponent } from './main/offerings/category/category.component';
import { OfferingsComponent } from './main/offerings/offerings.component';
import { PrivacyPolicyComponent } from './main/privacy-policy/privacy-policy.component';
import { ProdDetailsComponent } from './main/prod-details/prod-details.component';
import { UndercontrucionPageComponent } from './main/undercontrucion-page/undercontrucion-page.component';
import { WhoWeAreComponent } from './main/who-we-are/who-we-are/who-we-are.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: FulllayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./main/landing-page/landing-page.module').then(m => m.LandingPageModule) // Lazy load
      },
      {
        path: 'landing',
        loadChildren: () => import('./main/landing-page/landing-page.module').then(m => m.LandingPageModule) // Lazy load
      },
      {
        path: 'order-details',
        component: OrderDetailsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'myaccount',
        component: MyAccountDetailsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'offerings',
        component: OfferingsComponent
      },
      {
        path: 'category',
        component: CategoryComponent,
      }, {
        path: 'product-desc',
        component: ProdDetailsComponent,
      },
      {
        path: 'undercontrucion',
        component: UndercontrucionPageComponent
      },
      {
        path: 'news',
        component: NewsComponent

      },
      {
        path: 'aboutsite',
        component: AboutSiteComponent

      }, {
        path: 'privacyPolicy',
        component: PrivacyPolicyComponent
      },
      {
        path: 'eventSeminor',
        component: EventsSeminorComponent
      },
      {
        path: 'events',
        loadChildren: () => import('./main/events-seminar-list/events-seminar-list.module').then(m => m.EventsSeminarListModule)// lazy load
      },
      {
        path: 'events-details',
        loadComponent: () => import('./main/events-seminar-details/events-seminar-details.component').then(m => m.EventsSeminarDetailsComponent)
      },
      {
        path: 'contactus',
        loadComponent: () => import('./main/contactus/contactus.component').then(m => m.ContactusComponent)
      },
      {
        path: 'solutions',
        loadChildren: () => import('./main/solutions/solutions.module').then(m => m.SolutionsModule) // Lazy load
      },
      {
        path: 'product-design',
        loadChildren:() => import('./main/categories/product-design/product-design.module').then (m=>m.ProductDesignModule)
      },
      {
        path: "viewProduct",
        loadChildren: () => import('./main/solutions/view-product/view-product.module').then(m => m.ViewProductModule)// lazy load
      },
      {
        path: 'fundamentalPolicy',
        component: FundamentalPolicyComponent
      },
      {
        path: 'ServiceInqruries',
        component: ServiceInqruriesComponent
      },
      {
        path: 'VariousInquries',
        component: VariousInquriesComponent

      },
      {
        path: 'Careers',
        component: UndercontrucionPageComponent
      },
      {
        path: 'who-we-are',
        component: WhoWeAreComponent
      },
      {
        path: 'post-article',
        loadChildren: () => import('./main/post-article/post-article/post-article.module').then(m => m.PostArticleModule)
      },
      {
        path: 'post-detail',
        loadChildren: () => import('./main/post-article/pos-detail/post-detail/post-detail.module').then(m=>m.PostDetailModule)
      },
      {
        path: 'cookie',
        component: CookiesInfoComponent
      },
    ]
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule)
      },
    ]
  },
  {
    path: 'landingpage', component: LandingPageComponent
  },

  { path: 'offerings', loadChildren: () => import('./main/offerings/offerings.module').then(m => m.OfferingsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
