import {Song} from './song';
import {User} from './user';
import {Singer} from './singer';

export interface Playlist {
  id?: string;
  name: string;
  image: string;
  songList: Song[];
  user?: User;
  singer?: Singer;
}
