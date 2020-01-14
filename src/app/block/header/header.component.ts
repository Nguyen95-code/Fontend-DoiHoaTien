import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {User} from '../../interface/user';
import {UserService} from '../../service/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
    if (this.authenticationService.currentUserValue) {
      const username = this.authenticationService.currentUserValue.username;
      userService.getUserByUsername(username).subscribe(next => {
        this.currentUser = next[0];
        console.log(this.currentUser);
      }, error1 => {
        console.log(error1);
      });
    }
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
    window.location.reload();
  }
}
