import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { serviceGuard } from './service.guard';

describe('serviceGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => serviceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
