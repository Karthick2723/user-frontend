import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountDetailsComponent } from './my-account-details.component';

describe('MyAccountDetailsComponent', () => {
  let component: MyAccountDetailsComponent;
  let fixture: ComponentFixture<MyAccountDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyAccountDetailsComponent]
    });
    fixture = TestBed.createComponent(MyAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
