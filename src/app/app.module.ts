import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './block/header/header.component';
import { SingerComponent } from './page/singer/singer.component';
import { MenuComponent } from './block/menu/menu.component';
import { ListSongNewComponent } from './page/song/list-song-new/list-song-new.component';
import { FooterComponent } from './block/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SingerComponent,
    MenuComponent,
    ListSongNewComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
