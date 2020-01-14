import {Component, OnInit} from '@angular/core';
import {Song} from '../../../interface/song';
import {Subscription} from 'rxjs';
import {SongService} from '../../../service/song/song.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {StreamState} from '../../../interface/stream-state';
import {AudioService} from '../../../service/player/audio.service';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {UserService} from '../../../service/user/user.service';
import {User} from '../../../interface/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommentService} from '../../../service/comment/comment.service';
import {Comment} from '../../../interface/comment';


@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.scss']
})
export class DetailSongComponent implements OnInit {
  constructor(private songService: SongService,
              private activateRoute: ActivatedRoute,
              private audioService: AudioService,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private commentService: CommentService,
              private fb: FormBuilder) {
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }
  song: Song;
  sub: Subscription;
  state: StreamState;
  volume;
  currentUser: User;
  onVolume = true;
  isSinger = false;
  view = 0;
  comment: Comment;
  commentForm: FormGroup;
  listCommentSong: Comment[] = [];

  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.songService.detail(id).subscribe(next => {
        this.song = next;
        this.view = this.song.views;
        console.log(this.song);
      }, error1 => {
        console.log(error1);
      });
      this.commentService.getListCommentSong(id).subscribe(result => {
        this.listCommentSong = result;
        console.log(result);
      }, error => {
        console.log(error);
      });
    });
    if (this.authenticationService.currentUserValue) {
      const username = this.authenticationService.currentUserValue.username;
      this.userService.getUserByUsername(username).subscribe(next => {
        this.currentUser = next[0];
        console.log(this.currentUser);
        if (this.currentUser.roles.name === 'ROLE_SINGER') {
          this.isSinger = true;
        } else {
          this.isSinger = false;
        }
      }, error2 => {
        console.log(error2);
      });
    } else {
      this.isSinger = false;
    }

    this.commentForm = this.fb.group({
      description: ['', [Validators.required]]
    });
    // this.commentService.getListCommentSong(this.song.id).subscribe(result => {
    //   this.listCommentSong = result;
    //   console.log(result);
    // }, error => {
    //   console.log(error);
    // });
  }

  // upViews() {
  //   this.song.view = 0;
  //   this.songService.edit(this.song, this.song.id).subscribe(() => {
  //     console.log('edit thanh cong');
  //   }, error => {
  //     console.log('loi' + error);
  //   });
  // }

  isEndSongs() {
    if (this.state.readableCurrentTime === this.state.readableDuration) {
      this.next();
    }
  }

  playStream(url) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
      if (this.state.readableDuration === this.state.readableCurrentTime) {
        this.next();
      }
    });
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.stop();
    this.playStream(this.song.link);
    this.audioService.play();
    this.view++;
    this.song = {
      id: this.song.id,
      name: this.song.name,
      description: this.song.description,
      image: this.song.image,
      views: this.view,
      user: this.song.user,
      album: this.song.album,
      playlist: this.song.playlist,
      link: this.song.link
    };
    console.log(this.view);
    console.log(this.song);
    this.songService.edit(this.song).subscribe(() => {
      console.log('Update thanh cong');
    }, error => {
      console.log(error);
    });
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    this.audioService.pause();
  }

  previous() {
    this.audioService.pause();
  }

  onSliderChangeEnd(change) {
    this.audioService.seekTo(change.value);
  }

  turnOnVolume() {
    this.audioService.onVolume();
    this.onVolume = true;
  }

  turnOffVolume() {
    this.audioService.offVolume();
    this.onVolume = false;
  }

  onChangVolume(volume) {
    this.audioService.changeVolume(volume.value / 100);
  }

  createComment() {
    this.comment = {
      description: this.commentForm.value.description,
      song: this.song,
      user: this.currentUser
    };
    this.commentService.createCommentSong(this.comment, this.song.id).subscribe(() => {
      console.log('Add thành công!');
      this.commentForm.reset();
    }, error => {
      console.log('lỗi' + error);
    });
  }
}
