import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSeminarDetailsComponent } from './events-seminar-details.component';

describe('EventsSeminarDetailsComponent', () => {
  let component: EventsSeminarDetailsComponent;
  let fixture: ComponentFixture<EventsSeminarDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsSeminarDetailsComponent]
    });
    fixture = TestBed.createComponent(EventsSeminarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
