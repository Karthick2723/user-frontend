import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyAccountDetailsComponent } from './my-account-details/my-account-details.component';
import { MyAccountDetailsRoutingModule } from './my-account-details-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { MatFormFieldModule, matFormFieldAnimations } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from 'src/app/services/http-services';
import { MyAccountComponent } from './my-account/my-account.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [MyAccountDetailsComponent,OrderDetailsComponent, MyAccountComponent, ResetPasswordComponent, CardDetailsComponent,],
  imports: [
    CommonModule,
    MyAccountDetailsRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
    ScrollingModule,
    ReactiveFormsModule, 
    BrowserModule,
    MatCheckboxModule,
     BrowserAnimationsModule, 
    MatMenuModule, 
    MatIconModule 
  ] ,
  providers: [HttpService]
  
})
export class MyAccountDetailsModule {}
