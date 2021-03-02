import { TestBed } from '@angular/core/testing';

import { CustomEntityDataServiceService } from './custom-entity-data-service.service';

describe('CustomEntityDataServiceService', () => {
  let service: CustomEntityDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomEntityDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
