import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../interface/user';
import {HttpClient, } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  private userUrl = 'http://zingdoihoatien.herokuapp.com/api/users';
  create(user): Observable<User> {
    return this.http.post<User>(this.userUrl, user);
  }
}
