import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyFormat',
})
export class MoneyFormatPipe implements PipeTransform {
  transform(value: number): string {
    value = Math.floor(value * 100) / 100;

    if (value === 0) return value + '€';

    const integerPart = value.toString().split('.')[0];
    const decimalPart = value.toString().split('.')[1];

    if (decimalPart === '0') return value + '€';

    if (decimalPart === undefined || decimalPart === '0')
      return this.groupIntegerPart(integerPart) + '€';
    if (decimalPart.length === 1)
      return this.groupIntegerPart(integerPart) + ',' + decimalPart + '0€';
    return this.groupIntegerPart(integerPart) + ',' + decimalPart + '€';
  }

  groupIntegerPart(integerPart: string): string {
    const valueformated = integerPart.split('').reverse().join('');

    const integerGroups = [[valueformated[0]]];
    for (let i = 1; i < valueformated.length; i++) {
      const lastGroup = integerGroups[integerGroups.length - 1];
      if (lastGroup.length < 3) {
        lastGroup.push(valueformated[i]);
      } else {
        integerGroups.push([valueformated[i]]);
      }
    }
    return integerGroups
      .map((group) => group.reverse().join(''))
      .reverse()
      .join('.');
  }
}
