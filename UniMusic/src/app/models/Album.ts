import { Track } from "./Track";


export interface Album {
  id: number;
  title: string;
  cover: string;
  coverBig: string;
  tracklist: string;
  tracks: Track[];
}
