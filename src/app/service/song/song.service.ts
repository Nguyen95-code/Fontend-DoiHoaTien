import { Injectable } from '@angular/core';
import { Song } from '../../interface/song';
import {HttpClient, } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private songUrl = 'http://zingdoihoatien.herokuapp.com/songs';
  private newSongUrl = 'http://zingdoihoatien.herokuapp.com/songs/new';
  constructor(private http: HttpClient) { }
  getListNew(): Observable<Song[]> {
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
  edit(song: Song, id: number): Observable<Song> {
    return this.http.put<Song>(this.songUrl + `${id}`, song);
  }
  getAllSong(): Observable<Song[]> {
    return this.http.get<Song[]>(this.songUrl);
  }
}
