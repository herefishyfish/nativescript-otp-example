import { NO_ERRORS_SCHEMA, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { OtpComponent } from './components/otp.component';
import { Button } from '@nativescript/core';

@Component({
  selector: 'login-page',
  standalone: true,
  template: `
    <StackLayout>
      <Label class="h1 text-center">Login Page</Label>
      @if(loggedIn()) {
        <Label class="h2 text-center">Logged In</Label>

        <Button (tap)="loggedIn.set(false)">Logout</Button>
      } @else {
        <GridLayout columns="*, auto, *" rows="auto">
          <otp-input column="1" (correctOtp)="loggedIn.set(true)" />
        </GridLayout>
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