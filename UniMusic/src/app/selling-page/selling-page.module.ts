import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellingPageRoutingModule } from './selling-page-routing.module';
import { SellingPageComponent } from './selling-page.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SellingPageComponent
  ],
  imports: [
    CommonModule,
    SellingPageRoutingModule,
    ReactiveFormsModule
  ]
})
export class SellingPageModule { }
