import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsSeminarListComponent } from './events-seminar-list.component';

const routes: Routes = [
  {
    path: '',
    component: EventsSeminarListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsSeminarListRoutingModule { }
