import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSongViewsComponent } from './top-song-views.component';

describe('TopSongViewsComponent', () => {
  let component: TopSongViewsComponent;
  let fixture: ComponentFixture<TopSongViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopSongViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopSongViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
