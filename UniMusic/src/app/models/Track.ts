import { Album } from './Album';
import { Artist } from './Artist';
import { IUser } from './i-user';


export interface Track {
  id: number;
  title: string;
  link: string;
  duration: number;
  rank: number;
  explicitLyrics: boolean;
  explicitContentLyrics: number;
  explicitContentCover: number;
  preview: string;
  artist: Artist;
  album: Album;
  likedByUsers: IUser[];
  userInteractions: UserTrackInteraction[];
}

export interface UserTrackInteraction {
  id: number;
  // Aggiungi eventuali altre proprietà relative alle interazioni dell'utente con i brani
}
