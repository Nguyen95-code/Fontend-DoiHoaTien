import {Song} from './song';
import {Album} from './album';
import {Playlist} from './playlist';

export interface Singer {
  id?: number;
  name: string;
  image: string;
  address: string;
  identityCard: string;
  identityCardImage: string;
  company?: string;
  myList: Song[];
  playlist: Playlist[];
  albumList: Album[];
}
