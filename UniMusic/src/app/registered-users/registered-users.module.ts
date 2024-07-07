import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisteredUsersRoutingModule } from './registered-users-routing.module';
import { RegisteredUsersComponent } from './registered-users.component';


@NgModule({
  declarations: [
    RegisteredUsersComponent
  ],
  imports: [
    CommonModule,
    RegisteredUsersRoutingModule
  ]
})
export class RegisteredUsersModule { }
