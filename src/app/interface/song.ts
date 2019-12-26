import {Playlist} from './playlist';
import {Album} from './album';
import {User} from './user';

export interface Song {
  id?: number;
  name: string;
  link: string;
  image: string;
  description: string;
  user?: User;
  playlist: Playlist[];
  album: Album[];
}
