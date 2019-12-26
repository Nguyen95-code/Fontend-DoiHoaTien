import {Component, OnInit} from '@angular/core';
import {Playlist} from '../../../interface/playlist';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {Album} from '../../../interface/album';
import {AlbumService} from '../../../service/album/album.service';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {UserService} from '../../../service/user/user.service';
import {User} from '../../../interface/user';

@Component({
  selector: 'app-list-album',
  templateUrl: './list-album.component.html',
  styleUrls: ['./list-album.component.scss']
})
export class ListAlbumComponent implements OnInit {
  listAlbum: Album[];
  currentUser: User;

  constructor(private albumservice: AlbumService,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }
  isSinger = false;
  ngOnInit() {
    this.albumservice.getAllAlbum().subscribe(result => {
      this.listAlbum = result;
    }, error => {
      console.log(error);
    });
    if (this.authenticationService.currentUserValue) {
      const username = this.authenticationService.currentUserValue.username;
      this.userService.getUserByUsername(username).subscribe(next => {
        this.currentUser = next;
        if (this.currentUser.roles.name === 'ROLE_SINGER') {
          this.isSinger = true;
        } else { this.isSinger = false; }
        console.log(this.currentUser);
      }, error1 => {
        console.log(error1);
      });
    } else { this.isSinger = false; }
  }
}
