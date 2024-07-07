import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaPrivataRoutingModule } from './area-privata-routing.module';
import { AreaPrivataComponent } from './area-privata.component';


@NgModule({
  declarations: [
    AreaPrivataComponent
  ],
  imports: [
    CommonModule,
    AreaPrivataRoutingModule
  ]
})
export class AreaPrivataModule { }
