import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStep2Component } from './test-step2.component';

describe('TestStep2Component', () => {
  let component: TestStep2Component;
  let fixture: ComponentFixture<TestStep2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
