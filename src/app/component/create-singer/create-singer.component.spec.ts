import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSingerComponent } from './create-singer.component';

describe('CreateSingerComponent', () => {
  let component: CreateSingerComponent;
  let fixture: ComponentFixture<CreateSingerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSingerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
