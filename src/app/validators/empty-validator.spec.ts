import { EmptyValidator } from './empty-validator';
import { FormControl } from '@angular/forms';

describe('EmptyValidator', () => {
  it('should return null for a non-empty input', () => {
    const control = new FormControl('Non-empty value');
    const result = EmptyValidator(control);

    expect(result).toBeNull();
  });

  it('should return an error object for an empty input', () => {
    const control = new FormControl('');
    const result = EmptyValidator(control);

    expect(result).toEqual({ emptyValue: true });
  });

  it('should return an error object for a null input', () => {
    const control = new FormControl(null);
    const result = EmptyValidator(control);

    expect(result).toEqual({ emptyValue: true });
  });
});
