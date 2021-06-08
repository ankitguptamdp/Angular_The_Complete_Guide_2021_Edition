### 01) Course Introduction :

### 02) What is Angular? :
- Angular is a JavaScript Framework which allows you to create reactive Single-Page-Applications (SPAs).
- JavaScript changes the DOM, changes whatever is displayed in the browser, by changing the HTML code during runtime.

### 03) Join our Online Learning Community :

### 04) Angular vs Angular 2 vs Latest Angular Version :
- Angular 1 (Now AngularJS)
- Angular 2 (Complete Re-Write) (Released in 2016)
- Angular 4
- Angular 5
- Angular 6
- Angular 7
- Angular 9 (New version every 6 months) (Small, incremental, backwards-compatible changes)

### 05) CLI Deep Dive & Troubleshooting
- If the CLI prompts you to answer some questions (some versions do that), you can simply hit ENTER for all questions. This will accept the default settings which are fine for this course.
- If you want to dive deeper into the CLI and learn more about its usage, have a look at its official documentation: https://github.com/angular/angular-cli/wiki
- You encountered issues during the installation of the CLI or setup of a new Angular project?
- A lot of problems are solved by making sure you're using the latest version of NodeJS, npm and the CLI itself.
- Updating NodeJS:
    - Go to nodejs.org and download the latest version - uninstall (all) installed versions on your machine first.
- Updating npm:
    - Run [sudo] npm install -g npm  (sudo  is only required on Mac/ Linux)
- Updating the CLI
    - [sudo] npm uninstall -g angular-cli @angular/cli 
    - npm cache verify 
    - [sudo] npm install -g @angular/cli 
- Here are some common issues & solutions:
- Creation of a new project takes forever (longer than 3 minutes)
    - That happens on Windows from time to time => Try running the command line as administrator
- You get an EADDR error (Address already in use)
    - You might already have another ng serve process running - make sure to quit that or use ng serve --port ANOTHERPORT  to serve your project on a new port
- My changes are not reflected in the browser (App is not compiling)
    - Check if the window running ng serve displays an error. If that's not the case, make sure you're using the latest CLI version and try restarting your CLI

### 06) Project Setup and First App :
- Install Angular CLI : sudo npm install -g @angular/cli@latest
- Create new project : ng new my-first-app --no-strict
- Project name should not be 'test'
- To start the server : cd my-first-app
- And then : ng serve

### 07) Editing the First App : 
- For importing FormsModule in app.module.ts
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

- In app.component.html :
```
<input type="text" [(ngModel)]="name">
<p>{{ name }}</p>
```

### 08) The Course Structure : 
- Getting Started
- The Basics
- Components & Data Binding
- Directives
- Services & Dependency Injection
- Routing
- Observables
- Forms
- Pipes
- Http
- Authentication
- Optimizations & NgModules
- Deployment
- Animation & Testing

### 09) How to get the Most out of the course :
- Watch the Videos
- Do the Assignments
- Do the Course Project
- Ask in Q&A
- Answer in Q&A
- Docs + Google

### 10) What is TypeScript? : 
- More features than vanilla JS (e.g. Types, Classes, Interfaces))
- TypeScript finally compiled to JavaScript by CLI.

### 11) Optional: TypeScript Quick Introduction :

### 12) A Basic Project Setup Using Bootstrap For Styling :
- For installing bootstrap for the project : npm i --save bootstrap@3
- Add following code in angular.json inside build :
```
"styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "src/styles.css"
            ],
```
- You can see the following text just to confirm whether bootstrap is loaded or not.
- You can go to the developers tool and check for styles.css
```
Bootstrap v3.4.1 (https://getbootstrap.com/)
```

### 13) About the Course Code / Code Snapshots:
- Strict mode forces you to write more verbose code in some places (especially when it comes to class properties). 
- If you enabled it by accident, you can also disable it by setting strict: false in your tsconfig.json file.