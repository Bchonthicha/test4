import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOfTestComponent } from './report-of-test.component';

describe('ReportOfTestComponent', () => {
  let component: ReportOfTestComponent;
  let fixture: ComponentFixture<ReportOfTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOfTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOfTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
