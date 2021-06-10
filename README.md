### What you'll learn
- Develop modern, complex, responsive and scalable web applications with Angular 12
- Fully understand the architecture behind an Angular application and how to use it
- Use the gained, deep understanding of the Angular fundamentals to quickly establish yourself as a frontend developer
- Create single-page applications with one of the most modern JavaScript frameworks out there

### Steps to create new angular project :
- Create new project : ng new project --no-strict
- Type no to routing
- Select CSS by pressing Enter
- cd project
- Install bootstrap : npm i bootstrap@3 --save
- Verify whether it is present in package.json
- Add following code in angular.json inside build :
```
"styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "src/styles.css"
            ],
```
- Delete following from app.component.ts
```
title = 'project';
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
- Hit localhost:4200 in the browser
- Check for bootstrap in styles.css file under source in developer tools.