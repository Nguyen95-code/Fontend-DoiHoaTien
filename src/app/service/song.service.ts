import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Song} from '../interface/song';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  API_URL_SONG = 'https://zingdoihoatien.herokuapp.com/api/songs';

  constructor(private http: HttpClient) {
  }

  getAllSong(): Observable<Song[]> {
    return this.http.get<Song[]>(this.API_URL_SONG);
  }
}
