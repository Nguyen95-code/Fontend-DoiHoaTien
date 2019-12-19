import DateTimeFormat = Intl.DateTimeFormat;
import {Singer} from './singer';
import {Playlist} from './playlist';
import {Album} from './album';

export interface Song {
  id?: number;
  name: string;
  link: string;
  image: string;
  description: string;
  singer?: Singer;
  playlist: Playlist[];
  album: Album[];
}
