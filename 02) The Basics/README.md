### 14) Module Introduction :

### 15) How an angular app gets loaded and started : 
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

### 16) Components are important :

### 17) Creating a new component : 
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

### 18) Understanding the role of AppModule and Component Declaration :
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

### 19) Using Custom Components :
- You can use emmet plugin for typing html faster.
- app.component.html
```
<h3>I'm in the AppComponent!</h3>
<hr>
<app-server></app-server>
```

### 20) Creating Components with the CLI & Nesting Components :
- Open new terminal keeping the ng server running, run the following command 
- ng generate component servers
- ng g c servers
- Both commands are same
- servers.component.spec.ts file is used for testing.

### 21) Working with Component Templates :
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

### 22) Working with Component Styles :
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

### 23) Fully Understanding the Component Selector : 
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

### - Assignment 1 : Practicing Components :
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

### 24) Assignment Solution : 

### 25) What is Data Binding ? :
- Data Binding = Communication
- Data Binding is communication between you TypeScript code (Business Logic) and Template (HTML).
- Output Data can be done in two ways :
  - String Interpolation : {{ data }}
  - Property Binding : [property]="data"
- React to (Users) Events :
  - Event Binding (event)="expression"
- Combination of Both : Two Way Binding :
  - [(ngModel)]="data"

### 26) String Interpolation : 
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

### 27) Property Binding :
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

### 28) Property Binding vs String Interpolation :
- String interpolation using property binding :
```<p [innerText]="allowNewServer"></p>```
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

### 29) Event Binding : 
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
  serverCreationStatus = 'No server was created!';

  constructor() {
    setTimeout(()=> {
      this.allowNewServer = true;
    },2000);
  }

  ngOnInit(): void {
  }

  onCreateServer(){
    this.serverCreationStatus = 'Server was created!'
  }

}
```

- servers.component.html
```
<button class="btn btn-primary" [disabled]="!allowNewServer" (click)="onCreateServer()">Add Server</button>
<p>{{ serverCreationStatus }}</p>
<app-server></app-server>
<app-server></app-server>
```

### 30) Bindable Properties And Events :
- How do you know to which Properties or Events of HTML Elements you may bind? You can basically bind to all Properties and Events - a good idea is to console.log()  the element you're interested in to see which properties and events it offers.
- Important: For events, you don't bind to onclick but only to click (=> (click)).
- The MDN (Mozilla Developer Network) offers nice lists of all properties and events of the element you're interested in. Googling for YOUR_ELEMENT properties  or YOUR_ELEMENT events  should yield nice results.

### 31) Passing And Using Data With Event Binding : 
- (input)="onUpdateServerName()" will be fired on every keystroke.
- $event is reserved variable name we can use in the template when using event binding.
- For this event, so only between these quotation marks here, $event will simply be the data emitted with that event.
- this.serverName = event.target.value;
- target is of type input element, it will give an error. We can explicitly inform it about the type in TypeScript by adding HTML input element in front of it. We do this explicit casting with the opening and closing tag, with smaller and greater than sign and the type in-between.
- this.serverName = (<HTMLInputElement>event.target).value;
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
  serverCreationStatus = 'No server was created!';
  serverName = '';

  constructor() {
    setTimeout(()=> {
      this.allowNewServer = true;
    },2000);
  }

  ngOnInit(): void {
  }

  onCreateServer(){
    this.serverCreationStatus = 'Server was created!'
  }

  onUpdateServerName(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
```

- servers.component.html
```
<label>Server Name</label>
<input type="text" class="form-control" (input)="onUpdateServerName($event)">
<p>{{ serverName }}</p>
<button class="btn btn-primary" [disabled]="!allowNewServer" (click)="onCreateServer()">Add Server</button>
<p>{{ serverCreationStatus }}</p>
<app-server></app-server>
<app-server></app-server>
```

### 32) Important: FormsModule is Required for Two-Way-Binding! :
- Important: For Two-Way-Binding (covered in the next lecture) to work, you need to enable the ngModel  directive. This is done by adding the FormsModule  to the imports[]  array in the AppModule.
- You then also need to add the import from @angular/forms  in the app.module.ts file:
- import { FormsModule } from '@angular/forms'; 
- app.module.ts
```
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServersComponent
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

### 33) Two Way Data Binding : 
```<input type="text" class="form-control" [(ngModel)]="serverName">```
- This set up will do the following, it will trigger on the input event and update the value of serverName in our component automatically.
- On the other hand, since it is two-way binding, it will also update the value of the input element if we change server name somewhere else.
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
  serverCreationStatus = 'No server was created!';
  serverName = 'Test Server';

  constructor() {
    setTimeout(()=> {
      this.allowNewServer = true;
    },2000);
  }

  ngOnInit(): void {
  }

  onCreateServer(){
    this.serverCreationStatus = 'Server was created!'
  }

  onUpdateServerName(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
```

