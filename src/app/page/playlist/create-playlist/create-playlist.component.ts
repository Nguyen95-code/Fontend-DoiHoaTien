import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {Playlist} from '../../../interface/playlist';
import * as firebase from 'firebase';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styleUrls: ['./create-playlist.component.scss']
})
export class CreatePlaylistComponent implements OnInit {

  constructor(private playlistService: PlaylistService,
              private fb: FormBuilder,
              private db: AngularFireDatabase,
              private  router: Router) { }

  playlistForm: FormGroup;

  nameImageURL: string;
  checkImage = true;
  uploadImageSuccess: boolean;
  playlist: Playlist;
  ngOnInit() {
    this.playlistForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      image: ['', [Validators.required]]
    });
  }
  createPlaylist() {
    const checkValid = this.playlistForm.valid && this.playlistForm.value.name.trim().length >= 6;
    if (checkValid) {
        if (!this.checkImage) {
          alert('This is not image');
        } else {
          if (!this.uploadImageSuccess) {
            alert('Please wait upload file');
          } else {
            this.playlist = {
              name: this.playlistForm.value.name.trim(),
              image: this.nameImageURL,
              songList: []
            };
            this.playlistService.create(this.playlist).subscribe(() => {
              console.log('Add thành công!');
              this.router.navigate(['list-playlist']);
              this.playlistForm.reset();
            }, error => {
              console.log('lỗi' + error);
            });
          }
        }
    } else {
      alert('Form is invalid');
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
