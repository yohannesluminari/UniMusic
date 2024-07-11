import { Album } from "./Album";


export interface Artist {
  id: number;
  name: string;
  link: string;
  picture: string;
  pictureBig: string;
  tracklist: string;
  albums: Album[];
}
