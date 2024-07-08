import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniMusicPlayerComponent } from './uni-music-player.component';

const routes: Routes = [{ path: '', component: UniMusicPlayerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniMusicPlayerRoutingModule { }
