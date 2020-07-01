import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainListPage } from './main-list.page';

const routes: Routes = [
  {
    path: '',
    component: MainListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainListPageRoutingModule {}
