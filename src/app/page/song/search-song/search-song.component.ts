import {Component, OnInit} from '@angular/core';
import {SongService} from '../../../service/song/song.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {UserService} from '../../../service/user/user.service';
import {Song} from '../../../interface/song';

@Component({
  selector: 'app-search-song',
  templateUrl: './search-song.component.html',
  styleUrls: ['./search-song.component.scss']
})
export class SearchSongComponent implements OnInit {

  searchForm: FormGroup;
  songList: Song[] = [];
  constructor(private songService: SongService,
              private fb: FormBuilder,
              private db: AngularFireDatabase,
              private  router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      name: ''
    });
    console.log(this.searchForm.value);
  }

  search() {
    this.songService.getSongByName(this.searchForm.value.name).subscribe(next => {
      this.songList = next;
      console.log(next);
    }, error1 => {
      console.log(error1);
    });
  }

  routerLink(song: Song) {
    this.router.navigate(['list-song/detail-song/' + song.id]);
  }
}
