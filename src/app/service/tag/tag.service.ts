import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tag} from '../../interface/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {
  }

  getTags(songId: string): Observable<Tag[]> {
    return this.http.get<Tag[]>('https://zingdoihoatien.herokuapp.com/songs/' + songId + '/tags');
  }

  createTag(songId: number, tag: Tag): Observable<Tag> {
    return this.http.post<Tag>('https://zingdoihoatien.herokuapp.com/songs/' + songId + '/tags', tag);
  }
}
