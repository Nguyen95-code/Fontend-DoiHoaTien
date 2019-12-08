import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-song-new',
  templateUrl: './list-song-new.component.html',
  styleUrls: ['./list-song-new.component.scss']
})
export class ListSongNewComponent implements OnInit {

  listNewSong: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor() {
  }

  ngOnInit() {
  }

}
