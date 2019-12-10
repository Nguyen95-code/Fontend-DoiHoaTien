import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListSongComponent} from './component/list-song/list-song.component';


const routes: Routes = [
  {
    path: '',
    component: ListSongComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