- servers.component.html
```
<label>Server Name</label>
<input type="text" class="form-control" [(ngModel)]="serverName">
<p>{{ serverName }}</p>
<button class="btn btn-primary" [disabled]="!allowNewServer" (click)="onCreateServer()">Add Server</button>
<p>{{ serverCreationStatus }}</p>
<app-server></app-server>
<app-server></app-server>
```

### 34) Combining all forms of data binding : 
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
  serverCreationStatus = 'No server was created!';
  serverName = 'Test Server';

  constructor() {
    setTimeout(()=> {
      this.allowNewServer = true;
    },2000);
  }

  ngOnInit(): void {
  }

  onCreateServer(){
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
  }

  onUpdateServerName(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
```

- servers.component.html
```
<label>Server Name</label>
<input type="text" class="form-control" [(ngModel)]="serverName">
<button class="btn btn-primary" [disabled]="!allowNewServer" (click)="onCreateServer()">Add Server</button>
<p>{{ serverCreationStatus }}</p>
<app-server></app-server>
<app-server></app-server>
```

### - Assignment 2 : Practicing Data Binding : 
- Add a input field which updates a property ("username") via Two Way Binding
- Output the username properly via String Interpolation (in a paragraph below the input)
- Add a button which may only be clicked if the username is NOT an empty string
- Upon clicking the button, the username should be reset to an empty string
- app.component.html
```
<input type="text" class="form-control" [(ngModel)]="username" (input)="onUpdateUserName($event)">
<p>Username : {{ username }}</p>
<button class="btn btn-primary" [disabled]="emptyString" (click)="onClickResetUsername()">Reset Username</button>
```
- app.component.ts
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username= 'Test User';
  emptyString = false;

  onUpdateUserName(event: Event){
    if (this.username==""){
      this.emptyString = true;
    }
    else{
      this.emptyString = false;
    }
  }

  onClickResetUsername(){
    this.username = ""
    this.emptyString = true
  }
}

```

- Their solution :
- app.component.ts
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username= '';
}
```

- app.component.html
```
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <hr>
      <label>Username</label>
      <input type="text" class="form-control" [(ngModel)]="username">
      <p>Username : {{ username }}</p>
      <button class="btn btn-primary" [disabled]="username === ''" (click)="username = ''">Reset Username</button>
    </div>
  </div>
</div>
```

### 35) Assignment Solution :

### 36) Understanding Directives :
- Directives are instructions in the DOM, components are kind of such instructions in the DOM. Once we place the selector of our component somewhere in our templates, at this point of time we're instructing Angular to add the content of our component template and the business logic in our TypeScript code in this place where we use the selector.
- This was our instruction, Angular please add our component in this place and indeed components are directives with a template, there are also directives without a template.
- So an example would be the appTurnGreen directive which would be as custom directive we could build.
```
<p appTurnGreen>Receives a green background!</p>
```
- We typically add directives with and attribute selector but technically the selector of a directive can be configured just like the selector of a component, so you could also use CSS classes or the element style but again typically use the attribute style and on this paragraph, this directive might simply color the text green you could say. So Angular would find this instruction, here we would have defined our directive with the directive decorator to inform Angular that this class holds a directive and there, we might have the logic to turn this green.
```
@Directive({
  selector: '[appTurnGreen]'
})
export class TurnGreenDirective{

}
```

### 37) Using ngIf to Output Data Conditionally :
- Directives are added by using an attribute selector and pretty much all the built-in directives use that selector, nfIf does.
- ngIf is added by adding a star. The star is required because ngIf is a structural directive which means it changes the structure of our DOM, it either adds this element or it doesn't add it.
- But the important thing is it's really added or removed to or from the DOM, it's not there all the time, it's not hidden, it's just not there.
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
  serverCreationStatus = 'No server was created!';
  serverName = 'Test Server';
  serverCreated = false;

  constructor() {
    setTimeout(()=> {
      this.allowNewServer = true;
    },2000);
  }

  ngOnInit(): void {
  }

  onCreateServer(){
    this.serverCreated = true;
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
  }

  onUpdateServerName(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
```

