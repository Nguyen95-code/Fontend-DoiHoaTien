import { Component, OnInit } from '@angular/core';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {Playlist} from '../../../interface/playlist';

@Component({
  selector: 'app-list-playlist',
  templateUrl: './list-playlist.component.html',
  styleUrls: ['./list-playlist.component.scss']
})
export class ListPlaylistComponent implements OnInit {
  listPlaylist: Playlist[];
  constructor(private playlistService: PlaylistService) { }

  ngOnInit() {
    this.playlistService.getAllPlaylist().subscribe(result => {
      this.listPlaylist = result;
    }, error => {
      console.log(error);
    });
  }
}
