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
import {ListPlaylistComponent} from './page/playlist/list-playlist/list-playlist.component';
import {EditPlaylistComponent} from './page/playlist/edit-playlist/edit-playlist.component';
import {DetailPlaylistComponent} from './page/playlist/detail-playlist/detail-playlist.component';
import {CreateAlbumComponent} from './page/album/create-album/create-album.component';
import {ListAlbumComponent} from './page/album/list-album/list-album.component';
import {EditAlbumComponent} from './page/album/edit-album/edit-album.component';
import {PlayAlbumComponent} from './page/album/play-album/play-album.component';
import {ChangePasswordComponent} from './page/users/change-password/change-password.component';

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
    path: 'home',
    component: ListSongNewComponent
  },
  {
    path: 'list-song-new',
    component: ListSongNewComponent
  },
  {
    path: 'list-song',
    component: ListSongComponent
  },
  {
    path: 'list-song/detail-song/:id',
    component: DetailSongComponent
  },
  {
    path: 'list-playlist/create-playlist',
    component: CreatePlaylistComponent
  },
  {
    path: 'list-playlist',
    component: ListPlaylistComponent
  },
  {
    path: 'list-playlist/detail-playlist/:id/edit-playlist/:id',
    component: EditPlaylistComponent
  },
  {
    path: 'list-playlist/detail-playlist/:id',
    component: DetailPlaylistComponent
  },
  {
    path: 'list-album/create-album',
    component: CreateAlbumComponent
  },
  {
    path: 'list-album',
    component: ListAlbumComponent
  },
  {
    path: 'list-album/detail-album/:id/edit-album/:id',
    component: EditAlbumComponent
  },
  {
    path: 'list-album/detail-album/:id',
    component: PlayAlbumComponent
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
    path: 'change-password',
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
