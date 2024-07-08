import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniMusicPlayerRoutingModule } from './uni-music-player-routing.module';
import { UniMusicPlayerComponent } from './uni-music-player.component';


@NgModule({
  declarations: [
    UniMusicPlayerComponent
  ],
  imports: [
    CommonModule,
    UniMusicPlayerRoutingModule
  ]
})
export class UniMusicPlayerModule { }
