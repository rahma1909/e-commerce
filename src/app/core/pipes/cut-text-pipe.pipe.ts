import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutTextPipe',
  standalone: true
})
export class CutTextPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
