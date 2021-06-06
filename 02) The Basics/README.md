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