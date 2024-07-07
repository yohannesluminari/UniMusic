import { Album } from "./Album";
import { Artist } from "./Artist";

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  avatar: string | null;
  totalListeningTimeInMinutes: number;
  mostListenedAlbum: Album | null; // Assicurati di importare correttamente Album
  mostListenedArtist: Artist | null; // Assicurati di importare correttamente Artist
  followers: IUser[]; // Puoi definire IUser o una versione semplificata se necessario
  following: IUser[]; // Puoi definire IUser o una versione semplificata se necessario
}
