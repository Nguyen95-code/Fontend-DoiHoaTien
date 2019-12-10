import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Singer} from '../../interface/singer';

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
}
