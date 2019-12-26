import {Role} from './role';
import {Song} from './song';
import {Playlist} from './playlist';
import {Album} from './album';

export interface UserToken {
  id: number;
  name: string;
  image: string;
  username: string;
  password: string;
  confirmPassword: string;
  accessToken?: string;
  address?: string;
  identityCard?: string;
  company?: string;
  roles: Role;
  myList: Song[];
  playlist: Playlist[];
  albumList: Album[];
}
