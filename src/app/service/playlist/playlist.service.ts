import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Playlist} from '../../interface/playlist';
import {Song} from '../../interface/song';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private PLAYLIST_API = 'http://zingdoihoatien.herokuapp.com/api/playlists';

  constructor(private http: HttpClient) {
  }

  create(playlist): Observable<Playlist> {
    return this.http.post<Playlist>(this.PLAYLIST_API, playlist);
  }

  detail(id: string): Observable<Playlist> {
    return this.http.get<Playlist>(this.PLAYLIST_API + '/' + id);
  }

  delete(id: number): Observable<Playlist> {
    return this.http.delete<Playlist>(this.PLAYLIST_API + '/' + id);
  }

  edit(playlist: Playlist): Observable<Playlist> {
    return this.http.put<Playlist>(this.PLAYLIST_API, playlist);
  }

  getAllPlaylist(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.PLAYLIST_API);
  }

  addSong(playlistId, song): Observable<Playlist> {
    return this.http.post<Playlist>(this.PLAYLIST_API + '/' + playlistId, song);
  }
}
