import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import LoginComponent from './authentication/login/login.component';

import { GuestComponent } from './main/guest/guest.component';
import { LandingPageComponent } from './main/landing-page/landing-page.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./main/landing-page/landing-page.module').then(m => m.LandingPageModule) // Lazy load
      },
      {
        path: 'landing',
        loadChildren: () => import('./main/landing-page/landing-page.module').then(m => m.LandingPageModule) // Lazy load
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

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
