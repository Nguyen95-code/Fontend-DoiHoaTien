import {Singer} from './singer';

export interface Album {
  id: number;
  name: string;
  image: string;
  songList: string[];
  singer?: Singer;
}
