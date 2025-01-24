import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingImageComponent } from './landing-image.component';

describe('LandingImageComponent', () => {
  let component: LandingImageComponent;
  let fixture: ComponentFixture<LandingImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingImageComponent]
    });
    fixture = TestBed.createComponent(LandingImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
