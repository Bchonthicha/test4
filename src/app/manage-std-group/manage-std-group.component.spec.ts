import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStdGroupComponent } from './manage-std-group.component';

describe('ManageStdGroupComponent', () => {
  let component: ManageStdGroupComponent;
  let fixture: ComponentFixture<ManageStdGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageStdGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStdGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
