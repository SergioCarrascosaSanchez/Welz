import { TestBed } from '@angular/core/testing';

import { BudgetDateService } from './budget-date.service';

describe('BudgetDateService', () => {
  let service: BudgetDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
