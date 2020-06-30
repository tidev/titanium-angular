import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatBytes'
})
export class FormatBytesPipe implements PipeTransform {
  private k = 1024;

  private sizes = ['Bytes', 'KB', 'MB'];

  transform(bytes: number): any {
    if(bytes === 0) {
      return '0 Bytes';
    }

    const i = Math.floor(Math.log(bytes) / Math.log(this.k));

    return parseFloat((bytes / Math.pow(this.k, i)).toFixed(2)) + ' ' + this.sizes[i];
  }
}