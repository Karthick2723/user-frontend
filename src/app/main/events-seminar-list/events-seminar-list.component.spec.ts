import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSeminarListComponent } from './events-seminar-list.component';

describe('EventsSeminarListComponent', () => {
  let component: EventsSeminarListComponent;
  let fixture: ComponentFixture<EventsSeminarListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsSeminarListComponent]
    });
    fixture = TestBed.createComponent(EventsSeminarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
