import {Component, OnInit} from '@angular/core';
import {SongService} from '../../../service/song/song.service';
import {Song} from '../../../interface/song';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {UserService} from '../../../service/user/user.service';
import {User} from '../../../interface/user';

@Component({
  selector: 'app-delete-song',
  templateUrl: './delete-song.component.html',
  styleUrls: ['./delete-song.component.scss']
})
export class DeleteSongComponent implements OnInit {
  song: Song;
  messageSuccess = '';
  messageError = '';
  sub: Subscription;
  currentUser: User;

  constructor(private songService: SongService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.songService.detail(id).subscribe(next => {
        this.song = next;
      }, error => {
        this.messageSuccess = error.toString();
      });
    });
    if (this.authenticationService.currentUserValue) {
      const username = this.authenticationService.currentUserValue.username;
      this.userService.getUserByUsername(username).subscribe(next => {
        this.currentUser = next;
        console.log(this.currentUser);
        if (this.currentUser.roles.name !== 'ROLE_SINGER') {
          alert('Bạn không có quyền xóa bài hát');
          this.router.navigate(['/']);
        }
      }, error1 => {
        console.log(error1);
      });
    } else {
      this.router.navigate(['login']);
    }
  }

  delete() {
    this.songService.delete(this.song.id).subscribe(() => {
      this.messageSuccess = 'Delete Success';
      this.router.navigate(['']);
    }, () => {
      this.messageError = 'Delete Error';
    });
  }

}
