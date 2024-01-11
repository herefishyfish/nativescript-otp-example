import { Component, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
  NativeScriptModule,
  NativeScriptRouterModule,
} from "@nativescript/angular";

@Component({
  selector: "ns-app",
  template: `
    <RootLayout>
      <page-router-outlet />
    </RootLayout>
  `,
})
class AppComponent {}

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule.forRoot([
      { path: "", redirectTo: "/login", pathMatch: "full" },
      {
        path: "login",
        loadComponent: () =>
          import("./pages/login/login.page").then((m) => m.LoginPageComponent),
      },
    ]),
  ],
  declarations: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
