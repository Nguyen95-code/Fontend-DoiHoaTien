import {Playlist} from './playlist';

export interface User {
  id?: number;
  name: string;
  image: string;
  playlist: Playlist[];
}
