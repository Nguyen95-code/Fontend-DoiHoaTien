import DateTimeFormat = Intl.DateTimeFormat;
import {Singer} from './singer';

export interface Song {
  id?: number;
  name: string;
  link: string;
  image: string;
  description: string;
  singer?: Singer;
}
