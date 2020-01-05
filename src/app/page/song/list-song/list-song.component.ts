import {Component, OnInit} from '@angular/core';
import {Song} from '../../../interface/song';
import {SongService} from '../../../service/song/song.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AudioService} from '../../../service/player/audio.service';
import {Subscription} from 'rxjs';
import {StreamState} from '../../../interface/stream-state';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.scss']
})
export class ListSongComponent implements OnInit {
  song: Song;
  songList: Song[] = [];
  sub: Subscription;
  state: StreamState;
  volume;
  onVolume = true;
  playSong: boolean[] = [];
  currentTime: number;
  constructor(private songService: SongService,
              private activateRoute: ActivatedRoute,
              private audioService: AudioService) {
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit() {
    this.songService.getAllSong().subscribe(result => {
      this.songList = result;
    }, error => {
      console.log(error);
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
    this.currentTime = this.state.currentTime;
  }

  play(song) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.songList.length; i++) {
      this.playSong[this.songList[i].id] = false;
    }
    this.playSong[song.id] = true;
    console.log(song);
    if (this.song !== song) {
      this.song = song;
      this.currentTime = 0;
      this.audioService.stop();
    }
    this.playStream(song.link);
    this.audioService.play();
    this.audioService.seekTo(this.currentTime);
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
