import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './block/header/header.component';
import { SingerComponent } from './page/singer/singer.component';
import { MenuComponent } from './block/menu/menu.component';
import { FooterComponent } from './block/footer/footer.component';
import { CreateSongComponent } from './page/song/create-song/create-song.component';
import { DeleteSongComponent } from './page/song/delete-song/delete-song.component';
import { SongService} from './service/song/song.service';
import { SingerService} from './service/singer/singer.service';
import { HttpClientModule } from '@angular/common/http';
import { DetailSongComponent } from './page/song/detail-song/detail-song.component';
import {FormsModule} from '@angular/forms';
import { ListSongComponent } from './page/list-song/list-song.component';
import {ListSingerComponent} from './page/list-singer/list-singer.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SingerComponent,
    MenuComponent,
    FooterComponent,
    CreateSongComponent,
    DeleteSongComponent,
    DetailSongComponent,
    ListSongComponent,
    ListSingerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    SongService,
    SingerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
