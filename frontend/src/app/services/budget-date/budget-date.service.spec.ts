import { TestBed } from '@angular/core/testing';

import { BudgetDateService } from './budget-date.service';

describe('BudgetDateService', () => {
  let budgetDateService: BudgetDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    budgetDateService = TestBed.inject(BudgetDateService);
  });

  it('should be created', () => {
    expect(budgetDateService).toBeTruthy();
  });

  it('should initialize date to current date', () => {
    const currentDate = new Date();
    const serviceDate = budgetDateService.getDate();
    expect(serviceDate.getFullYear()).toEqual(currentDate.getFullYear());
    expect(serviceDate.getMonth()).toEqual(currentDate.getMonth());
    expect(serviceDate.getDate()).toEqual(currentDate.getDate());
  });

  it('should emit date change when onChangeMonth is called', () => {
    let emittedDate: Date | undefined;

    budgetDateService.dateChange.subscribe((date) => {
      emittedDate = date;
    });

    const changeValue = 1;
    budgetDateService.onChangeMonth(changeValue);

    expect(emittedDate).toBeDefined();
    if (emittedDate) {
      const expectedDate = new Date();
      expectedDate.setMonth(expectedDate.getMonth() + changeValue);

      expect(emittedDate.getFullYear()).toEqual(expectedDate.getFullYear());
      expect(emittedDate.getMonth()).toEqual(expectedDate.getMonth());
      expect(emittedDate.getDate()).toEqual(expectedDate.getDate());
    }
  });
});
