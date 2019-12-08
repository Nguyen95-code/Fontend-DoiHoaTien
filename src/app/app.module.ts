import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './block/header/header.component';
import { SingerComponent } from './page/singer/singer.component';
import { MenuComponent } from './block/menu/menu.component';
import { ListSongNewComponent } from './page/song/list-song-new/list-song-new.component';
import { FooterComponent } from './block/footer/footer.component';
import { CreateSongComponent } from './page/song/create-song/create-song.component';
import { DeleteSongComponent } from './delete-song/delete-song.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SingerComponent,
    MenuComponent,
    ListSongNewComponent,
    FooterComponent,
    CreateSongComponent,
    DeleteSongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
