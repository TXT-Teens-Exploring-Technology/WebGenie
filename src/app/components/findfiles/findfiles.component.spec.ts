import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindfilesComponent } from './findfiles.component';

describe('FindfilesComponent', () => {
  let component: FindfilesComponent;
  let fixture: ComponentFixture<FindfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
