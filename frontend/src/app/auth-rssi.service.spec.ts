import { TestBed } from '@angular/core/testing';

import { AuthRssiService } from './auth-rssi.service';

describe('AuthRssiService', () => {
  let service: AuthRssiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthRssiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
