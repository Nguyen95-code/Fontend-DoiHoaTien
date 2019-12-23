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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListSingerComponent} from './page/singer/list-singer/list-singer.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './page/users/register/register.component';
import { LoginComponent } from './page/login/login.component';
import {MaterialModule} from './block/meterial/meterial.module';
import { ListSongComponent } from './page/song/list-song/list-song.component';
import {ListSongNewComponent} from './page/song/list-song-new/list-song-new.component';


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
    ListSongNewComponent,
    ListSingerComponent,
    ListSongComponent,
    ListSingerComponent,
    RegisterComponent,
    LoginComponent
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
    SongService,
    SingerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
