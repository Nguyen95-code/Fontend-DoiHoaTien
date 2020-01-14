import {Song} from './song';
import {User} from './user';
import {Playlist} from './playlist';

export interface Comment {
  id?: string;
  description: string;
  singer?: User;
  song?: Song;
  user?: User;
  playlist?: Playlist;
}
