import { Album } from "./Album";
import { Artist } from "./Artist";

export interface IUser {
  id: string;
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
