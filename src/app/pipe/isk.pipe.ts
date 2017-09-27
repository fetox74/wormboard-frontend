import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'isk'
})
export class IskPipe implements PipeTransform {

  transform(value: string, condense: boolean): string {
    if (condense) {
      const numberOfCommas: number = (value.match(/,/g) || []).length;
      const valueSplitted = value.split(',');

      switch (numberOfCommas) {
        case 1:
          return valueSplitted[0] + '.' + valueSplitted[1].slice(0, 2) + 'k';
        case 2:
          return valueSplitted[0] + '.' + valueSplitted[1].slice(0, 2) + 'm';
        case 3:
          return valueSplitted[0] + '.' + valueSplitted[1].slice(0, 2) + 'b';
        case 4:
          return valueSplitted[0] + '.' + valueSplitted[1].slice(0, 2) + 't';
        default:
          return value;
      }
    } else {
      return value;
    }
  }

}
