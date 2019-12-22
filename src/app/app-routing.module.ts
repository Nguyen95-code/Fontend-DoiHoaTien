import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailSongComponent} from './page/song/detail-song/detail-song.component';
import {DeleteSongComponent} from './page/song/delete-song/delete-song.component';
import {CreateSongComponent} from './page/song/create-song/create-song.component';
import {ListSongNewComponent} from './page/song/list-song-new/list-song-new.component';
import {ListSongComponent} from './page/song/list-song/list-song.component';



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
    path: '',
    component: ListSongNewComponent
  },
  {
    path: 'list-song-new',
    component: ListSongNewComponent
  },
  {
    path: 'list-song',
    component: ListSongComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
