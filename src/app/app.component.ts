import { Component, ViewEncapsulation } from '@angular/core';
// import { FormBuilder, FormControl } from '@angular/forms';

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;
export type Range<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  allowNegative: boolean = true;
  allowEmpty: boolean = false;
  allowDecimal: boolean = true;
  decimalSign: '.' | ',' = '.';
  decimalPlaces: Range<1, 16> = 2;
  min: number = -1000;
  max: number = 1000;
  errorMsg: string = '';

  validateMin() {
    if (!this.allowNegative) {
      if (this.min < 0) this.min = 0;
      if (this.max < 0) this.max = 0;
    }
  }

  catchValidation(message: string) {
    this.errorMsg = message;
  }
}
