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
              private userService: UserService) {
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

  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.songService.detail(id).subscribe(next => {
        this.song = next;
      }, error1 => {
        console.log(error1);
      });
    });
    if (this.authenticationService.currentUserValue) {
      const username = this.authenticationService.currentUserValue.username;
      this.userService.getUserByUsername(username).subscribe(next => {
        this.currentUser = next;
        console.log(this.currentUser);
        if (this.currentUser.roles.name === 'ROLE_SINGER') {
          this.isSinger = true;
        } else {
          this.isSinger = false;
        }
      }, error1 => {
        console.log(error1);
      });
    } else {
      this.isSinger = false;
    }
  }

  upViews() {
    this.song.view++;
    this.songService.edit(this.song, this.song.id).subscribe(() => {
      console.log('edit thanh cong');
    }, error => {
      console.log('loi' + error);
    });
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
}
