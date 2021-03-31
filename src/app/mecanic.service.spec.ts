import { TestBed } from '@angular/core/testing';

import { MecanicService } from './mecanic.service';

describe('MecanicService', () => {
  let service: MecanicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MecanicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
