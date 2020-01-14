import { Component, OnInit } from '@angular/core';
import {CommentService} from '../../../../service/comment/comment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthenticationService} from '../../../../service/authentication/authentication.service';
import {UserService} from '../../../../service/user/user.service';
import {User} from '../../../../interface/user';
import {Subscription} from 'rxjs';
import {SongService} from '../../../../service/song/song.service';
import {Song} from '../../../../interface/song';
import {Comment} from '../../../../interface/comment';

@Component({
  selector: 'app-create-song-comment',
  templateUrl: './create-song-comment.component.html',
  styleUrls: ['./create-song-comment.component.scss']
})
export class CreateSongCommentComponent implements OnInit {

  constructor(private commentService: CommentService,
              private fb: FormBuilder,
              private db: AngularFireDatabase,
              private  router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private activateRoute: ActivatedRoute,
              private songService: SongService) {
  }
  commentForm: FormGroup;
  currentUser: User;
  comment: Comment;
  sub: Subscription;
  song: Song;
  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.songService.detail(id).subscribe(next => {
        this.song = next;
        console.log(this.song);
      }, error1 => {
        console.log(error1);
      });
    });
    this.commentForm = this.fb.group({
      description: ['', [Validators.required]]
    });
    if (this.authenticationService.currentUser) {
      const username = this.authenticationService.currentUserValue.username;
      this.userService.getUserByUsername(username).subscribe(next => {
        this.currentUser = next;
        console.log(this.currentUser);
        if (this.currentUser.roles.name == null) {
          alert('Bạn phải đăng nhập !');
        }
    }, error1 => {
        console.log(error1);
      });
    } else {
        this.router.navigate(['login']);
      }
    }
  createComment() {
    this.comment = {
      description: this.commentForm.value.description,
      song: this.song,
      user: this.currentUser
    };
    this.commentService.create(this.comment, this.song.id).subscribe(() => {
      console.log('Add thành công!');
      this.commentForm.reset();
    }, error => {
      console.log('lỗi' + error);
    });
  }

}
