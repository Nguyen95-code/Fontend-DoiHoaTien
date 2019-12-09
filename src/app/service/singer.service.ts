import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Singer} from '../interface/singer';

@Injectable({
  providedIn: 'root'
})
export class SingerService {
  API_URL = 'https://zingdoihoatien.herokuapp.com/api/singers';

  constructor(private http: HttpClient) {
  }

  getAllSinger(): Observable<Singer[]> {
    return this.http.get<Singer[]>(this.API_URL);
  }
  create(singer: Singer) {
    return this.http.post(this.API_URL, singer);
  }
  edit(id: number, singer: Singer): Observable<Singer> {
    return this.http.put<Singer>(`${this.API_URL}/${id}`, singer);
  }
  getById(id: string): Observable<Singer> {
    return this.http.get<Singer>(`${this.API_URL}/${id}`);
  }
}
