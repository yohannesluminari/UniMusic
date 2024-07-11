import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniMusicPlayerRoutingModule } from './uni-music-player-routing.module';
import { UniMusicPlayerComponent } from './uni-music-player.component';

import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    UniMusicPlayerComponent
  ],
  imports: [
    CommonModule,
    UniMusicPlayerRoutingModule,
    HttpClientModule
  ]
})
export class UniMusicPlayerModule { }
