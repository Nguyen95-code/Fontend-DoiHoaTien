import {Song} from './song';
import {User} from './user';

export interface Playlist {
  id?: string;
  name: string;
  image: string;
  songList: Song[];
  user?: User;
}
