import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Like} from '../../interface/like';
import {Comment} from '../../interface/comment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private likeSongUrl = 'https://zingdoihoatien.herokuapp.com/songs/';
  private likePlaylistUrl = 'https://zingdoihoatien.herokuapp.com/playlists/';
  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:ban-types
  checkLikeSong(songId: number, userId: number): Observable<boolean> {
    // tslint:disable-next-line:ban-types
    return this.http.get<boolean>(this.likeSongUrl + songId + '/likes/users' + userId);
  }
  createLikeSong(like: Like, songId: number): Observable<Like> {
    return this.http.post<Like>(this.likeSongUrl  + songId + '/likes', like);
  }
  deleteLikeSong( songId: number): Observable<Like> {
    return  this.http.delete<Like>(this.likeSongUrl + songId + '/likes' );
  }
}
