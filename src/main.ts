import {
  platformNativeScript,
  runNativeScriptAngularApp,
} from "@nativescript/angular";

import { AppModule } from "./app/app.module";
import { CoreTypes, TouchManager, View } from "@nativescript/core";

// default Touch animations
const originalTransform = Symbol("originalTransform");
TouchManager.enableGlobalTapAnimations = true;
TouchManager.animations = {
  down: (view: View) => {
    if (global.isIOS) {
      UIView.animateWithDurationDelayUsingSpringWithDampingInitialSpringVelocityOptionsAnimationsCompletion(
        0.3,
        0,
        0.5,
        3,
        UIViewAnimationOptions.CurveEaseInOut |
          UIViewAnimationOptions.AllowUserInteraction,
        () => {
          if (view?.ios) {
            view[originalTransform] =
              view[originalTransform] ?? view.ios.transform;

            view.ios.transform = CGAffineTransformConcat(
              view[originalTransform],
              CGAffineTransformMakeScale(0.97, 0.97)
            );
          }
        },
        null
      );
    } else {
      view
        ?.animate({
          scale: { x: 0.97, y: 0.97 },
          duration: 120,
          curve: CoreTypes.AnimationCurve.easeInOut,
        })
        .then(() => {})
        .catch(() => {});
    }
  },
  up: (view: View) => {
    if (global.isIOS) {
      UIView.animateWithDurationDelayUsingSpringWithDampingInitialSpringVelocityOptionsAnimationsCompletion(
        0.3,
        0,
        0.5,
        3,
        UIViewAnimationOptions.CurveEaseInOut |
          UIViewAnimationOptions.AllowUserInteraction,
        () => {
          if (view?.ios) {
            view.ios.transform =
              view[originalTransform] ?? CGAffineTransformMakeScale(1, 1);
          }
        },
        null
      );
    } else {
      view
        ?.animate({
          scale: { x: 1, y: 1 },
          duration: 120,
          curve: CoreTypes.AnimationCurve.easeInOut,
        })
        .then(() => {})
        .catch(() => {});
    }
  },
};

runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});
