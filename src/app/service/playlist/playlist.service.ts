import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Song} from '../../interface/song';
import {Playlist} from '../../interface/playlist';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private PLAYLIST_API = 'http://zingdoihoatien.herokuapp.com/api/playlists';
  constructor(private http: HttpClient) { }

  create(playlist): Observable<Song> {
    return this.http.post<Song>(this.PLAYLIST_API, playlist);
  }

  detail(id: string): Observable<Playlist> {
    return this.http.get<Playlist>(this.PLAYLIST_API + '/' + id);
  }

  delete(id: number): Observable<Playlist> {
    return  this.http.delete<Playlist>(this.PLAYLIST_API + '/' + id);
  }

  getAllSong(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(this.PLAYLIST_API);
  }
}
