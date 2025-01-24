import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSeminorComponent } from './events-seminor.component';

describe('EventsSeminorComponent', () => {
  let component: EventsSeminorComponent;
  let fixture: ComponentFixture<EventsSeminorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsSeminorComponent]
    });
    fixture = TestBed.createComponent(EventsSeminorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
