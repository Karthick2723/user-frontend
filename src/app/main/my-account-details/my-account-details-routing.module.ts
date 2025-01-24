// my-account-details-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyAccountDetailsComponent } from './my-account-details/my-account-details.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from 'src/app/services/auth.guard';

const routes: Routes = [
  { path: 'myaccount', component: MyAccountDetailsComponent, canActivate: [AuthGuard] },
  { path: 'inquiries',canActivate: [AuthGuard]},
  { path: 'Account', component: MyAccountComponent ,canActivate: [AuthGuard]},
  { path: 'restPassword', component: ResetPasswordComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAccountDetailsRoutingModule { }
