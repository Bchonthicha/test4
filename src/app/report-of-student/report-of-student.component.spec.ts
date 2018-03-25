import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOfStudentComponent } from './report-of-student.component';

describe('ReportOfStudentComponent', () => {
  let component: ReportOfStudentComponent;
  let fixture: ComponentFixture<ReportOfStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOfStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOfStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
