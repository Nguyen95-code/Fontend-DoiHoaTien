import { Injectable } from '@angular/core';
import { Song } from '../../interface/song';
import {HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private songUrl = 'https://zingdoihoatien.herokuapp.com/api/songs';
  private newSongUrl = 'https://zingdoihoatien.herokuapp.com/api/songs/new';
  constructor(private http: HttpClient) { }
  getList(): Observable<Song[]> {
    return this.http.get<Song[]>(this.newSongUrl);
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
}
