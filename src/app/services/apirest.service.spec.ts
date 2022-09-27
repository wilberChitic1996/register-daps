import { TestBed } from '@angular/core/testing';

import { APIRESTService } from './apirest.service';

describe('APIRESTService', () => {
  let service: APIRESTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIRESTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
