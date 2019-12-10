import { Component, OnInit } from '@angular/core';
import { SongService } from '../../../service/song/song.service';
import { Song } from '../../../interface/song';
import {Subscription} from 'rxjs';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-delete-song',
  templateUrl: './delete-song.component.html',
  styleUrls: ['./delete-song.component.scss']
})
export class DeleteSongComponent implements OnInit {
  song: Song;
  messageSuccess = '';
  messageError = '';
  sub: Subscription;

  constructor(private songService: SongService,
              private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.songService.detail(id).subscribe(next => {
        this.song = next;
      }, error => {
        this.messageSuccess = error.toString();
      });
    });
  }

  delete() {
    this.songService.delete(this.song.id).subscribe(() => {
      this.messageSuccess = 'Delete Success';
    }, () => {
      this.messageError = 'Delete Error';
    });
  }

}
