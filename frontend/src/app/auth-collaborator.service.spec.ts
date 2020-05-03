import { TestBed } from '@angular/core/testing';

import { AuthCollaboratorService } from './auth-collaborator.service';

describe('AuthCollaboratorService', () => {
  let service: AuthCollaboratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCollaboratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
