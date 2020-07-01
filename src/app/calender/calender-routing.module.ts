import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalenderPage } from './calender.page';

const routes: Routes = [
  {
    path: '',
    component: CalenderPage
  },
  {
    path: 'add-event',
    loadChildren: () => import('./add-event/add-event.module').then(m => m.AddEventPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalenderPageRoutingModule { }
