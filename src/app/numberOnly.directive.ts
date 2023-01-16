/* -------------------------------------------Export external constants--------------------------------------------*/
// Only for desmontration purpose, not to be included in the current file in real app project
// I used Map & Set over Array to leverage O(1) average complexity on element search & insertion operations

export const generateNumberRegexp = function (decimalPlaces: number): any {
  return {
    UNSIGNED_INTEGER: '^[0-9]*$',
    SIGNED_INTERGER: '^-?[0-9]+$',
    UNSINGED_DECIMAL: `^[0-9]+(['.',','][0-9]{1,${decimalPlaces}})?$`,
    SIGNED_DECIMAL: `^-?[0-9]+(['.',','][0-9]{1,${decimalPlaces}})?$`,
  };
};

// key mapping for legacy browser that support deprecated keyCode
export const legacyBrowserSpecialKey = new Map(
  Object.entries({
    8: 'Backspace',
    9: 'Tab',
    27: 'Escape',
    35: 'End',
    36: 'Home',
    37: 'ArrowLeft',
    39: 'ArrowRight',
    46: 'Delete',
    188: ',',
    190: '.',
    109: '-', // minus in numpad,
    173: '-', // minus in alphabet keyboard in firefox
    189: '-', // minus in alphabet keyboard in chrome
  })
);

// special key that will be allowed to execute it's default behavior
export const GENERIC_ALLOWED_KEYS = new Set<string>([
  'Backspace',
  'ArrowLeft',
  'ArrowRight',
  'Escape',
  'Tab',
  'Delete',
  'Home',
  'End',
]);

// special key in combinations: Ctr+A - Ctr+X - Ctrl+C - Ctrl+V (with capslock on/off)
export const SELECT_AND_CLIPBOARD_KEYS = new Set<string>([
  'a',
  'x',
  'c',
  'v',
  'A',
  'X',
  'C',
  'V',
]);

// error messages
export const ERROR_MESSAGES_INPUT_NUMBER = {
  INVALID_ELEMENT_TYPE:
    "NumberOnly directive must be used with input[type='text']",
  INVALID_MIN_MAX: 'Either of min or max values is invalid',
};

// typescript number range checking on stackoverflow (I don't reinvent the wheel)
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

/* ----------------------------------End of external constants imports--------------------------------------------*/

import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

/**
 * NumberOnly Directive features:
 * - supports negative number
 * - supports decimal places up to 16 zeroes (JS boundary)
 * - supports 2 types of decimal sign (point & comma)
 * - supports min/max boundary up to SAFE_INTEGER
 * - supports empty string or '0' by default
 * Since the business logic is super fast and no async request involved
 * there is no need of debounce technique
 * A strict fuctional test suite is , unfortunately I own you this
 */
@Directive({ selector: '[NumberOnly]' })
export class NumberOnlyDirective implements OnInit {
  // customizable options
  @Input() allowEmpty: boolean = true;
  @Input() allowNegative: boolean = true;
  @Input() allowDecimals: boolean = true;
  @Input() decimalSign: '.' | ',' = '.';
  @Input() decimalPlaces: Range<1, 16> = 2;
  @Input() min: number = Number.MIN_SAFE_INTEGER;
  @Input() max: number = Number.MAX_SAFE_INTEGER;

  selectAndClipboardKeys: Set<string> = SELECT_AND_CLIPBOARD_KEYS;
  regexpTemplates: any;
  regexp: string = '';
  lock: boolean = false;
  hostRef: HTMLInputElement;

  constructor(private hostElement: ElementRef, private renderer: Renderer2) {
    this.hostRef = this.hostElement.nativeElement;
  }

  /**
   * Throw error in realtime
   * Init default values
   */
  ngOnInit(): void {
    // realtime min max and element type validation
    this.realtimeValidation();

    // init default displayed value: 0 or ''
    this.hostRef.value = this.allowEmpty ? '' : '0';

    // dynamically generate regexp templates with customized decimal places
    this.regexpTemplates = generateNumberRegexp(this.decimalPlaces);

    // choose an appropiate regular expression
    if (!this.allowDecimals && !this.allowNegative)
      this.regexp = this.regexpTemplates.UNSIGNED_INTEGER;
    if (!this.allowDecimals && this.allowNegative)
      this.regexp = this.regexpTemplates.SIGNED_INTERGER;
    if (this.allowDecimals && !this.allowNegative)
      this.regexp = this.regexpTemplates.UNSINGED_DECIMAL;
    if (this.allowDecimals && this.allowNegative)
      this.regexp = this.regexpTemplates.SIGNED_DECIMAL;
  }

