import { TestBed } from '@angular/core/testing';

import { EventsSeminarService } from './events-seminar.service';

describe('EventsSeminarService', () => {
  let service: EventsSeminarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventsSeminarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
