import { MoneyFormatPipe } from './money-format.pipe';

describe('MoneySyntaxPipe', () => {
  let pipe: MoneyFormatPipe;

  beforeEach(() => {
    pipe = new MoneyFormatPipe();
  });

  it('should add € to 0', () => {
    expect(pipe.transform(0)).toEqual('0€');
  });

  it('should add € to integer numbers', () => {
    expect(pipe.transform(1)).toEqual('1€');
  });

  it('should add € to decimal numbers', () => {
    expect(pipe.transform(0.24)).toEqual('0,24€');
  });

  it('should complete decimal part if there is less than 2 digits', () => {
    expect(pipe.transform(10.1)).toEqual('10,10€');
    expect(pipe.transform(0.2)).toEqual('0,20€');
    expect(pipe.transform(123456.3)).toEqual('123.456,30€');
  });

  it('should add dots every three digits of integer part', () => {
    expect(pipe.transform(123456)).toEqual('123.456€');
    expect(pipe.transform(1234567)).toEqual('1.234.567€');
    expect(pipe.transform(1234567.23)).toEqual('1.234.567,23€');
    expect(pipe.transform(12345678.23)).toEqual('12.345.678,23€');
  });

  it('should truncate decimal part for only two digits', () => {
    expect(pipe.transform(12345678.23999)).toEqual('12.345.678,23€');
  });
});
