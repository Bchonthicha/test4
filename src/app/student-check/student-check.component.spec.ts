import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCheckComponent } from './student-check.component';

describe('StudentCheckComponent', () => {
  let component: StudentCheckComponent;
  let fixture: ComponentFixture<StudentCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
