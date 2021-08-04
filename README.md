# XeroJobs

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.2.

## Links
https://developer.xero.com/app/manage
https://developer.xero.com/documentation/api/accounting/contacts/
https://github.com/XeroAPI/xero-node
https://github.com/XeroAPI/xero-node-oauth2-ts-starter
https://github.com/XeroAPI/xero-node-oauth2-app/blob/master/src/app.ts
https://stackoverflow.com/questions/64096100/firebase-functions-integration-with-xero-node

[Building a REST API with Firebase cloud functions, TypeScript, and Firestore](https://blog.logrocket.com/rest-api-firebase-cloud-functions-typescript-firestore/)
https://firebase.google.com/docs/functions/typescript

```
firebase functions:config:set xero.client_id="XXX" xero.client_secret="XXX"
firebase functions:config:set xero.redirect_uri="https://australia-southeast1-xero-jobs.cloudfunctions.net/xeroInit/AuthorizationCallback"
firebase functions:config:set app.url="https://xero-jobs.web.app"

firebase emulators:start --only functions
firebase deploy --only functions
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deploy
`firebase deploy --except functions`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
