import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaPrivataRoutingModule } from './area-privata-routing.module';
import { AreaPrivataComponent } from './area-privata.component';
import { PostsComponent } from '../components/posts/posts.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AreaPrivataComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    AreaPrivataRoutingModule,
    ReactiveFormsModule
  ]
})
export class AreaPrivataModule { }
