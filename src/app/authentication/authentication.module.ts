import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    
  ],
  imports: [CommonModule, AuthenticationRoutingModule,MatButtonModule,FormsModule]
})

export class AuthenticationModule {}
