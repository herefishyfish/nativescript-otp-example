import {
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ElementRef,
  Component,
  NO_ERRORS_SCHEMA,
} from "@angular/core";
import { TextField, Utils, isAndroid } from "@nativescript/core";

@Component({
  selector: "otp-input",
  standalone: true,
  template: `
    <StackLayout orientation="horizontal" padding="20">
      @for(input of [].constructor(4); track input) {
      <TextView #otpTextField class="otp-input" keyboardType="integer" />
      }
    </StackLayout>
  `,
  styles: `
    .otp-input {
      width: 40;
      height: 40;
      margin: 5;
      font-size: 14;
      border-width: 1;
      border-color: black;
      border-radius: 5;
      text-align: center;
    }
    .otp-input:focus {
      border-color: blue;
    }
  `,
  schemas: [NO_ERRORS_SCHEMA],
})
export class OtpComponent {
  @ViewChildren("otpTextField") textFields: QueryList<ElementRef<TextField>>;
  @Input() otp: string = "1111";
  @Output() correctOtp: EventEmitter<boolean> = new EventEmitter();

  ngAfterViewInit() {
    const textFieldsArray = this.textFields.toArray();
    textFieldsArray.forEach((field, index) => {
      const textField: TextField = field.nativeElement;

      if (index === 0) textField.focus();

      textField.valueFormatter = (value) => {
        if (value.length > 1) {
          value = value.charAt(value.length - 1);
        }
        return value;
      };

      textField.on('textChange', () => this.handleTextChange(index));
    });
  }

  handleTextChange(index: number) {
    const textFieldsArray = this.textFields.toArray();
    const textField: TextField = textFieldsArray[index].nativeElement;

    if (textField.text.length >= 1 && index < textFieldsArray.length - 1) {
      textFieldsArray[index + 1].nativeElement.focus();
    } else if (textField.text.length === 0 && index > 0) {
      textFieldsArray[index - 1].nativeElement.focus();
    } 

    this.validateOtp();
  }

  validateOtp() {
    const otpEntered = this.textFields.toArray()
      .map(field => field.nativeElement.text)
      .join('');

    if (otpEntered === this.otp) {
      if (isAndroid) {
        Utils.android.dismissSoftInput();
      }

      this.textFields.forEach(field => {
        const textField: TextField = field.nativeElement;
        textField.editable = false;
        textField.animate({ rotate: 360, duration: 500 }).then(() => {
          this.correctOtp.emit(true);
        });
      });
    } else if(otpEntered.length === this.otp.length) {
      this.textFields.forEach(field => {
        const textField: TextField = field.nativeElement;
        textField.animate({ translate: { x: 10, y: 0 }, duration: 100 })
          .then(() => textField.animate({ translate: { x: -10, y: 0 }, duration: 100 }))
          .then(() => textField.animate({ translate: { x: 0, y: 0 }, duration: 100 }));
      });
    }
  }
}
