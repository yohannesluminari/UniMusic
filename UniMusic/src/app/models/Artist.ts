import { IUser } from "./i-user";


export interface Artist {
  id: number;
  name: string;
  link: string;
  picture: string;
  pictureBig: string;
  tracklist: string;
  listeningTimeInMinutes: number;
  userListeningTimes: Map<IUser, number>;
  likedByUsers: IUser[];
}
