import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../interface/user';
import {UserService} from '../../../service/user/user.service';
import {Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {Song} from '../../../interface/song';
import * as firebase from 'firebase';
import {Role} from '../../../interface/role';
import {Playlist} from '../../../interface/playlist';
import {Album} from '../../../interface/album';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private db: AngularFireDatabase,
              private  router: Router) {
  }

  user: User;
  userForm: FormGroup;
  nameImageURL: string;
  checkImage = true;
  uploadImageSuccess: boolean;
  song: Song;

  role: Role = {name: 'ROLE_USER'};
  checkPass: boolean;

  ngOnInit() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      image: ['', [Validators.required]],
      address: '',
      identityCard: '',
      company: '',
      username: '',
      password: '',
      confirmPassword: ''
    });
  }

  createUser() {
    const checkValid = this.userForm.valid && this.userForm.value.name.trim().length >= 6 && this.checkPass;
    if (checkValid) {
      if (!this.checkImage) {
        alert('This is not image');
      } else {
        if (!this.uploadImageSuccess) {
          alert('Please wait upload file');
        } else {
          if (this.role.name === 'ROLE_USER') {
            this.user = {
              name: this.userForm.value.name.trim(),
              image: this.nameImageURL,
              playlist: [],
              myList: [],
              albumList: [],
              roles: this.role,
              password: this.userForm.value.password,
              confirmPassword: this.userForm.value.confirmPassword,
              username: this.userForm.value.username
            };
          } else {
            this.user = {
              name: this.userForm.value.name.trim(),
              image: this.nameImageURL,
              playlist: [],
              albumList: [],
              myList: [],
              roles: this.role,
              identityCard: this.userForm.value.identityCard.trim(),
              address: this.userForm.value.address.trim(),
              company: this.userForm.value.company.trim(),
              password: this.userForm.value.password,
              confirmPassword: this.userForm.value.confirmPassword,
              username: this.userForm.value.username
            };
          }
          console.log(this.user);
          this.userService.register(this.user).subscribe(() => {
            console.log('Add thành công!');
            alert('Đăng ký thành công');
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

  setRole(event) {
    const value = event.target.value;
    this.role = { name: value};
    console.log(this.role);
  }
  checkPassword() {
    if (this.userForm.value.password !== this.userForm.value.confirmPassword) {
      this.checkPass = false;
    } else { this.checkPass = true; }
  }
}
