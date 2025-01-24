import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UndercontrucionPageComponent } from './undercontrucion-page.component';

describe('UndercontrucionPageComponent', () => {
  let component: UndercontrucionPageComponent;
  let fixture: ComponentFixture<UndercontrucionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UndercontrucionPageComponent]
    });
    fixture = TestBed.createComponent(UndercontrucionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
