import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './block/header/header.component';
import { MenuComponent } from './block/menu/menu.component';
import { FooterComponent } from './block/footer/footer.component';
import { CreateSongComponent } from './page/song/create-song/create-song.component';
import { DeleteSongComponent } from './page/song/delete-song/delete-song.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { DetailSongComponent } from './page/song/detail-song/detail-song.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './page/users/register/register.component';
import { LoginComponent } from './page/users/login/login.component';
import {MaterialModule} from './block/meterial/meterial.module';
import { ListSongComponent } from './page/song/list-song/list-song.component';
import {ListSongNewComponent} from './page/song/list-song-new/list-song-new.component';
import { CreatePlaylistComponent } from './page/playlist/create-playlist/create-playlist.component';
import { ListPlaylistComponent } from './page/playlist/list-playlist/list-playlist.component';
import { EditPlaylistComponent } from './page/playlist/edit-playlist/edit-playlist.component';
import { DetailPlaylistComponent } from './page/playlist/detail-playlist/detail-playlist.component';
import { CreateAlbumComponent } from './page/album/create-album/create-album.component';
import { ListAlbumComponent } from './page/album/list-album/list-album.component';
import { EditAlbumComponent } from './page/album/edit-album/edit-album.component';
import { PlayAlbumComponent } from './page/album/play-album/play-album.component';
import {JwtInterceptor} from './helper/jwt-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    CreateSongComponent,
    DeleteSongComponent,
    DetailSongComponent,
    ListSongNewComponent,
    ListSongComponent,
    RegisterComponent,
    LoginComponent,
    CreatePlaylistComponent,
    ListPlaylistComponent,
    EditPlaylistComponent,
    DetailPlaylistComponent,
    CreateAlbumComponent,
    ListAlbumComponent,
    EditAlbumComponent,
    PlayAlbumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
