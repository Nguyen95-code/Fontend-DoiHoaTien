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
  nameImageURL = '';
  checkImage = true;
  uploadImageSuccess: boolean;
  song: Song;
  currentUser: User;

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
      company: ''
    });
  }

  editUser() {
    let name: string;
    let image: string;
    let address: string;
    let identityCard: string;
    let company: string;

    if (this.userForm.value.name.trim() !== '') {
      name = this.userForm.value.name.trim();
    } else {
      name = this.currentUser.name;
    }

    if (this.nameImageURL !== '') {
      image = this.nameImageURL;
    } else {
      image = this.currentUser.image;
    }

    if (this.userForm.value.address.trim() !== '') {
      address = this.userForm.value.address.trim();
    } else {
      address = this.currentUser.address;
    }

    if (this.userForm.value.identityCard.trim() !== '') {
      identityCard = this.userForm.value.identityCard.trim();
    } else {
      identityCard = this.currentUser.identityCard;
    }

    if (this.userForm.value.company.trim() !== '') {
      company = this.userForm.value.company.trim();
    } else {
      company = this.currentUser.company;
    }

    const userTemp: User = {
      id: this.currentUser.id,
      name,
      image,
      address,
      identityCard,
      company,
      username: this.currentUser.username,
      password: this.currentUser.password,
      confirmPassword: this.currentUser.confirmPassword,
      playlist: this.currentUser.playlist,
      albumList: this.currentUser.albumList,
      myList: this.currentUser.myList,
      roles: this.currentUser.roles
    };

    this.userService.editUser(userTemp).subscribe(next => {
      console.log(next);
      alert('Cập nhật thành công');
      window.location.reload();
    }, error1 => {
      console.log(error1);
    });
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
