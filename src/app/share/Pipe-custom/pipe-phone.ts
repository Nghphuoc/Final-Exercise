import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true 
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Xoá ký tự không phải số (trừ dấu + đầu tiên)
    value = value.replace(/(?!^\+)\D/g, '');

    // Kiểm tra nếu số bắt đầu bằng +84
    if (value.startsWith('0')) {
      const part1 = '+84';
      const part2 = value.slice(1, 10);               
      return `(${part1})${part2}`;
    }
    return value;
  }
}
