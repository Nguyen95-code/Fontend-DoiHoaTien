import {Component, OnInit} from '@angular/core';
import {Song} from "../../../interface/song";
import {SongService} from "../../../service/song/song.service";


@Component({
  selector: 'app-list-song',
  templateUrl: './list-song-new.component.html',
  styleUrls: ['./list-song-new.component.scss']
})
export class ListSongNewComponent implements OnInit {
  listNewSong: Song[] = [];
  constructor(private songService: SongService) {
  }

  ngOnInit() {
    this.songService.getListNew().subscribe(result => {
      this.listNewSong = result;
    }, error => {
      console.log(error);
    });
  }

}
