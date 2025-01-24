import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPassowrdComponent } from './forget-passowrd.component';

describe('ForgetPassowrdComponent', () => {
  let component: ForgetPassowrdComponent;
  let fixture: ComponentFixture<ForgetPassowrdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgetPassowrdComponent]
    });
    fixture = TestBed.createComponent(ForgetPassowrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
