import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListSingerComponent} from './component/list-singer/list-singer.component';
import {CreateSingerComponent} from './component/create-singer/create-singer.component';
import {EditSingerComponent} from './component/edit-singer/edit-singer.component';


const routes: Routes = [
  {
    path: '',
    component: ListSingerComponent
  },
  {
    path: 'create-singer',
    component: CreateSingerComponent
  },
  {
    path: 'edit-singer/:id',
    component: EditSingerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
