import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {UserService} from '../../../service/user/user.service';
import {Router} from '@angular/router';
import {User} from '../../../interface/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private router: Router,
              private fb: FormBuilder) { }
  currentUser: User;

  passwordForm: FormGroup;
  checkPassword = false;

  ngOnInit() {
    if (this.authenticationService.currentUserValue) {
      const username = this.authenticationService.currentUserValue.username;
      this.userService.getUserByUsername(username).subscribe(next => {
        this.currentUser = next;
        console.log(this.currentUser);
      }, error1 => {
        console.log(error1);
      });
    } else {
      this.router.navigate(['home']);
      window.location.reload();
    }
    this.passwordForm = this.fb.group({
      password: '',
      confirmPassword: ''
    });
  }
  enterNewpassword() {
    if (this.passwordForm.value.password !== this.passwordForm.value.confirmPassword) {
      this.checkPassword = false;
    } else { this.checkPassword = true; }
  }

  changePassword() {
    if (this.checkPassword) {
      this.currentUser.password = this.passwordForm.value.password;
      this.currentUser.confirmPassword = this.passwordForm.value.confirmPassword;
      this.userService.newPassword(this.currentUser, this.currentUser.id).subscribe( () => {
        alert('Đổi mật khẩu thành công');
        this.router.navigate(['']);
        window.location.reload();
      }, error1 => {
        console.log(error1);
      });
    }
  }
}
