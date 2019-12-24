import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Playlist} from '../../interface/playlist';
import {Album} from '../../interface/album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private ALBUM_API = 'http://zingdoihoatien.herokuapp.com/api/albums';

  constructor(private http: HttpClient) {
  }

  create(album): Observable<Album> {
    return this.http.post<Album>(this.ALBUM_API, album);
  }

  detail(id: string): Observable<Album> {
    return this.http.get<Album>(this.ALBUM_API + '/' + id);
  }

  delete(id: number): Observable<Album> {
    return this.http.delete<Album>(this.ALBUM_API + '/' + id);
  }

  edit(album: Album): Observable<Album> {
    return this.http.put<Album>(this.ALBUM_API, album);
  }

  getAllAlbum(): Observable<Album[]> {
    return this.http.get<Album[]>(this.ALBUM_API);
  }

  addSong(albumId, song): Observable<Album> {
    return this.http.post<Album>(this.ALBUM_API + '/' + albumId, song);
  }

  removeSong(albumId, songId): Observable<Album> {
    return this.http.delete<Album>(this.ALBUM_API + '/' + albumId + '/' + songId);
  }
}
