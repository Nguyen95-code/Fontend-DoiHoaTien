import { Component, OnInit } from '@angular/core';
import {User} from '../../../interface/user';
import {Subscription} from 'rxjs';
import {UserService} from '../../../service/user/user.service';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../service/authentication/authentication.service';

@Component({
  selector: 'app-list-singer',
  templateUrl: './list-singer.component.html',
  styleUrls: ['./list-singer.component.scss']
})
export class ListSingerComponent implements OnInit {

  singer: User;
  singerList: User[];
  sub: Subscription;
  currentUser: User;
  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    this.userService.getAllSinger().subscribe(result => {
      this.singerList = result;
    }, error => {
      console.log(error);
    });
    if (this.authenticationService.currentUserValue) {
      const username = this.authenticationService.currentUserValue.username;
      this.userService.getUserByUsername(username).subscribe(next => {
        this.currentUser = next;
        console.log(this.currentUser);
      }, error1 => {
        console.log(error1);
      });
    } else {
      this.router.navigate(['login']);
    }
  }

}
