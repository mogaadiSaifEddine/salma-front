import { TestBed } from '@angular/core/testing';

import { ISPService } from './isp.service';

describe('ISPService', () => {
  let service: ISPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ISPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
