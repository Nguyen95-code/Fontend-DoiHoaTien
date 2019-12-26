import {Song} from './song';
import {User} from './user';

export interface Album {
  id?: string;
  name: string;
  image: string;
  user?: User;
  songList: Song[];
}
