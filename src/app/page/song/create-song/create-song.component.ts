import { Component, OnInit } from '@angular/core';
import {SongService} from '../../../service/song/song.service';
import {Router} from "@angular/router";
import {AngularFireDatabase} from "@angular/fire/database";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import * as firebase from "firebase";
import {Song} from "../../../interface/song";

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.scss']
})
export class CreateSongComponent implements OnInit {

  constructor(private songService: SongService,
              private fb: FormBuilder,
              private db: AngularFireDatabase,
              private  router: Router,) { }

  ngOnInit() {
  }

  songForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    link: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl('')
  });
  createSong() {
    let song: Song = {
      name: this.songForm.value.name,
      link: this.nameAudioURL,
      image: this.nameImageURL,
      description: this.songForm.value.description
    };
    this.songService.create(song).subscribe(() => {
      console.log('Add thành công!');
      this.songForm.reset();
    }, error => {
      console.log('lỗi' + error);
    });
  }

  nameAudioURL : string;

  uploadAudio(event){
    const file = event.target.files;
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
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log(downloadURL);
          this.nameAudioURL = downloadURL;
        });
      }
    );
  }

  nameImageURL: string;

  uploadImage(event){
    const file = event.target.files;
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
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log(downloadURL);
          this.nameImageURL = downloadURL;
        });
      }
    );
  }
}
