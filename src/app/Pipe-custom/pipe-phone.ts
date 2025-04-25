import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormat',
  standalone: true // nếu bạn dùng standalone component
})
export class PhoneFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Xoá ký tự không phải số (trừ dấu + đầu tiên)
    value = value.replace(/(?!^\+)\D/g, '');

    // Kiểm tra nếu số bắt đầu bằng +84
    if (value.startsWith('+84')) {
      const part1 = value.slice(0, 3);      // +84
      const part2 = value.slice(3, 6);      // 3 number 
      const part3 = value.slice(6, 9);     
      const part4 = value.slice(9);        
      return `${part1}. ${part2}${part3}${part4}`;
    }
    return value;
  }
}
