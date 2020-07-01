import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainListPageRoutingModule } from './main-list-routing.module';

import { MainListPage } from './main-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainListPageRoutingModule
  ],
  declarations: [MainListPage]
})
export class MainListPageModule {}
