import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailSongComponent} from './page/song/detail-song/detail-song.component';
import {DeleteSongComponent} from './page/song/delete-song/delete-song.component';
import {CreateSongComponent} from './page/song/create-song/create-song.component';
import {ListSongNewComponent} from './page/song/list-song-new/list-song-new.component';
import {ListSongComponent} from './page/song/list-song/list-song.component';
import {RegisterComponent} from './page/users/register/register.component';
import {LoginComponent} from './page/users/login/login.component';
import {CreatePlaylistComponent} from './page/playlist/create-playlist/create-playlist.component';


const routes: Routes = [
  {
    path: 'detail-song/:id/delete-song/:id',
    component: DeleteSongComponent
  },
  {
    path: 'detail-song/:id',
    component: DetailSongComponent
  },
  {
    path: 'create-song',
    component: CreateSongComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: ListSongNewComponent
  },
  {
    path: 'list-song-new',
    component: ListSongNewComponent
  },
  {
    path: 'list-playlist',
    component: ListSongComponent
  },
  {
    path: 'list-song/detail-song/:id',
    component: DetailSongComponent
  },
  {
    path: 'create-playlist',
    component: CreatePlaylistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
