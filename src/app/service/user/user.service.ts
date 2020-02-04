import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../interface/user';
import {HttpClient, } from '@angular/common/http';
import {Song} from '../../interface/song';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }
  private USER_API = 'https://zingdoihoatien.herokuapp.com/users';
  private USER_CURRENT = 'https://zingdoihoatien.herokuapp.com/userCurrent';
  private UrlSinger = 'https://zingdoihoatien.herokuapp.com/singers';
  private URL_EDIT_USER = 'https://zingdoihoatien.herokuapp.com/users';
  register(user): Observable<User> {
    return this.http.post<User>('https://zingdoihoatien.herokuapp.com/register', user);
  }

  detail(id): Observable<User> {
    return this.http.get<User>(this.USER_API + `/${id}`);
  }

  getUserCurrent(): Observable<User> {
    return this.http.get<User>(this.USER_CURRENT);
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>('https://zingdoihoatien.herokuapp.com/users?username=' + username);
  }

  newPassword(user: User, id: number): Observable<User> {
    return this.http.post<User>(`https://zingdoihoatien.herokuapp.com/new-password/${id}`, user);
  }
  editUser(user: User): Observable<User> {
    return this.http.put<User>(this.URL_EDIT_USER, user);
  }

  login(user: User): Observable<User> {
    return this.http.post<User>( 'https://zingdoihoatien.herokuapp.com/login', user);
  }

  detailSinger(id: string): Observable<User> {
    return this.http.get<User>(this.UrlSinger + '/' + id);
  }
  getAllSinger(): Observable<User[]> {
    return this.http.get<User[]>(this.UrlSinger);
  }
}
