import {Component, OnInit} from '@angular/core';
import {User} from '../../../interface/user';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Song} from '../../../interface/song';
import {Role} from '../../../interface/role';
import {UserService} from '../../../service/user/user.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {AuthenticationService} from '../../../service/authentication/authentication.service';

@Component({
  selector: 'app-edit-profile-user',
  templateUrl: './edit-profile-user.component.html',
  styleUrls: ['./edit-profile-user.component.scss']
})
export class EditProfileUserComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private fb: FormBuilder,
              private db: AngularFireDatabase,
              private  router: Router) {
  }

  user: User;
  userForm: FormGroup;
  nameForm: FormGroup;
  nameImageURL: string;
  checkImage = true;
  uploadImageSuccess: boolean;
  song: Song;

  role: Role = {name: 'ROLE_USER'};
  checkPass: boolean;
  currentUser: User;

  checkEditName: boolean = false;
  userTemp: User;

  ngOnInit() {
    if (this.authenticationService.currentUserValue) {
      const username = this.authenticationService.currentUserValue.username;
      this.userService.getUserByUsername(username).subscribe(next => {
        this.currentUser = next;
        console.log(this.currentUser);
      }, error1 => {
        console.log(error1);
      });
    } else {
      this.router.navigate(['home']);
      window.location.reload();
    }
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
    this.nameForm = this.fb.group({
      name: ''
    });
  }

  editUser() {
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

  changeEditName(){
    this.checkEditName = true;
  }
  editName() {
    this.userTemp = {
      id: this.currentUser.id,
      name: this.nameForm.value.name,
      image: this.currentUser.image,
      playlist: this.currentUser.playlist,
      albumList: this.currentUser.albumList,
      myList: this.currentUser.myList,
      roles: this.currentUser.roles,
      identityCard: this.currentUser.identityCard,
      address: this.currentUser.address,
      company: this.currentUser.company,
      password: this.currentUser.password,
      confirmPassword: this.currentUser.confirmPassword,
      username: this.currentUser.username
    };
    console.log(this.userTemp);
    this.userService.editUser(this.userTemp).subscribe(next => {
      this.currentUser = next;
    }, error => {
      console.log(error);
    });
    this.checkEditName = false;
  }
}
