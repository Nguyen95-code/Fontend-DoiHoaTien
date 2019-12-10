import { Component, OnInit } from '@angular/core';
import {Song} from '../../../interface/song';
import {Subscription} from 'rxjs';
import {SongService} from '../../../service/song/song.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {StreamState} from "../../../interface/stream-state";
import {AudioService} from "../../../service/player/audio.service";


@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.scss']
})
export class DetailSongComponent implements OnInit {

  song: Song;
  sub: Subscription;
  constructor(private songService: SongService,
              private activateRoute: ActivatedRoute,
              private audioService: AudioService) {
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.songService.detail(id).subscribe(next => {
        this.song = next;
      }, error1 => {
        console.log(error1);
      });
    });
  }

  files: Array<any> = [];
  state: StreamState;
  volume;

  isEndSongs(){
    if (this.state.readableCurrentTime == this.state.readableDuration){
      this.next();
    }
  }

  playStream(url) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
      if (this.state.readableDuration == this.state.readableCurrentTime){
        this.next();
      }
    });
  }

  pause() {
    this.audioService.pause();
  }

  play() {
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

  onVolume = true;

  turnOnVolume(){
    this.audioService.onVolume();
    this.onVolume = true;
  }

  turnOffVolume(){
    this.audioService.offVolume();
    this.onVolume = false;
  }

  onChangVolume(volume){
    this.audioService.changeVolume(volume.value/100);
  }
}
