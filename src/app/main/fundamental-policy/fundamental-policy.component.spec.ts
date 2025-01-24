import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundamentalPolicyComponent } from './fundamental-policy.component';

describe('FundamentalPolicyComponent', () => {
  let component: FundamentalPolicyComponent;
  let fixture: ComponentFixture<FundamentalPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FundamentalPolicyComponent]
    });
    fixture = TestBed.createComponent(FundamentalPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
