import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User} from '../../../interface/user';
import {UserService} from '../../../service/user/user.service';
import {Router} from '@angular/router';
import {SongService} from '../../../service/song/song.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {Song} from '../../../interface/song';
import * as firebase from 'firebase';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private db: AngularFireDatabase,
              private  router: Router, ) { }
  user: User;
  userForm: FormGroup;
  checkAudio = true;
  uploadAudioSuccess: boolean;
  nameImageURL: string;
  checkImage = true;
  uploadImageSuccess: boolean;
  song: Song;
  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      link: ['', [Validators.required]],
      image: ['', [Validators.required]]
    });
  }
  createUser() {
    const checkValid = this.userForm.valid && this.userForm.value.name.trim().length >= 6
      && this.userForm.value.description.trim().length >= 10;
    if (checkValid) {
        if (!this.checkImage) {
          alert('This is not image');
        } else {
          if (!this.uploadImageSuccess || !this.uploadAudioSuccess) {
            alert('Please wait upload file');
          } else {
            this.user = {
              name: this.userForm.value.name.trim(),
              image: this.nameImageURL,
              playlist: [],
            };
            this.userService.create(this.user).subscribe(() => {
              console.log('Add thành công!');
              alert('Upload success');
              this.router.navigate(['']);
              this.userForm.reset();
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
