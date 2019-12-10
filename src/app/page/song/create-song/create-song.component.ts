import { Component, OnInit } from '@angular/core';
import {SongService} from '../../../service/song/song.service';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent implements OnInit {

  constructor(private songService: SongService) { }

  ngOnInit() {
  }
  createSong(songForm) {
    this.songService.create(songForm.value).subscribe(() => {
      console.log('add thành công!');
      songForm.resetForm();
    }, error => {
      console.log('lỗi' + error);
    });
  }
}
