import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariousInquriesComponent } from './various-inquries.component';

describe('VariousInquriesComponent', () => {
  let component: VariousInquriesComponent;
  let fixture: ComponentFixture<VariousInquriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VariousInquriesComponent]
    });
    fixture = TestBed.createComponent(VariousInquriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
