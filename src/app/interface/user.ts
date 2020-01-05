import {Playlist} from './playlist';
import {Song} from './song';
import {Album} from './album';
import {Role} from './role';

export interface User {
  id?: number;
  name: string;
  image: string;
  username: string;
  password: string;
  confirmPassword: string;
  address?: string;
  identityCard?: string;
  company?: string;
  roles: Role;
  myList: Song[];
  playlist: Playlist[];
  albumList: Album[];
}
