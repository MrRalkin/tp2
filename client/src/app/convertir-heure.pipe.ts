import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertirHeure'
})
export class ConvertirHeurePipe implements PipeTransform {

//  transform(value: unknown, ...args: unknown[]): unknown {
  transform(s: string): string {
    var t = '';

    for (var i = 0; i < (4 - s.length); i++)
    {
        t += '0'
    }
    
    t += s;

    return t.substring(0,2) + 'h' + t.substring(2,4);
  }

}
