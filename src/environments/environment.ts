// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBwdOPQDauCoqGEfR0RAh2Ob_Ju1VCVWUQ',
    authDomain: 'angular-started.firebaseapp.com',
    databaseURL: 'https://angular-started.firebaseio.com',
    projectId: 'angular-started',
    storageBucket: 'angular-started.appspot.com',
    messagingSenderId: '955087061726'
  }
};


/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
