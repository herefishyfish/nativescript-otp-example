import { NO_ERRORS_SCHEMA, Component, signal } from "@angular/core";
import { OtpComponent } from "./components/otp.component";

@Component({
  selector: "login-page",
  standalone: true,
  template: `
    <GridLayout class="w-full h-full page-color">
      <StackLayout horizontalAlignment="center" class="p-5">
        @if(loggedIn()) {
        <Label class="text-3xl text-center text-white font-bold mt-20"
          >Logged In</Label
        >

        <Button
          class="rounded-full bg-red-400 text-white mt-6 text-lg font-bold w-[250] h-[50]"
          (tap)="loggedIn.set(false)"
          >Logout</Button
        >
        } @else {
        <Label class="text-3xl text-center text-white font-bold mt-20 blue-"
          >Enter Code</Label
        >
        <Label
          class="text-center text-white/90 mt-2"
          textWrap="true"
          width="85%"
          >We've sent an SMS with an activation code to your phone +34 653 02 73
          44</Label
        >
        <otp-input (correctOtp)="loggedIn.set(true)" />
        }
      </StackLayout>
    </GridLayout>
  `,
  imports: [OtpComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class LoginPageComponent {
  loggedIn = signal(false);
}
