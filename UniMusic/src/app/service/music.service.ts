
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, map, forkJoin } from 'rxjs';
import { Album } from '../models/Album';
import { Artist } from '../models/Artist';
import { Track } from '../models/Track';


@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private baseUrl = 'https://striveschool-api.herokuapp.com/api/deezer';

  constructor(private http: HttpClient) { }

  getArtistsData(artistIds: number[]): Observable<Artist[]> {
    return this.fetchArtists(artistIds).pipe(
      switchMap((artists: Artist[]) => {
        const albumObservables = artists.map((artist: Artist) => {
          return this.fetchAlbums(artist.id).pipe(
            map((albums: Album[]) => {
              artist.albums = albums;
              return artist;
            })
          );
        });
        return forkJoin(albumObservables);
      })
    );
  }

  private fetchArtists(artistIds: number[]): Observable<Artist[]> {
    const artistObservables = artistIds.map((id: number) =>
      this.http.get<any>(`${this.baseUrl}/artist/${id}`)
        .pipe(
          map((response: any) => ({
            id: response.id,
            name: response.name,
            link: response.link,
            picture: response.picture_medium,
            pictureBig: response.picture_big,
            tracklist: response.tracklist,
            albums: []
          } as Artist))
        )
    );

    return forkJoin(artistObservables);
  }

  private fetchAlbums(artistId: number): Observable<Album[]> {
    return this.http.get<any>(`${this.baseUrl}/artist/${artistId}/albums`)
      .pipe(
        map((response: any) => response.data.map((album: any) => ({
          id: album.id,
          title: album.title,
          cover: album.cover_medium,
          coverBig: album.cover_big,
          tracklist: album.tracklist,
          tracks: [] as Track[]
        } as Album)))
      );
  }

  fetchTracks(albumId: number): Observable<Track[]> {
    return this.http.get<any>(`${this.baseUrl}/album/${albumId}/tracks`)
      .pipe(
        map((response: any) => response.data.map((track: any) => ({
          id: track.id,
          title: track.title,
          duration: track.duration,
          preview: track.preview
        } as Track)))
      );
  }
}
