import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceInqruriesComponent } from './service-inqruries.component';

describe('ServiceInqruriesComponent', () => {
  let component: ServiceInqruriesComponent;
  let fixture: ComponentFixture<ServiceInqruriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceInqruriesComponent]
    });
    fixture = TestBed.createComponent(ServiceInqruriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
