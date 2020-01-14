import { Component, OnInit } from '@angular/core';
import {User} from '../../../interface/user';
import {Subscription} from 'rxjs';
import {StreamState} from '../../../interface/stream-state';
import {UserService} from '../../../service/user/user.service';
import {CommentService} from '../../../service/comment/comment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Comment} from '../../../interface/comment';

@Component({
  selector: 'app-detail-singer',
  templateUrl: './detail-singer.component.html',
  styleUrls: ['./detail-singer.component.scss']
})
export class DetailSingerComponent implements OnInit {

  currentUser: User;
  singer: User;
  sub: Subscription;
  state: StreamState;
  comment: Comment;
  commentForm: FormGroup;
  listCommentSinger: Comment[] = [];

  constructor(private userService: UserService,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private commentService: CommentService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.userService.detail(id).subscribe(next => {
        this.singer = next;
        console.log(this.singer);
      }, error1 => {
        console.log(error1);
      });
      this.commentService.getListCommentSinger(id).subscribe(result => {
        this.listCommentSinger = result;
        console.log(result);
      }, error => {
        console.log(error);
      });
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
    this.commentForm = this.fb.group({
      description: ['', [Validators.required]]
    });
  }

  createComment() {
    this.comment = {
      description: this.commentForm.value.description,
      singer: this.singer,
      user: this.currentUser
    };
    this.commentService.createCommentSong(this.comment, this.singer.id).subscribe(next => {
      this.listCommentSinger.unshift(next);
      console.log('Add thành công!');
      this.commentForm.reset();
    }, error => {
      console.log('lỗi' + error);
    });
  }
}
