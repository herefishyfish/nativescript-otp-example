import { NO_ERRORS_SCHEMA, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { OtpComponent } from './components/otp.component';
import { Button } from '@nativescript/core';

@Component({
  selector: 'login-page',
  standalone: true,
  template: `
    <StackLayout horizontalAlignment="center">
      <Label class="h1 text-center">Login Page</Label>
      @if(loggedIn()) {
        <Label class="h2 text-center">Logged In</Label>

        <Button (tap)="loggedIn.set(false)">Logout</Button>
      } @else {
        <otp-input column="1" (correctOtp)="loggedIn.set(true)" />
      }
    </StackLayout>
  `,
  imports: [
    OtpComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoginPageComponent {
  loggedIn = signal(false);
}