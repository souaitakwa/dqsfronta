import { TestBed } from '@angular/core/testing';

import { DefaultcommentService } from './defaultcomment.service';

describe('DefaultcommentService', () => {
  let service: DefaultcommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultcommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
