import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSingerComponent } from './edit-singer.component';

describe('EditSingerComponent', () => {
  let component: EditSingerComponent;
  let fixture: ComponentFixture<EditSingerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSingerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
