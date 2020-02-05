import {Song} from './song';

export interface Tag {
  id?: string;
  description: string;
  song?: Song;
}
