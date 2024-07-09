import { Album } from "./Album";
import { Artist } from "./Artist";

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: string | null;
  totalListeningTimeInMinutes: number;
  mostListenedAlbum: Album | null;
  mostListenedArtist: Artist | null;
  followers: IUser[];
  following: IUser[];
}
