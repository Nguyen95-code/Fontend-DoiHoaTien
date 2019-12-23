import {Singer} from './singer';
import {Song} from './song';

export interface Album {
  id?: string;
  name: string;
  image: string;
  singer?: Singer;
  songList: Song[];
}
