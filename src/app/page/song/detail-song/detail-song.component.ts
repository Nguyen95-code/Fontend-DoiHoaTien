import { Component, OnInit } from '@angular/core';
import {Song} from '../../../interface/song';
import {Subscription} from 'rxjs';
import {SongService} from '../../../service/song/song.service';
import {ActivatedRoute, ParamMap} from '@angular/router';


@Component({
  selector: 'app-detail-song',
  templateUrl: './detail-song.component.html',
  styleUrls: ['./detail-song.component.scss']
})
export class DetailSongComponent implements OnInit {

  song: Song;
  sub: Subscription;
  constructor(private songService: SongService,
              private activateRoute: ActivatedRoute) {
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
}