  /**
   * Triggered on every user keydown, allow user to type (put in allowedList) if:
   * - input key is a number
   * - input key is in allowedKeys ('Backspace','ArrowLeft','ArrowRight','Escape','Tab','Delete')
   * - input key is one of combinations (Ctrl+A / Ctr+C / Ctrl+X /Ctrl+V)
   */
  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent): void {
    // hostRef:                     refer to the host reference
    // cursorPosition:              get the current selection/insertion position
    // curNumber:                   get the current number of the Input
    // hasNegativeSign:             if current value has "-" sign
    // hasDecimalSign:              if current value has "," or "." sign
    // key:                         get incoming key value
    // withCtrlOrCommand:           detect if user input combination with Ctrl or Command (Mac keyboard)
    // cursorNextToNegativeSign:    detect if cursor position is next to negative sign
    // allowedKeys:                 list of special keys allowed to be added
    // isValidNumber:               if key is a number (unsigned integer)
    const cursorPosition: number = this.hostRef.selectionStart || 0;
    const curNumber: string = this.hostRef.value || '';
    const hasNegativeSign = curNumber.includes('-');
    const hasDecimalSign = curNumber.includes(this.decimalSign);
    const key: string = this.getKeyValue(e) || '';
    const withCtrlOrCommand = e.ctrlKey === true || e.metaKey === true;
    const cursorNextToNegativeSign = hasNegativeSign && cursorPosition <= 1;
    const allowedKeys = new Set(GENERIC_ALLOWED_KEYS);
    const isValidNumber = new RegExp(
      this.regexpTemplates.UNSIGNED_INTEGER
    ).test(key);

    // add the decimal sign to the allowed list if:
    // - decimal signs are allowed
    // - input currently doens't has any decimal signs
    // - cursor is not positioned next to the the negative sign (-. and .-)
    if (this.allowDecimals && !hasDecimalSign && !cursorNextToNegativeSign)
      allowedKeys.add(this.decimalSign);

    // add the negative sign to the allowed list if:
    // - negative sign is allowed
    // - intput currently doens't has negative signs
    // - cursor is positioned at the beginning
    if (this.allowNegative && !hasNegativeSign && cursorPosition == 0)
      allowedKeys.add('-');

    // prevent key from being processed by the default input behaviors if:
    // key is not valid number
    // key is not in allowedKeys ('Backspace','ArrowLeft','ArrowRight','Escape','Tab','Delete')
    // key is not one of combinations (Ctrl+A / Ctr+C / Ctrl+X /Ctrl+V)
    if (
      !isValidNumber &&
      !allowedKeys.has(key) &&
      !(this.selectAndClipboardKeys.has(key) && withCtrlOrCommand)
    )
      e.preventDefault();
  }

  /**
   * Triggered on user hit Ctrl/Command-V and right click + paste
   * - remove default paste behavior
   * - replace by validateAndTransform()
   */
  @HostListener('paste', ['$event']) onPaste(e: any): void {
    let value = e.clipboardData.getData('text/plain');
    this.validateAndTransform(value);
    e.preventDefault();
  }

  /**
   * Triggered on user mouseout or tab after user done typing
   */
  @HostListener('change', ['$event']) onChange(e: any): void {
    this.validateAndTransform(this.hostRef.value);
  }

  /**
   * Triggered on mouseout, tab after user done typing or on paste operation
   * - Transform value if decimal is allowed
   * - validate whether input value is a valid number
   * - Update input with the new transformed value
   */
  validateAndTransform(value: string): void {
    // if decimal is allowed:
    // - adding zero to the beginning if value begins with decimal sign
    // - adding zero to the end if value end with decimal sign
    // - replace decimal comma to point (for later use Number() method)
    if (this.allowDecimals) {
      if (value.charAt(0) == this.decimalSign) value = 0 + value;
      if (value.charAt(value.length - 1) == this.decimalSign) value = value + 0;
      if (this.decimalSign != '.') value = value.replace(',', '.');
    }

    // convert to Number(value) and convert back to string to get rid of leading zeroes
    // we can use regexp to resolve this too, this is only for demonstration one of Number() use case
    // - handle adding decimal places
    // if regexp validation fails -> replace it with '' or '0'
    let transValue = this.convertNumToStr(Number(value));
    if (!new RegExp(this.regexp).test(transValue))
      transValue = this.allowEmpty ? '' : '0';

    // set value in range [min, max] if out of bound
    if (this.max && Number(transValue) > this.max)
      transValue = this.convertNumToStr(this.max);
    if (this.min && Number(transValue) < this.min)
      transValue = this.convertNumToStr(this.min);

    // switch the decimal sign back if needed
    // update the current input value
    this.hostRef.value =
      this.decimalSign == '.' ? transValue : transValue.replace('.', ',');
  }

  /**
   * Throw error in console + render error message in UI if:
   * - directive is not being used on input[type='text']
   * - either min or max is invalid
   * I couldn't come up with a compile-time validation solution
   * So I handle it in realtime
   */
  realtimeValidation(): void {
    const child = this.renderer.createElement('div');
    const parent = this.renderer.parentNode(this.hostRef);
    // if the host is not Input tag
    if (!(this.hostRef instanceof HTMLInputElement)) {
      const text = ERROR_MESSAGES_INPUT_NUMBER.INVALID_ELEMENT_TYPE;
      const textEl = this.renderer.createText(text);
      this.renderer.appendChild(child, textEl);
      this.renderer.appendChild(parent, child);
      throw Error(text);
    }
    // if min max is invalid
    if (this.min >= this.max) {
      const text = ERROR_MESSAGES_INPUT_NUMBER.INVALID_MIN_MAX;
      const textEl = this.renderer.createText(text);
      this.renderer.appendChild(child, textEl);
      this.renderer.appendChild(parent, child);
      throw Error(text);
    }
  }

  /**
   * Get key value from keyCode (a fallback for old browser solution)
   * - Modern browser: e.key
   * - Legacy browser: e.keyCode
   * The reason why I'm using (e: any) here is only for desmontration
   * in case we are targeting to old browser where "key" property are not supported
   */
  getKeyValue(e: any): string | undefined {
    // for modern browser, immediately return key value
    if (e.key) return e.key;

    // for legacy browsers that use keyCode instead of key
    if (legacyBrowserSpecialKey.has(e.keyCode))
      return legacyBrowserSpecialKey.get(e.keyCode);
    else return String.fromCharCode(e.keyCode);
  }

  /**
   * If decimal is allowed, convert to decimal string
   * otherwise, convert to string
   */
  convertNumToStr(num: number): string {
    return this.allowDecimals
      ? num.toFixed(this.decimalPlaces)
      : num.toString();
  }
}
