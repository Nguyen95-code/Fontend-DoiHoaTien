import {Component, OnInit} from '@angular/core';
import {Song} from '../../../interface/song';
import {SingerService} from '../../../service/singer/singer.service';
import {SongService} from '../../../service/song/song.service';

@Component({
  selector: 'app-list-song-new',
  templateUrl: './list-song-new.component.html',
  styleUrls: ['./list-song-new.component.scss']
})
export class ListSongNewComponent implements OnInit {
  listNewSong: Song[];

  // listNewSong: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private songService: SongService) {
  }

  ngOnInit() {
    this.songService.getList().subscribe(result => {
      this.listNewSong = result;
    }, error => {
      console.log(error);
    });
  }

}
