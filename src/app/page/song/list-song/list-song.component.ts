import {Component, OnInit} from '@angular/core';
import {Song} from '../../../interface/song';
import {SongService} from '../../../service/song/song.service';

@Component({
  selector: 'app-list-song',
  templateUrl: './list-song.component.html',
  styleUrls: ['./list-song.component.scss']
})
export class ListSongComponent implements OnInit {
  songList: Song[] = [];
  number: number[] = [];

  constructor(private songService: SongService) {
  }

  ngOnInit() {
    this.songService.getAllSong().subscribe(result => {
      this.songList = result;
    }, error => {
      console.log(error);
    });

    for (let i = 0; i < this.songList.length; i++) {
      this.number.push(i);
    }
  }
}
