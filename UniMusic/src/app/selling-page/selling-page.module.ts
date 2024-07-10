import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellingPageRoutingModule } from './selling-page-routing.module';
import { SellingPageComponent } from './selling-page.component';


@NgModule({
  declarations: [
    SellingPageComponent
  ],
  imports: [
    CommonModule,
    SellingPageRoutingModule
  ]
})
export class SellingPageModule { }
