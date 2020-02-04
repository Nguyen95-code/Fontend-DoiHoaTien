import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Song} from '../../../interface/song';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../interface/user';
import {SongService} from '../../../service/song/song.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {UserService} from '../../../service/user/user.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.scss']
})
export class EditSongComponent implements OnInit {

  sub: Subscription;
  song: Song;
  songForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    link: new FormControl(''),
    image: new FormControl('')
  });
  currentUser: User;
  nameAudioURL: string;
  checkAudio = true;
  uploadAudioSuccess: boolean;
  nameImageURL: string;
  checkImage = true;
  uploadImageSuccess: boolean;
  constructor(private songService: SongService,
              private activateRoute: ActivatedRoute,
              private fb: FormBuilder,
              private db: AngularFireDatabase,
              private  router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService) { }

  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.songService.detail(id).subscribe(next => {
        this.song = next;
      }, error1 => {
        console.log(error1);
      });
    });
    if (this.authenticationService.currentUserValue) {
      const username = this.authenticationService.currentUserValue.username;
      this.userService.getUserByUsername(username).subscribe(next => {
        this.currentUser = next;
        console.log(this.currentUser);
        if (this.currentUser.roles.name !== 'ROLE_SINGER') {
          alert('Bạn không có quyền tạo bài hát');
          this.router.navigate(['/']);
        }
      }, error1 => {
        console.log(error1);
      });
    } else {
      this.router.navigate(['login']);
    }
  }
  editSong() {
    const checkValid = this.songForm.valid && this.songForm.value.name.trim().length >= 6
      && this.songForm.value.description.trim().length >= 10;
    if (checkValid) {
      if (!this.checkAudio) {
        alert('This is not audio');
      } else {
        if (!this.checkImage) {
          alert('This is not image');
        } else {
          if (!this.uploadImageSuccess || !this.uploadAudioSuccess) {
            alert('Please wait upload file');
          } else {
            // this.song = {
            //   name: this.songForm.value.name.trim(),
            //   link: this.nameAudioURL,
            //   image: this.nameImageURL,
            //   description: this.songForm.value.description.trim(),
            //   playlist: [],
            //   album: []
            // };
            if (this.songForm.value.name.trim() !== '') {
              this.song.name = this.songForm.value.name.trim();
            }
            if (this.songForm.value.image !== '') {
              this.song.image = this.nameImageURL;
            }
            this.songService.edit(this.song).subscribe(() => {
              console.log('Add thành công!');
              this.router.navigate(['list-song']);
              this.songForm.reset();
            }, error => {
              console.log('lỗi' + error);
            });
          }
        }
      }
    } else {
      alert('Form is invalid');
    }
  }
  uploadAudio(event) {
    const file = event.target.files;
    const fileName: string = file[0].name;
    if (fileName.endsWith('.mp3')) {
      this.checkAudio = true;
      const metadata = {
        contentType: 'audio',
      };
      const uploadTask = firebase.storage().ref('audio/' + Date.now()).put(file[0], metadata);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // in progress
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        },
        (error) => {
          this.uploadAudioSuccess = false;
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log(downloadURL);
            this.uploadAudioSuccess = true;
            this.nameAudioURL = downloadURL;
          });
        }
      );
    } else {
      this.checkAudio = false;
    }
  }


  uploadImage(event) {
    const file = event.target.files;
    const fileName: string = file[0].name;
    if (fileName.endsWith('png') || fileName.endsWith('jpg') || fileName.endsWith('gif') ||
      fileName.endsWith('bmp') || fileName.endsWith('jpeg')) {
      this.checkImage = true;
      const metadata = {
        contentType: 'image',
      };
      const uploadTask = firebase.storage().ref('img/' + Date.now()).put(file[0], metadata);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // in progress
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        },
        (error) => {
          this.uploadImageSuccess = false;
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            console.log(downloadURL);
            this.uploadImageSuccess = true;
            this.nameImageURL = downloadURL;
          });
        }
      );
    } else {
      this.checkImage = false;
    }
  }


}
