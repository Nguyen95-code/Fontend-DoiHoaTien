import { Component, OnInit } from '@angular/core';
import {SongService} from '../../../service/song/song.service';
import {Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {Song} from '../../../interface/song';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent implements OnInit {

  constructor(private songService: SongService,
              private fb: FormBuilder,
              private db: AngularFireDatabase,
              private  router: Router, ) { }

  songForm: FormGroup;

  nameAudioURL: string;
  checkAudio = true;
  uploadAudioSuccess: boolean;
  nameImageURL: string;
  checkImage = true;
  uploadImageSuccess: boolean;
  song: Song;
  ngOnInit() {
    this.songForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      link: ['', [Validators.required]],
      image: ['', [Validators.required]]
    });
  }
  createSong() {
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
            this.song = {
              name: this.songForm.value.name,
              link: this.nameAudioURL,
              image: this.nameImageURL,
              description: this.songForm.value.description
            };
            this.songService.create(this.song).subscribe(() => {
              console.log('Add thành công!');
              alert('Upload success');
              this.router.navigate(['']);
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
