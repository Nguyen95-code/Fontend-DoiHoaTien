import { Component, OnInit } from '@angular/core';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import * as firebase from 'firebase';
import {Album} from '../../../interface/album';
import {AlbumService} from '../../../service/album/album.service';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.scss']
})
export class CreateAlbumComponent implements OnInit {

  constructor(private albumService: AlbumService,
              private fb: FormBuilder,
              private db: AngularFireDatabase,
              private  router: Router) { }

  albumForm: FormGroup;

  nameImageURL: string;
  checkImage = true;
  uploadImageSuccess: boolean;
  album: Album;
  ngOnInit() {
    this.albumForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      image: ['', [Validators.required]]
    });
  }
  createAlbum() {
    const checkValid = this.albumForm.valid && this.albumForm.value.name.trim().length >= 6;
    if (checkValid) {
      if (!this.checkImage) {
        alert('This is not image');
      } else {
        if (!this.uploadImageSuccess) {
          alert('Please wait upload file');
        } else {
          this.album = {
            name: this.albumForm.value.name.trim(),
            image: this.nameImageURL,
            songList: []
          };
          this.albumService.create(this.album).subscribe(() => {
            console.log('Add thành công!');
            this.router.navigate(['list-album']);
            this.albumForm.reset();
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