- servers.component.html
```
<label>Server Name</label>
<input type="text" class="form-control" [(ngModel)]="serverName">
<button class="btn btn-primary" [disabled]="!allowNewServer" (click)="onCreateServer()">Add Server</button>
<p *ngIf="serverCreated">Server was created, server name is {{ serverName }}</p>
<app-server></app-server>
<app-server></app-server>
```

### 38) Enhancing ngIf with an Else Condition :
- We can achieve this by placing a local reference on this element (here noServer)
- ng-template is a component, that directive shipping with Angular which you can use to mark places in the DOM
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

  constructor(){
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getServerStatus() {
    return this.serverStatus;
  }

  getColor(){
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
}
```

- servers.component.html
```
<label>Server Name</label>
<input type="text" class="form-control" [(ngModel)]="serverName">
<button class="btn btn-primary" [disabled]="!allowNewServer" (click)="onCreateServer()">Add Server</button>
<p *ngIf="serverCreated; else noServer">Server was created, server name is {{ serverName }}</p>
<ng-template #noServer>
  <p>No server was created!</p>
</ng-template>
<app-server></app-server>
<app-server></app-server>
```

### 39) Styling Elements Dynamically with ngStyle :
- ngIf is a structural directive, the other type of directives are attribute directives which are called like this because they really just look like normal HTML attributes without a star basically.
- Unlike structural directives, attribute directives don't add or remove elements. They only change the element they were placed on.
- ngStyle is built-in directive, you can recognize this on the ng at the beginning and ngStyle, that's the directive, here we will use property binding on this directive and it's super important to understand that the square brackets here are not part of the directive name, the directive name is just ngStyle, the square brackets indicate that we want to bind to some property on this directive and this property name happens to also be ngStyle.
- This ngStyle property expects to get a Javascript object and here, we define key-value pairs of the style name as the key and the value of the style as the value.
- ngStyle is an attribute directive that updates styles for the containing HTML element at runtime.
- server.component.html
```
<p [ngStyle]="{backgroundColor: getColor()}">{{ 'Server' }} with ID {{ serverId }} is {{ getServerStatus() }}</p>
```

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

  constructor(){
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getServerStatus() {
    return this.serverStatus;
  }

  getColor(){
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
}
```

### 40) Applying CSS classes dynamically with ngClass :
- ngClass allows us to dynamically add or remove CSS classes.
- This is a directive and only works as intended when using property binding. (Wrapping in square brackets)
- We have to pass JavaScript object to ngClass.
- Here also we are having key value pair. The keys are the CSS classnames and the values are the conditions determining whether this class should be attached or not.
- server.component.ts
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [`
    .online{
      color: white;
    }
  `]
})
export class ServerComponent {
  serverId: number = 10;
  serverStatus: string = 'offline';

  constructor(){
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  getServerStatus() {
    return this.serverStatus;
  }

  getColor(){
    return this.serverStatus === 'online' ? 'green' : 'red';
  }
}
```
- server.component.html
```
<p [ngStyle]="{backgroundColor: getColor()}" [ngClass]="{online: serverStatus === 'online'}">{{ 'Server' }} with ID {{ serverId }} is {{ getServerStatus() }}</p>
```

### 41) Outputting List with ngFor :
- ngFor is also a structural directive which changes the DOM itself.
- In this we define a temporary variable inside the loop with let, give it any name you like server and then of servers. Servers here is the property we defined in the TypeScript file and this will now loop through all elements in this array and assign the individual element to this dynamic server variable.
- servers.component.html
```
<label>Server Name</label>
<input type="text" class="form-control" [(ngModel)]="serverName">
<button class="btn btn-primary" [disabled]="!allowNewServer" (click)="onCreateServer()">Add Server</button>
<p *ngIf="serverCreated; else noServer">Server was created, server name is {{ serverName }}</p>
<ng-template #noServer>
  <p>No server was created!</p>
</ng-template>
<app-server *ngFor="let server of servers"></app-server>
```
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
  serverCreationStatus = 'No server was created!';
  serverName = 'Test Server';
  serverCreated = false;
  servers = ['Test Server', 'Test Server 2'];

  constructor() {
    setTimeout(()=> {
      this.allowNewServer = true;
    },2000);
  }

  ngOnInit(): void {
  }

  onCreateServer(){
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = 'Server was created! Name is ' + this.serverName;
  }

  onUpdateServerName(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
```

### Assignment 3 : Practicing Directives :
- Add a button which says 'Display Details'
- Add a paragraph with any content of your choice (e.g. 'Secret Password = tuna')
- Toggle the displaying of that paragraph with the button created in the first step
- Log all button clicks in an array and output that array below the secret paragraph (maybe log a timestamp or simply an incrementing number)
- Starting at the 5th log item, give all future log items a blue background (via ngStyle) and white color (ngClass)

- Create new project : ng new practicing-directives --no-strict
- Type no to routing
- Select CSS by pressing Enter
- cd practicing-directives
- Install bootstrap : npm i bootstrap@3 --save
- Add following code in angular.json inside build :
```
"styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "src/styles.css"
            ],
```
- Delete following from app.component.ts
```
title = 'practicing-directives';
```

- Clean app.component.html
- Import FormsModule in app.module.ts
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

- Add following code in app.component.html
```
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <hr>

    </div>
  </div>
</div>
```

- To run the application : ng serve

- app.component.css
```
.logAfter5{
  color: white
}
```

- app.component.html
```
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <hr>
      <button class="btn btn-primary" (click)="onDisplayDetailsButtonClick()">Display Details</button>
      <p *ngIf="displayDetails">Secret Password = tuna</p>
      <p *ngFor="let log of displayDetailsButtonClickLog" [ngStyle]="{backgroundColor: getColor(log[0])}" [ngClass]="{logAfter5: log[0] >= 5}">{{ log[0] }} : {{ log[1] }}</p>
    </div>
  </div>
</div>
```

- app.component.ts
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayDetails = false;
  displayDetailsButtonClickLog = [];
  displayDetailsButtonClickCount = 0;

