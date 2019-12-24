import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PlaylistService} from '../../../service/playlist/playlist.service';
import {Subscription} from 'rxjs';
import {Playlist} from '../../../interface/playlist';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {environment} from '../../../../environments/environment';

firebase.initializeApp(environment.firebase);

@Component({
  selector: 'app-edit-playlist',
  templateUrl: './edit-playlist.component.html',
  styleUrls: ['./edit-playlist.component.scss']
})
export class EditPlaylistComponent implements OnInit {

  sub: Subscription;
  playlist: Playlist;
  playlistForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    image: new FormControl('')
  });
  nameImageURL: string;
  uploadImageSuccess: boolean;
  checkImage: boolean;

  constructor(private playlistService: PlaylistService,
              private activateRoute: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.sub = this.activateRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = paraMap.get('id');
      this.playlistService.detail(id).subscribe(next => {
        this.playlist = next;
      }, error1 => {
        console.log(error1);
      });
    });
  }

  editPlaylist() {
    const checkValid = this.playlistForm.valid && this.playlistForm.value.name.trim().length >= 6;
    if (checkValid) {
      if (!this.uploadImageSuccess && this.playlistForm.value.image !== '') {
        alert('Vui lòng đợi upload file xong');
      } else {
        this.playlist.name = this.playlistForm.value.name.trim();
        if (this.playlistForm.value.image !== '') {
          this.playlist.image = this.nameImageURL;
        }
        this.playlistService.edit(this.playlist).subscribe(() => {
          console.log('Add thành công!');
          this.router.navigate(['list-playlist']);
          this.playlistForm.reset();
        }, error => {
          console.log('lỗi' + error);
        });
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
