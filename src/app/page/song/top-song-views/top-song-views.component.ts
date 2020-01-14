import { Component, OnInit } from '@angular/core';
import {Song} from '../../../interface/song';
import {SongService} from '../../../service/song/song.service';

@Component({
  selector: 'app-top-song-views',
  templateUrl: './top-song-views.component.html',
  styleUrls: ['./top-song-views.component.scss']
})
export class TopSongViewsComponent implements OnInit {

  listTopViewSong: Song[] = [];
  constructor(private songService: SongService) {
  }

  ngOnInit() {
    this.songService.getListTopView().subscribe(result => {
      this.listTopViewSong = result;
    }, error => {
      console.log(error);
    });
  }

}
