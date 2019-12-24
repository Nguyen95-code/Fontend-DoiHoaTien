import { Component, OnInit } from '@angular/core';
import {Playlist} from '../../../interface/playlist';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {Album} from '../../../interface/album';
import {AlbumService} from '../../../service/album/album.service';

@Component({
  selector: 'app-list-album',
  templateUrl: './list-album.component.html',
  styleUrls: ['./list-album.component.scss']
})
export class ListAlbumComponent implements OnInit {
  listAlbum: Album[];
  constructor(private albumservice: AlbumService) { }

  ngOnInit() {
    this.albumservice.getAllAlbum().subscribe(result => {
      this.listAlbum = result;
    }, error => {
      console.log(error);
    });
  }
}
