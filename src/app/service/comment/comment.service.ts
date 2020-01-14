import {Injectable} from '@angular/core';
import {Comment} from '../../interface/comment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Song} from '../../interface/song';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentSongUrl = 'http://zingdoihoatien.herokuapp.com/songs/';
  private commentPlaylistUrl = 'http://zingdoihoatien.herokuapp.com/playlists/';
  private commentSingerUrl = 'http://zingdoihoatien.herokuapp.com/singers/';

  constructor(private http: HttpClient) {
  }

  getListCommentSong(songId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentSongUrl  + songId + '/comments');
  }
  create(comment: Comment, songId: number): Observable<Comment> {
    return this.http.post<Comment>(this.commentSongUrl  + songId + '/comments', comment);
  }
  delete(id: number, songId: number): Observable<Comment> {
    return  this.http.delete<Comment>(this.commentSongUrl + songId + '/comments' + '/' + id);
  }
  edit(comment: Comment, songId: number): Observable<Comment> {
    return this.http.put<Comment>(this.commentSongUrl + songId + '/comments', comment);
  }
}
