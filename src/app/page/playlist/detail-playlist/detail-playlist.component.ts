import {Component, OnInit} from '@angular/core';
import {SongService} from '../../../service/song/song.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AudioService} from '../../../service/player/audio.service';
import {Song} from '../../../interface/song';
import {Subscription} from 'rxjs';
import {StreamState} from '../../../interface/stream-state';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {Playlist} from '../../../interface/playlist';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {UserService} from '../../../service/user/user.service';
import {User} from '../../../interface/user';
import {CommentService} from '../../../service/comment/comment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Comment} from '../../../interface/comment';

@Component({
  selector: 'app-detail-playlist',
  templateUrl: './detail-playlist.component.html',
  styleUrls: ['./detail-playlist.component.scss']
})
export class DetailPlaylistComponent implements OnInit {
  constructor(private playlistService: PlaylistService,
              private activateRoute: ActivatedRoute,
              private audioService: AudioService,
              private songService: SongService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private commentService: CommentService,
              private fb: FormBuilder) {
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }
  currentUser: User;
  listSong: Song[] = [];
  song: Song;
  playlist: Playlist;
  sub: Subscription;
  state: StreamState;
  volume;
  songIdNow: number;
  songAll: Song[] = [];
  onVolume = true;
  comment: Comment;
  commentForm: FormGroup;
  listCommentPlaylist: Comment[] = [];

  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.playlistService.detail(id).subscribe(next => {
        this.playlist = next;
        this.listSong = this.playlist.songList;
      }, error1 => {
        console.log(error1);
      });
      this.commentService.getListCommentPlaylist(id).subscribe(result => {
        this.listCommentPlaylist = result;
        console.log(result);
      }, error => {
        console.log(error);
      });
    });

    this.commentForm = this.fb.group({
      description: ['', [Validators.required]]
    });
    this.songService.getAllSong().subscribe(result => {
      this.songAll = result;
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
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    if (this.songIdNow === this.listSong.length - 1) {
      this.songIdNow = 0;
    } else {
      this.songIdNow++;
    }
    this.song = this.listSong[this.songIdNow];
    this.play();
  }

  previous() {
    if (this.songIdNow === 0) {
      this.songIdNow = this.listSong.length - 1;
    } else {
      this.songIdNow--;
    }
    this.song = this.listSong[this.songIdNow];
    this.play();
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

  playAll() {
    this.songIdNow = 0;
    this.song = this.listSong[this.songIdNow];
    this.play();
  }

  playSong(id) {
    this.songService.detail(id).subscribe(next => {
      this.song = next;
      console.log(next);
      for (let i = 0; i < this.listSong.length; i++) {
        if (this.listSong[i].id === this.song.id) {
          this.songIdNow = i;
          break;
        }
      }
      this.play();
    }, error1 => {
      console.log(error1);
    });
  }

  addSong(id) {
    let songTemp: Song;
    this.songService.detail(id).subscribe(next => {
      songTemp = next;
      this.playlistService.addSong(this.playlist.id, songTemp).subscribe(() => {
        this.listSong.push(songTemp);
      }, error => {
        console.log(error);
      });
    }, error1 => {
      console.log(error1);
    });
  }

  remove(song) {
    this.playlistService.removeSong(this.playlist.id, song.id).subscribe(() => {
      window.location.reload();
    }, error => {
      console.log(error);
    });
  }
  createComment() {
    this.comment = {
      description: this.commentForm.value.description,
      playlist: this.playlist,
      user: this.currentUser
    };
    this.commentService.createCommentPlaylist(this.comment, this.playlist.id).subscribe(() => {
      console.log('Add thành công!');
      this.commentForm.reset();
      }, error => {
      console.log('lỗi' + error);
    });
  }
}
