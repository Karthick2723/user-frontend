import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBannerComponent } from './product-banner.component';

describe('ProductBannerComponent', () => {
  let component: ProductBannerComponent;
  let fixture: ComponentFixture<ProductBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductBannerComponent]
    });
    fixture = TestBed.createComponent(ProductBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
