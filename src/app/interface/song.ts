import {Singer} from './singer';

export interface Song {
  id: number;
  name: string;
  link: string;
  image: string;
  description: string;
  createDate: Date;
  singer: Singer;
}
