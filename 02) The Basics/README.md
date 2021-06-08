14) Module Introduction :

15) How an angular app gets loaded and started : 
- index.html is the single page served by the application.
```
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>MyFirstApp</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
<body>
  <app-root></app-root>
</body>
</html>
```
- Here selector in app.component.ts and tag name 'app-root' index.html can be found same 
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
```

- The file which gets executed first is main.ts file.
```
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```
- The flow is main.ts -> app.module.ts -> app.component.ts

16) Components are important :

17) Creating a new component : 
- We can add a new component by creating a subfolder of app folder and then their corresponding component html and ts files inside of it.
- Decorators are a TypeScript feature which allows you to enhance your classes for example, enhance elements. Here @Component is a Decorator.
- We can import Component using 
- import { Component } from '@angular/core';
- selector is the HTML tag by which you're able to use this component later in your other component templates.
- It should be unique and should not accidentally overwrite a default HTML element. 
- templateUrl tells us about the html of that component.
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})
export class ServerComponent {

}
```

18) Understanding the role of AppModule and Component Declaration :
- @NgModule decorator contains four thing : declarations, imports, providers and bootstrap.
- bootstrap is responsible for telling Angular which component should you be aware of at the point of time the whole application starts, which component would you basically recognize in the index.html file here that component is app component.
- app.module.ts while importing server.component don't append .ts
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent
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

19) Using Custom Components :
- You can use emmet plugin for typing html faster.
- app.component.html
```
<h3>I'm in the AppComponent!</h3>
<hr>
<app-server></app-server>
```

20) Creating Components with the CLI & Nesting Components :
- Open new terminal keeping the ng server running, run the following command 
- ng generate component servers
- ng g c servers
- Both commands are same
- servers.component.spec.ts file is used for testing.

21) Working with Component Templates :
- In servers.component.ts we can either use template or templateUrl in Component decorator.
- In template we can directly write the html here and in templateUrl we can give the path to html file.
- But one of them is necessary.
- This is known as inline template.
- servers.component.ts
```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  template: '<app-server></app-server><app-server></app-server>',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
```
- You can write multiline html as well using backtick ` (Used for multiline string)
```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  template:`
  <app-server></app-server>
  <app-server></app-server>`,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
```

22) Working with Component Styles :
- styleUrls holds an array so multiple css file can be added.
- styles can also be used to write inline styles.
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css']
  styles: [`
  h3 {
    color: dodgerblue;
  }
  `]
})
export class AppComponent {

}
```

23) Fully Understanding the Component Selector : 
- Selector has to be unique, so that we don't overwrite accidentally an already existing element or may be a component made available by another third-party package we use in our project.
- Right now, our selector is same selector as we use it in CSS for selecting an element, so we have app-servers here as an element and this is recognized by Angular because the selector we chose is app servers and this basically just looks how we select elements in CSS.
- So that actually works like a CSS selector and therefore, we are not limited to selecting by element.
- We can put this into square brackets to use the attribute selector.
- We can put . to use the class selector.
- Selecting by ID will not work it is not supported by Angular and all pseudo-selectors like hover will not work as well.
- servers.component.ts
```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  // selector: '[app-servers]',
  // selector: '.app-servers',
  template:`
  <app-server></app-server>
  <app-server></app-server>`,
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
```

- app.component.html
```
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <h3>I'm in the AppComponent!</h3>
      <hr>
      <app-servers></app-servers>
      <!-- <div app-servers></div>
      <div class="app-servers"></div> -->
    </div>
  </div>
</div>
```

- Assignment 1 : Practicing Components :
  - Create two new Components (manually or with CLI): WarningAlert and SuccessAlert
  - Output them beneath each other in the AppComponent
  - Output a warning or success message in the Components
  - Style the Components appropriately (maybe some red/ green text?)
     
  - Use external or internal templates and styles!
  - Feel free to create more components, nest them into each other or play around with different types of selectors!

- Create project 
- ng new basics-assignment-one --no-strict
- Add WarningAlert And SuccessAlert Components
- ng generate component WarningAlert
- ng generate component SuccessAlert
- Refer basics-assignment-one

24) Assignment Solution : 

25) What is Data Binding ? :
- Data Binding = Communication
- Data Binding is communication between you TypeScript code (Business Logic) and Template (HTML).
- Output Data can be done in two ways :
  - String Interpolation : {{ data }}
  - Property Binding : [property]="data"
- React to (Users) Events :
  - Event Binding (event)="expression"
- Combination of Both : Two Way Binding :
  - [(ngModel)]="data"

26) String Interpolation : 
- You can explicitly add :string or :number to specify the type.
- server.component.ts
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})
export class ServerComponent {
  serverId: number = 10;
  serverStatus: string = 'offline';

  getServerStatus() {
    return this.serverStatus;
  }
}
```

- Any expression which can be resolved to a string in the end, that's the only condition for a string interpolation syntax here.
- So whatever we have between the curly braces, in the end it somehow has to return a string, so we can call a method her which returns a string in the end.
- The only restriction is we can't write multiline expression here, we can't write block expression here, so we can't add an if or for control structure in here.
- We can use a ternary expression here.
- Here serverID is a number but it can be easily converted to string that is why string interpolation will work just fine here.
- server.component.html
```
<p>{{ 'Server' }} with ID {{ serverId }} is {{ getServerStatus() }}</p>
```

27) Property Binding :
- ES6 arrow function :
- () => {}
- Square brackets indicate to Angular that we're using property binding, that we want to dynamically bind some property and disable the HTML attribute, in the end in normal HTML, only sets a specific property on the underlying DOM element.
- Each HTML element is parsed by the browser and translated into an element on the document object model (DOM), and therefore we have an element in this DOM and this element has a couple of properties. A lot of these can't even be set through attributes on the HTML element. One of the properties is the disabled property and you can set it through the disabled attribute but here we're not using the disabled attribute anymore, with the square brackets, we are directly binding to this native disabled property this HTML element has.
- servers.component.ts
```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  // selector: '[app-servers]',
  // selector: '.app-servers',
  templateUrl:'./servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;

  constructor() {
    setTimeout(()=> {
      this.allowNewServer = true;
    },2000);
  }

  ngOnInit(): void {
  }

}
```

- servers.component.html
```
<button class="btn btn-primary" [disabled]="!allowNewServer">Add Server</button>
<app-server></app-server>
<app-server></app-server>
```

28) Property Binding vs String Interpolation :
- String interpolation using property binding :
  - <p [innerText]="allowNewServer"></p>
- Don't mix string interpolation and property binding like [innerText]="{{ allowNewServer }}"
- String interpolation works only in a normal template, not within another expression of that template, not within a property binding.
- servers.component.html
```
<button class="btn btn-primary" [disabled]="!allowNewServer">Add Server</button>
<p>{{ allowNewServer }}</p>
<p [innerText]="allowNewServer"></p>
<app-server></app-server>
<app-server></app-server>
```

29) Event Binding : 
