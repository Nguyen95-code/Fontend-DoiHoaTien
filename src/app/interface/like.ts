import {Song} from './song';
import {User} from './user';
import {Playlist} from './playlist';

export interface Like {
  id?: string;
  song?: Song;
  user?: User;
  playlist?: Playlist;
}
