import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferingsComponent } from './offerings.component';

describe('OfferingsComponent', () => {
  let component: OfferingsComponent;
  let fixture: ComponentFixture<OfferingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferingsComponent]
    });
    fixture = TestBed.createComponent(OfferingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
