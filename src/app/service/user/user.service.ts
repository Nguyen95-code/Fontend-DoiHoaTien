import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../interface/user';
import {HttpClient, } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  private USER_API = 'http://zingdoihoatien.herokuapp.com/users';
  private USER_CURRENT = 'http://zingdoihoatien.herokuapp.com/userCurrent';
  register(user): Observable<User> {
    return this.http.post<User>('http://zingdoihoatien.herokuapp.com/register', user);
  }

  detail(id): Observable<User> {
    return this.http.get<User>(this.USER_API + `/${id}`);
  }

  getUserCurrent(): Observable<User> {
    return this.http.get<User>(this.USER_CURRENT);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>('http://zingdoihoatien.herokuapp.com/users?username=' + username);
  }

  newPassword(user: User, id: number, token: string): Observable<User> {
    return this.http.post<User>(this.USER_API + `/new-password/${id}?token=` + token, user);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>( 'http://zingdoihoatien.herokuapp.com/login', user);
  }
}
