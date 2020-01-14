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
  createCommentSong(comment: Comment, songId: number): Observable<Comment> {
    return this.http.post<Comment>(this.commentSongUrl  + songId + '/comments', comment);
  }
  deleteCommentSong(id: number, songId: number): Observable<Comment> {
    return  this.http.delete<Comment>(this.commentSongUrl + songId + '/comments' + '/' + id);
  }
  editCommentSong(comment: Comment, songId: number): Observable<Comment> {
    return this.http.put<Comment>(this.commentSongUrl + songId + '/comments', comment);
  }
  getListCommentPlaylist(playlistId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentPlaylistUrl  + playlistId + '/comments');
  }

  createCommentPlaylist(comment: Comment, playlistId: string): Observable<Comment> {
    return this.http.post<Comment>(this.commentSingerUrl  + playlistId + '/comments', comment);
  }
  deleteCommentPlaylist(id: number, playlistId: number): Observable<Comment> {
    return  this.http.delete<Comment>(this.commentSingerUrl + playlistId + '/comments' + '/' + id);
  }
  editCommentPlaylist(comment: Comment, playlistId: number): Observable<Comment> {
    return this.http.put<Comment>(this.commentSingerUrl + playlistId + '/comments', comment);
  }

  getListCommentSinger(singerId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentSingerUrl  + singerId + '/comments');
  }

  createCommentSinger(comment: Comment, singerId: string): Observable<Comment> {
    return this.http.post<Comment>(this.commentSingerUrl  + singerId + '/comments', comment);
  }
  deleteCommentSinger(id: number, singerId: number): Observable<Comment> {
    return  this.http.delete<Comment>(this.commentSingerUrl + singerId + '/comments' + '/' + id);
  }
  editCommentSinger(comment: Comment, singerId: number): Observable<Comment> {
    return this.http.put<Comment>(this.commentSingerUrl + singerId + '/comments', comment);
  }
}
