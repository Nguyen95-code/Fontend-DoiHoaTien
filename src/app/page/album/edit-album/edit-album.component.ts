import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import * as firebase from 'firebase';
import {Album} from '../../../interface/album';
import {AlbumService} from '../../../service/album/album.service';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {UserService} from '../../../service/user/user.service';
import {User} from '../../../interface/user';

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.scss']
})
export class EditAlbumComponent implements OnInit {
  sub: Subscription;
  album: Album;
  albumForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    image: new FormControl('')
  });
  nameImageURL: string;
  uploadImageSuccess: boolean;
  checkImage: boolean;
  currentUser: User;
  constructor(private albumService: AlbumService,
              private activateRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.albumService.detail(id).subscribe(next => {
        this.album = next;
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
          alert('Bạn không có quyền sửa album');
          this.router.navigate(['/']);
        }
      }, error1 => {
        console.log(error1);
      });
    } else {
      this.router.navigate(['login']);
    }
  }

  editAlbum() {
    const checkValid = this.albumForm.valid && this.albumForm.value.name.trim().length >= 6;
    if (!this.uploadImageSuccess && this.albumForm.value.image !== '') {
      alert('Vui lòng đợi upload file xong');
    } else {
      if (this.albumForm.value.name.trim() !== '') {
        this.album.name = this.albumForm.value.name.trim();
      }
      if (this.albumForm.value.image !== '') {
        this.album.image = this.nameImageURL;
      }
      this.albumService.edit(this.album).subscribe(() => {
        console.log('Add thành công!');
        this.router.navigate(['list-album']);
        this.albumForm.reset();
      }, error => {
        console.log('lỗi' + error);
      });
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
      console.log(fileName);
      const uploadTask = firebase.storage().ref('img/' + Date.now()).put(file[0], metadata);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // in progress
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        },
        (error) => {
          this.uploadImageSuccess = false;
          console.log('error' + error);
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
