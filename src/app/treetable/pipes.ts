import { PipeTransform, Pipe } from "@angular/core";


@Pipe({name: 'debug'})
export class DebugPipe implements PipeTransform {
  transform(obj: any): any {
    console.log('DebugPipe: ', obj);
    return obj;
  }
}
