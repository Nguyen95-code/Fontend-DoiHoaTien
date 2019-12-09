import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListSingerComponent } from './component/list-singer/list-singer.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { CreateSingerComponent } from './component/create-singer/create-singer.component';
import { EditSingerComponent } from './component/edit-singer/edit-singer.component';

@NgModule({
  declarations: [
    AppComponent,
    ListSingerComponent,
    CreateSingerComponent,
    EditSingerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
