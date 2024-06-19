# MatterportSdkApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.4.

## Initial Setup

Before running the project, you need to set up the environment files.

### Setting Up Environment Files

1. **Create the Environment Files**:

   - Create two files in the `src/environments` directory:
     - `environment.ts`
     - `environment.prod.ts`

2. **Add Your Environment Variables**:

   - Add the following content to `src/environments/environment.ts` for development:

     ```typescript
     // src/environments/environment.ts
     export const environment = {
       production: false,
       MATTERPORT_SDK_KEY: "your-dev-matterport-sdk-key",
     };
     ```

   - Add the following content to `src/environments/environment.prod.ts` for production:

     ```typescript
     // src/environments/environment.prod.ts
     export const environment = {
       production: true,
       MATTERPORT_SDK_KEY: "your-prod-matterport-sdk-key",
     };
     ```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
