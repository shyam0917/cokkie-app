import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IframeFormPageRoutingModule } from './iframe-form-routing.module';

import { IframeFormPage } from './iframe-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IframeFormPageRoutingModule
  ],
  declarations: [IframeFormPage]
})
export class IframeFormPageModule {}
