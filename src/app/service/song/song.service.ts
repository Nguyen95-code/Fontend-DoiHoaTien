import { Injectable } from '@angular/core';
import { Song } from '../../interface/song';
import {HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private songUrl = 'https://zingdoihoatien.herokuapp.com/songs';
  private newSongUrl = 'https://zingdoihoatien.herokuapp.com/songs/new';
  private topSongViewUrl = 'https://zingdoihoatien.herokuapp.com/songs/views';
  constructor(private http: HttpClient) { }
  getListNew(): Observable<Song[]> {
    return this.http.get<Song[]>(this.newSongUrl);
  }
  getListTopView(): Observable<Song[]> {
    return this.http.get<Song[]>(this.topSongViewUrl);
  }
  create(song): Observable<Song> {
    return this.http.post<Song>(this.songUrl, song);
  }
  detail(id: string): Observable<Song> {
    return this.http.get<Song>(this.songUrl + '/' + id);
  }
  delete(id: number): Observable<Song> {
    return  this.http.delete<Song>(this.songUrl + '/' + id);
  }
  edit(song: Song): Observable<Song> {
    return this.http.put<Song>(this.songUrl, song);
  }
  getAllSong(): Observable<Song[]> {
    return this.http.get<Song[]>(this.songUrl);
  }
}
