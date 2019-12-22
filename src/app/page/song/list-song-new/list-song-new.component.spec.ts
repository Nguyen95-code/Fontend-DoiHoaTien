import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSongNewComponent } from './list-song-new.component';

describe('ListSongNewComponent', () => {
  let component: ListSongNewComponent;
  let fixture: ComponentFixture<ListSongNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSongNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSongNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
