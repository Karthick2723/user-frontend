import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsSeminarListRoutingModule } from './events-seminar-list-routing.module';
import { EventsSeminarListComponent } from './events-seminar-list.component';

@NgModule({
  declarations: [EventsSeminarListComponent],
  imports: [
    CommonModule,
    EventsSeminarListRoutingModule,
    ReactiveFormsModule
  ]
})
export class EventsSeminarListModule { }