  getTime() {
    var currentTime = new Date();
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
    // ISTTime now represents the time in IST coordinates
    var hoursIST = ISTTime.getHours();
    var minutesIST = ISTTime.getMinutes();
    var secondsIST = ISTTime.getSeconds();
    return hoursIST + ":" + minutesIST + ":" + secondsIST;
  }

  getColor(count: number){
    if(count>=5){
      return 'blue';
    }
    else{
      return 'white';
    }
  }

  onDisplayDetailsButtonClick() {
    this.displayDetails = !this.displayDetails;
    this.displayDetailsButtonClickLog.push([++this.displayDetailsButtonClickCount, this.getTime()])
  }
}
```

### 42) Assignment Solution :
- app.component.css
```
.logAfter5{
  color: white
}
```

- app.component.html
```
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <hr>
      <button class="btn btn-primary" (click)="onDisplayDetailsButtonClick()">Display Details</button>
      <p *ngIf="displayDetails">Secret Password = tuna</p>
      <div *ngFor="let log of displayDetailsButtonClickLog" [ngStyle]="{backgroundColor: log[0] >= 5 ? 'blue' : 'transparent'}" [ngClass]="{logAfter5: log[0] >= 5}">{{ log[0] }} : {{ log[1] }}</div>
    </div>
  </div>
</div>
```

- app.component.ts
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayDetails = false;
  displayDetailsButtonClickLog = [];

  getTime() {
    var currentTime = new Date();
    var currentOffset = currentTime.getTimezoneOffset();
    var ISTOffset = 330;   // IST offset UTC +5:30
    var ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);
    // ISTTime now represents the time in IST coordinates
    var hoursIST = ISTTime.getHours();
    var minutesIST = ISTTime.getMinutes();
    var secondsIST = ISTTime.getSeconds();
    return hoursIST + ":" + minutesIST + ":" + secondsIST;
  }

  onDisplayDetailsButtonClick() {
    this.displayDetails = !this.displayDetails;
    this.displayDetailsButtonClickLog.push([this.displayDetailsButtonClickLog.length+1, this.getTime()])
  }
}
```

### 43) Getting the index when using ngFor :
- Equal to index ( = index) is kind of reserved expression that gives access to the index of the current iteration.
- index starts at 0.
- app.component.ts
```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayDetails = false;
  displayDetailsButtonClickLog = [];

  onDisplayDetailsButtonClick() {
    this.displayDetails = !this.displayDetails;
    this.displayDetailsButtonClickLog.push(new Date());
  }
}
```

- app.component.html
```
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <hr>
      <button class="btn btn-primary" (click)="onDisplayDetailsButtonClick()">Display Details</button>
      <p *ngIf="displayDetails">Secret Password = tuna</p>
      <div *ngFor="let log of displayDetailsButtonClickLog; let i = index" [ngStyle]="{backgroundColor: i > 5 ? 'blue' : 'transparent'}" [ngClass]="{logAfter5: i > 5}">{{ log }}</div>
    </div>
  </div>
</div>
```