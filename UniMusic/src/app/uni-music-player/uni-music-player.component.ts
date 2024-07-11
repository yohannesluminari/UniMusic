import { Component, Input } from '@angular/core';
import { MusicService } from '../service/music.service';
import { Album } from '../models/Album';
import { Artist } from '../models/Artist';
import { Track } from '../models/Track';


@Component({
  selector: 'app-uni-music-player',
  templateUrl: './uni-music-player.component.html',
  styleUrl: './uni-music-player.component.scss'
})
export class UniMusicPlayerComponent {
  artistIds: number[] = [525046, 4495513, 339209, 15166511, 382937, 230, 1310298, 48975581, 63273652, 2727681, 48975581];
  artists: Artist[] = [];
  
  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
    this.musicService.getArtistsData(this.artistIds)
      .subscribe(artists => {
        this.artists = artists;
        console.log('Fetched artists:', artists);
      });
  }
}

