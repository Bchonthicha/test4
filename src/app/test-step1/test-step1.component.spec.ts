import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStep1Component } from './test-step1.component';

describe('TestStep1Component', () => {
  let component: TestStep1Component;
  let fixture: ComponentFixture<TestStep1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestStep1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
