import {Injectable} from '@angular/core';
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

  createLikeSong(like: Like, songId: number): Observable<Like> {
    return this.http.post<Like>(this.likeSongUrl + songId + '/likes', like);
  }

  deleteLikeSong(songId: number): Observable<any> {
    return this.http.delete(this.likeSongUrl + songId + '/likes');
  }

  getAllLikeSong(songId: string): Observable<Like[]> {
    return this.http.get<Like[]>('https://zingdoihoatien.herokuapp.com/songs/' + songId + '/likes');
  }
}
