import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayAlbumComponent } from './play-album.component';

describe('PlayAlbumComponent', () => {
  let component: PlayAlbumComponent;
  let fixture: ComponentFixture<PlayAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
