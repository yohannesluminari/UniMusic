import { Component, Input } from '@angular/core';
import { MusicService } from '../service/music.service';

import { Artist } from '../models/Artist';
import { map, forkJoin } from 'rxjs';
import { Album } from '../models/Album';
import { Track } from '../models/Track';



@Component({
  selector: 'app-uni-music-player',
  templateUrl: './uni-music-player.component.html',
  styleUrl: './uni-music-player.component.scss'
})
export class UniMusicPlayerComponent {
  artistIds: number[] = [525046, 4495513, 339209, 15166511, 382937, 230, 1310298, 48975581, 63273652, 2727681, 48975581];
  artists: Artist[] = [];
  selectedArtist: Artist | null = null;
  selectedAlbum: Album | null = null;
  showArtists: boolean = true;
  showAlbums: boolean = false;
  showTracks: boolean = false;

  constructor(private musicService: MusicService) { }

  ngOnInit(): void {
    this.musicService.getArtistsData(this.artistIds)
      .subscribe((artists: Artist[]) => {
        this.artists = artists;
        console.log('Fetched artists:', artists);
      });
  }

  selectArtist(artist: Artist): void {
    this.selectedArtist = artist;
    this.showArtists = false;
    this.showAlbums = true;
    this.fetchAlbumTracks(this.selectedArtist);
  }

  selectAlbum(album: Album): void {
    this.selectedAlbum = album;
    this.showAlbums = false;
    this.showTracks = true;
  }

  deselect(): void {
    this.selectedArtist = null;
    this.selectedAlbum = null;
    this.showArtists = true;
    this.showAlbums = false;
    this.showTracks = false;
  }

  private fetchAlbumTracks(artist: Artist): void {
    const albumObservables = artist.albums.map((album: Album) =>
      this.musicService.fetchTracks(album.id).pipe(
        map((tracks: Track[]) => {
          album.tracks = tracks;
          return album;
        })
      )
    );

    forkJoin(albumObservables).subscribe((albums: Album[]) => {
      artist.albums = albums;
    });
  }
}
