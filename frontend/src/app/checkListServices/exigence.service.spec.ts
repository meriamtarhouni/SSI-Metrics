import { TestBed } from '@angular/core/testing';

import { ExigenceService } from './exigence.service';

describe('ExigenceService', () => {
  let service: ExigenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExigenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
