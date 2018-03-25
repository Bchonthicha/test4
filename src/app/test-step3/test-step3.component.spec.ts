import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStep3Component } from './test-step3.component';

describe('TestStep3Component', () => {
  let component: TestStep3Component;
  let fixture: ComponentFixture<TestStep3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestStep3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
