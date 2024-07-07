import { Artist } from "./Artist";
import { IUser } from "./i-user";


export interface Album {
  id: number;
  title: string;
  cover: string;
  coverBig: string;
  tracklist: string;
  link: string;
  releaseDate: string; // Or Date object, depending on your preference
  listeningTimeInMinutes: number;
  userListeningTimes: Map<IUser, number>;
  likedByUsers: IUser[];
  artist: Artist;
}
