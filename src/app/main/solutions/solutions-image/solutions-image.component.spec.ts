import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolutionsImageComponent } from './solutions-image.component';

describe('SolutionsImageComponent', () => {
  let component: SolutionsImageComponent;
  let fixture: ComponentFixture<SolutionsImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolutionsImageComponent]
    });
    fixture = TestBed.createComponent(SolutionsImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
