import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true,
    },
  ],
})
export class ColorPickerComponent {
  colors = [
    'rgb(231, 76, 60)',
    'rgb(255, 137, 235)',
    'rgb(155, 89, 182)',
    'rgb(52, 152, 219)',
    'rgb(26, 188, 156)',
    'rgb(46, 204, 113)',
    'rgb(241, 196, 15)',
    'rgb(230, 126, 34)',
    'rgb(149, 165, 166)',
    'rgb(52, 73, 94)',
  ];

  value: string;
  isDisabled: boolean;
  onChange = (_: any) => {};
  onTouch = () => {};

  onColorClicked(color: string) {
    this.value = color;
    this.onChange(this.value);
    this.onTouch();
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value || '';
    } else {
      this.value = '';
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
