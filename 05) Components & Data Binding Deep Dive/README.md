### 63) Module Introduction :

### 64) Splitting Apps into Components :
- ng g c cockpit --skip-tests true
- ng g c server-element --skip-tests true
- app.component.html
```
<div class="container">
  <app-cockpit></app-cockpit>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <app-server-element *ngFor="let serverElement of serverElements"></app-server-element>
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
  serverElements = [];
}
```

- cockpit.component.html
```
<div class="row">
  <div class="col-xs-12">
    <p>Add new Servers or blueprints!</p>
    <label>Server Name</label>
    <input type="text" class="form-control" [(ngModel)]="newServerName">
    <label>Server Content</label>
    <input type="text" class="form-control" [(ngModel)]="newServerContent">
    <br>
    <button class="btn btn-primary" (click)="onAddServer()">Add Server</button>
    <button class="btn btn-primary" (click)="onAddBlueprint()">Add Server Blueprint</button>
  </div>
</div>
```

- cockpit.component.ts
```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer() {
    this.serverElements.push({
      type: 'server',
      name: this.newServerName,
      content: this.newServerContent
    });
  }

  onAddBlueprint() {
    this.serverElements.push({
      type: 'blueprint',
      name: this.newServerName,
      content: this.newServerContent
    });
  }
}
```

- server-element.component.html
```
<div class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <p>
      <strong *ngIf="element.type === 'server'" style="color: red">{{ element.content }}</strong>
      <em *ngIf="element.type === 'blueprint'">{{ element.content }}</em>
    </p>
  </div>
</div>
```

### 65) Property & Event Binding Overview :
- Property and event binding can be done on following :
    - HTML elements (Native Properties & Events)
    - Directives (Custom Properties & Events) like ngClass and ngStyle
    - Components (Custom Properties & Events)

### 66) Binding to Custom Properties :
- By default, all properties of components are only accessible inside these components, not from outside.
- @Input() directive is used to expose the property to any parent component, any component hosting our server element component
- app.component.html
```
<div class="container">
  <app-cockpit></app-cockpit>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <app-server-element *ngFor="let serverElement of serverElements" [element]="serverElement"></app-server-element>
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
  serverElements = [{type: 'server', name:'Test Server', content: 'Just a test!'}];
}
```

- cockpit.component.ts
```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer() {
    // this.serverElements.push({
    //   type: 'server',
    //   name: this.newServerName,
    //   content: this.newServerContent
    // });
  }

  onAddBlueprint() {
    // this.serverElements.push({
    //   type: 'blueprint',
    //   name: this.newServerName,
    //   content: this.newServerContent
    // });
  }

}
```

- server-element.component.ts
```
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {
  @Input() element: {type: string, name: string, content: string};

  constructor() { }

  ngOnInit(): void {
  }

}
```

### 67) Assigning an Alias to Custom Properties :
- You can pass alias as a parameter, but now element will not work you have to use alias now for accessing it.
- app.component.html
```
<div class="container">
  <app-cockpit></app-cockpit>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <app-server-element *ngFor="let serverElement of serverElements" [srvElement]="serverElement"></app-server-element>
    </div>
  </div>
</div>
```

- server-element.component.ts
```
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {
  @Input("srvElement") element: {type: string, name: string, content: string};

  constructor() { }

  ngOnInit(): void {
  }

}
```

### 68) Binding to Custom Events :
- EventEmitter is a generic type which is indicated in TypeScript by using this smaller than and greater than sign and in-between you simply define the type of event data you're going to emit.
- It is and object in the Angular framework which allows you to emit your own events.
- It should be imported from @angular/core
- app.component.html
```
<div class="container">
  <app-cockpit (serverCreated)="onServerAdded($event)" (blueprintCreated)="onBlueprintAdded($event)"></app-cockpit>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <app-server-element *ngFor="let serverElement of serverElements" [srvElement]="serverElement"></app-server-element>
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
  serverElements = [{type: 'server', name:'Test Server', content: 'Just a test!'}];

  onServerAdded(serverData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }
}
```

- cockpit.component.ts
```
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output() blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer() {
    this.serverCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent});
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent});
  }

}
```

### 69) Assigning an Alias to Custom Events :
- app.component.html
```
<div class="container">
  <app-cockpit (serverCreated)="onServerAdded($event)" (bpCreated)="onBlueprintAdded($event)"></app-cockpit>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <app-server-element *ngFor="let serverElement of serverElements" [srvElement]="serverElement"></app-server-element>
    </div>
  </div>
</div>
```

- cockpit.component.ts
```
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer() {
    this.serverCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent});
  }

  onAddBlueprint() {
    this.blueprintCreated.emit({serverName: this.newServerName, serverContent: this.newServerContent});
  }

}
```

### 70) Custom Property and Event Binding Summary :

### 71) Understanding View Encapsulation :
- server-element.component.css
```
p {
  color: blue;
}
```
- Paragraphs should have a blue text color but both paragraphs were removed, they are no longer part of our app component here. The first paragraph is part of the cockpit and the second paragraph, that is inside of our server element but isn't that strange? Here on this CSS definition, we just say paragraph, so it should affect all paragraphs in our whole app.
- Now you might say, well no it's in the app.components.css file so clearly it only belongs to this template but is that so clear?
- Because the way CSS works, it doesn't really care in which CSS file you define a rule, it simply is applied to the whole document normally.
- So this actually is a behavior enforced by Angular which is not the default behavior of the browser. So whilst of course this CSS files have the goal of encapsulating styles for the component they belong to, this again is not a default behavior, Angular gives us this behavior and it's a great behavior because with that, we can make sure that whichever styles we define in a CSS file will only get applied to the component they belong to.
- However here of course, this means that now we would have to copy this blue color here to all our other components where we want to use it.
- Now it's interesting if we inspect this text here in the developer tools, you see that if you have a look at the styles, clearly here we assign a blue color but do you see that? 
- The selector changed, before we had just p here, just paragraph, now it's paragraph and then this very strange attribute, _ng-content-ejo-2.
- You can see this attribute here on the paragraph, that is why this style gets applied here because this style definition says make every text blue which is in a paragraph where the paragraph has this attribute, something which is true for the paragraph holding this specific text.
- Now the other paragraph we have in app cockpit here in the div, this paragraph does have a different attribute, _ng-content-ejo-1, down here we have ejo-2.
- That is why the styling gets not applied to this paragraph and all these strange attributes which you can see all over the place here, all these strange attributes are applied to their specific elements by Angular.
- Angular as I told you enforces this style encapsulation and it can't do that magically, so the way it does it is it simply gives the same attribute to all elements in a component. So all elements in this cockpit component have ng-content-ejo-1 attached to it as you can see and it does this for each component with different unique attribute names, ejo-1 and ejo-0 and ejo-2 and with that, it can make sure that once it changed your style selector, it automatically adds this attribute selector to all your styles defined for a component, that these styles get only applied to elements of that component. This is how it enforces this behavior.
- It kind of emulates the shadow DOM, the shadow DOM is a technology not supported by all browsers where each element has its kind of own shadow DOM behind it, where you then could assign styles to each element but as this technology is not supported by all browsers, this is how Angular emulates it and that is the default behavior of view encapsulation in Angular.

### 72) More on View Encapsulation :
- You can add something to the @component decorator, it's called encapsulation, this property and there as a value, you can access ViewEncapsulation which needs to be imported from @angular/core, so make sure to add this import and then you can choose between three modes.
- Emulated is the default, so you don't need to add this, none if you add this would make sure that if we have a look at our component again and we inspect our server element, that now in here, we don't see these strange attributes being added to our elements.
- Therefore, this component now does not use view encapsulation. The other components still will use it, there you still see these attributes but if you now define any styles for this component in the CSS file of this component, they will actually get applied globally and I can demonstrate this by going into this CSS file and if I change the label color and the label is in the cockpit, not in this component, to red, now you will see the label there is overwritten whilst this label of course still has its custom unique attribute, it still is a label in the end and in this server element component, we disable encapsulation.
- So there our selectors aren't changed by Angular, they don't receive their unique selector, therefore they are enforced, they are used application-wide, also affecting other components. Might be the behavior you want, chances are that this is not the case but it's important to know that you can change this behavior.
- Now besides none, you also could choose native and native uses the shadow DOM technology.
- This is called "ShadowDom" instead of "Native" now, the functionality is the same though.
- This should give you the same result as before with emulated but only in browsers which support it which is why for most cases, you want to choose emulated but be aware that you could switch to none or native here too.
- So I will go back to emulated which again you wouldn't have to add, it's the default anyways, with that our labels should no longer be red now.

- server-element.component.ts
```
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Emulated, None or ShadowDom
})
export class ServerElementComponent implements OnInit {
  @Input("srvElement") element: {type: string, name: string, content: string};

  constructor() { }

  ngOnInit(): void {
  }

}
```

- server-element.component.css
```
p {
  color: blue;
}

label {
  color: red;
}
```

### 73) Using Local References in Templates :
- cockpit.component.html
```
<div class="row">
  <div class="col-xs-12">
    <p>Add new Servers or blueprints!</p>
    <label>Server Name</label>
    <input type="text" class="form-control" #serverNameInput>
    <label>Server Content</label>
    <input type="text" class="form-control" [(ngModel)]="newServerContent">
    <br>
    <button class="btn btn-primary" (click)="onAddServer(serverNameInput)">Add Server</button>
    <button class="btn btn-primary" (click)="onAddBlueprint(serverNameInput)">Add Server Blueprint</button>
  </div>
</div>
```

- cockpit.component.ts
```
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({serverName: nameInput.value, serverContent: this.newServerContent});
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({serverName: nameInput.value, serverContent: this.newServerContent});
  }

}
```

### 74) @ViewChild() in Angular 8+ :
- In Angular 8+, the @ViewChild() syntax which you'll see in the next lecture needs to be changed slightly:
- Instead of:
```
@ViewChild('serverContentInput') serverContentInput: ElementRef;
```
- use
```
@ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;
```
- The same change (add { static: true } as a second argument) needs to be applied to ALL usages of @ViewChild() (and also @ContentChild() which you'll learn about later) IF you plan on accessing the selected element inside of ngOnInit().
- If you DON'T access the selected element in ngOnInit (but anywhere else in your component), set static: false instead!
- If you're using Angular 9+, you only need to add { static: true } (if needed) but not { static: false }.

### 75) Getting Access to the Template & DOM with @ViewChild :
- cockpit.component.html
```
<div class="row">
  <div class="col-xs-12">
    <p>Add new Servers or blueprints!</p>
    <label>Server Name</label>
    <input type="text" class="form-control" #serverNameInput>
    <label>Server Content</label>
    <input type="text" class="form-control" #serverContentInput>
    <br>
    <button class="btn btn-primary" (click)="onAddServer(serverNameInput)">Add Server</button>
    <button class="btn btn-primary" (click)="onAddBlueprint(serverNameInput)">Add Server Blueprint</button>
  </div>
</div>
```

- cockpit.component.ts
```
import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>();

  @ViewChild('serverContentInput') serverContentInput: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(nameInput: HTMLInputElement) {
    this.serverCreated.emit({ serverName: nameInput.value, serverContent: this.serverContentInput.nativeElement.value });
  }

  onAddBlueprint(nameInput: HTMLInputElement) {
    this.blueprintCreated.emit({ serverName: nameInput.value, serverContent: this.serverContentInput.nativeElement.value });
  }

}
```

### 76) Projecting Content into Components with ng-content :
- server-element.component.html
```
<div class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <ng-content></ng-content>
  </div>
</div>
```

- app.component.html
```
<div class="container">
  <app-cockpit (serverCreated)="onServerAdded($event)" (bpCreated)="onBlueprintAdded($event)"></app-cockpit>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <app-server-element *ngFor="let serverElement of serverElements" [srvElement]="serverElement">
        <p>
          <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
          <em *ngIf="serverElement.type === 'blueprint'">{{ serverElement.content }}</em>
        </p>
      </app-server-element>
    </div>
  </div>
</div>
```

- Everything you place between the opening and closing tag of your own component is lost by default, is simply removed from the DOM, Angular will not take care about it but you can change this.
- There is a special directive and it is a directive, even though it looks like a component but it doesn't have its own template, a special directive you can add in the server-element components template here, in the place where I want to render the content, I can add ng-content, opening and closing again.
- It still is a directive, just using this element like selector and this serves as a hook you can place in your component to mark the place for Angular where it should add any content it finds between the opening and closing tag here, so this content in this case. 
- Now we add this via the ng-content hook, we add it between the opening and closing tags and therefore it will be projected into your component, projected into your server element component.
- A nice feature, especially if you think about building re-usable widgets, like a tab widget where each tab will have a content which probably comes from some other source and which you don't want to pass through property binding which always would be an alternative but if it's more complex HTML code, property binding really is not the best solution because Angular will escape HTML tags there to prevent cross-site scripting attacks from happening and you could kind of work around that but really, ng-content then is how you want to display this and that is a great tool to have at your disposal.

### 77) Understanding the Component Lifecycle :
- Lifecycle :
- ngOnChanges : Called after a bound input property changes
- ngOnInit : Called once the component is initialized
- ngDoCheck : Called during every change detection run
- ngAfterContentInit : Called after content (ng-content) has been projected into view
- ngAfterContentChecked : Called every time the projected content has been checked
- ngAfterViewInit : Called after the component's view (and child views) has been initialized
- ngAfterViewChecked : Called every time the view (and child views) has been checked
- ngOnDestroy : Called once the component is about to be destroyed

- If a new component is created in Angular and of course Angular is responsible for creating these components when it finds one of our selectors for example, it will instantiate a new version of that component and add it into the DOM.
- So once a new component is instantiated, Angular goes through a couple of different phases in this creation process and it will actually give us a chance to hook into these phases and execute some code.
- We can hook into these phases by implementing some methods Angular will call if they are present.
- The first phase, the first hook we can hook into is ngOnChanges and this may actually be executed multiple times, it's executed right at the start when a new component is created but thereafter, it's also always called whenever one of our bound input properties changes and with that, I mean properties decorated with @input, so whenever these properties received new values.
- Now the second hook is ngOnInit, this method gets executed once the component has been initialized. This does not mean that we can see it,it has not been added to the DOM yet so to say, it has not been displayed yet but Angular finished the basic initialization, our properties can now be accessed and initialized for example, so the object was created you could say and if you're interested, ngOnInit will run after the constructor.
- Then we have ngDoCheck, that will also run multiple times, actually this method will be executed a lot because this will run whenever change detection runs. Now change detection simply is the system by which Angular determines whether something changed on the template of a component or inside of a component I should say, so whether it needs to change something in the template. So whether some property value changed from 1 to 2 let's say and that property is output in the template, well of course Angular needs to re-render that part of the template and ngDoCheck is a hook executed on every check Angular makes. Now important, on every check, so not just if something changed, a lot of times ngDoCheck will run because you clicked some button which doesn't change anything but still it's an event and on events, Angular has to check if something changed because how else would it know?
- You don't tell it, right, so it has to check on certain triggering events like you clicked somewhere or a timer fired or an observable was resolved and on these occasions, it will check your code and ngDoCheck will be executed.
- Now whilst this might sound very inefficient, Angular does this in a very efficient way, so change detection on Angular works pretty great and doesn't cost a lot of performance.
- ngDoCheck is a great method to use if you want to do something on every change detection cycle, like maybe manually inform Angular about some change it would not be able to detect otherwise, though that is a very advanced use case.
- Well then, we reach ngAfterContentInit, this is called whenever the content which is projected via ng-content has been initialized. So not the view of the component itself but instead you could say the view of the parent component, especially the part which will get added to our component through ng-content.
- And ngAfterContentCheck is executed whenever change detection checked this content we're projecting into our component.
- ngAfterViewInit is then reached once the view of our own component has been finished initializing, so once our view has been rendered you could say.
- And the same, ngAfterViewChecked, well that is called whenever our view has been checked, so once we are sure that either all changes which had to be done were displayed in the view or no changes were detected by Angular.
- And finally, if you destroy a component, for example if you placed ngIf on it and this gets then set to false and therefore it removes it from the DOM, ngOnDestroy is called and here's a great place to do some clean up work because this is called right before the object itself will be destroyed by Angular.

### 78) Seeing Lifecycle Hooks in Action :
- app.component.html
```
<div class="container">
  <app-cockpit (serverCreated)="onServerAdded($event)" (bpCreated)="onBlueprintAdded($event)"></app-cockpit>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <button class="btn btn-primary" (click)="onChangeFirst()">Change First Element</button>
      <button class="btn btn-danger" (click)="onDestroyFirst()">Destroy First Element</button>
      <app-server-element *ngFor="let serverElement of serverElements" [srvElement]="serverElement"
        [name]="serverElement.name">
        <p>
          <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
          <em *ngIf="serverElement.type === 'blueprint'">{{ serverElement.content }}</em>
        </p>
      </app-server-element>
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
  serverElements = [{ type: 'server', name: 'Test Server', content: 'Just a test!' }];

  onServerAdded(serverData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }

  onChangeFirst() {
    this.serverElements[0].name = 'Changed!';
  }

  onDestroyFirst() {
    this.serverElements.splice(0, 1);
  }
}
```

- server-element.component.html
```
<div class="panel panel-default">
  <div class="panel-heading">{{ name }}</div>
  <div class="panel-body">
    <ng-content></ng-content>
  </div>
</div>
```

- server-element.component.ts
```
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Emulated, None or ShadowDom
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input("srvElement") element: { type: string, name: string, content: string };
  @Input() name: string;

  constructor() {
    console.log("constructor called!");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges called!");
    console.log(changes);
  }

  ngOnInit(): void {
    console.log("ngOnInit called!");
  }

  ngDoCheck(): void {
    console.log("ngDoCheck called!");
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit called!");
  }

  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked called!");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called!");
  }

  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked called!");
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy called!");
  }
}
```

### 79) Lifecycle Hooks and Template Access :
- If you get heading in undefined declared it with {static: true} as below :
```
  @ViewChild('heading', {static: true}) header: ElementRef;
```
- server-element.component.html
```
<div class="panel panel-default">
  <div class="panel-heading" #heading>{{ name }}</div>
  <div class="panel-body">
    <ng-content></ng-content>
  </div>
</div>
```

- server-element.component.ts
```
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Emulated, None or ShadowDom
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input("srvElement") element: { type: string, name: string, content: string };
  @Input() name: string;
  @ViewChild('heading', { static: true }) header: ElementRef;

  constructor() {
    console.log("constructor called!");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges called!");
    console.log(changes);
  }

  ngOnInit(): void {
    console.log("ngOnInit called!");
    console.log('Text Content : ' + this.header.nativeElement.textContent);
  }

  ngDoCheck(): void {
    console.log("ngDoCheck called!");
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit called!");
  }

  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked called!");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called!");
    console.log('Text Content : ' + this.header.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked called!");
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy called!");
  }
}
```

### 80) @ContentChild in Angular 8+ :
- For ContentChild, the same adjustments as for ViewChild apply: https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/14865241

### 81) Getting Access to ng-content with @ContentChid:
- app.component.html
```
<div class="container">
  <app-cockpit (serverCreated)="onServerAdded($event)" (bpCreated)="onBlueprintAdded($event)"></app-cockpit>
  <hr>
  <div class="row">
    <div class="col-xs-12">
      <button class="btn btn-primary" (click)="onChangeFirst()">Change First Element</button>
      <button class="btn btn-danger" (click)="onDestroyFirst()">Destroy First Element</button>
      <app-server-element *ngFor="let serverElement of serverElements" [srvElement]="serverElement"
        [name]="serverElement.name">
        <p #contentParagraph>
          <strong *ngIf="serverElement.type === 'server'" style="color: red">{{ serverElement.content }}</strong>
          <em *ngIf="serverElement.type === 'blueprint'">{{ serverElement.content }}</em>
        </p>
      </app-server-element>
    </div>
  </div>
</div>
```

- server-element.component.ts
```
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated // Emulated, None or ShadowDom
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input("srvElement") element: { type: string, name: string, content: string };
  @Input() name: string;
  @ViewChild('heading', { static: true }) header: ElementRef;
  @ContentChild('contentParagraph', { static: true }) paragraph: ElementRef;

  constructor() {
    console.log("constructor called!");
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges called!");
    console.log(changes);
  }

  ngOnInit(): void {
    console.log("ngOnInit called!");
    console.log('Text Content : ' + this.header.nativeElement.textContent);
    console.log('Text Content of paragraph : ' + this.paragraph.nativeElement.textContent);
  }

  ngDoCheck(): void {
    console.log("ngDoCheck called!");
  }

  ngAfterContentInit(): void {
    console.log("ngAfterContentInit called!");
    console.log('Text Content of paragraph : ' + this.paragraph.nativeElement.textContent);
  }

  ngAfterContentChecked(): void {
    console.log("ngAfterContentChecked called!");
  }

  ngAfterViewInit(): void {
    console.log("ngAfterViewInit called!");
    console.log('Text Content : ' + this.header.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log("ngAfterViewChecked called!");
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy called!");
  }
}
```

### 82) Wrap Up :

### Assignment 4: Practicing Property & Event Binding and View Encapsulation :
- Create three new components: GameControl, Odd and Even
- The GameControl Component should have buttons to start and stop the game
- When starting the game, and event (holding a incrementing number) should get emitted each second (ref = setInterval())
- The event should be listenable from outside the component
- When stopping the game, no more events should get emitted(clearInterval(ref))
- A new Odd component should get created for every odd number emitted, the same should happen for the Even Component (on even numbers)
- Simply output Odd - NUMBER or Even - NUMBER in the two components
- Style the element (e.g. paragraph) holding your output text differently in both components

- ng new assignment-four --no-strict
- cd assignment-four
- npm i bootstrap@3 --save

- ng g c GameControl --skip-tests true
- ng g c Odd --skip-tests true
- ng g c Even --skip-tests true

- game-control.component.html
```
<button class="btn btn-success" (click)="onStartGame()">Start Game</button>
<button class="btn btn-danger"(click)="onPauseGame()">Pause Game</button>
```

- game-control.component.ts
```
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() intervalFired = new EventEmitter<number>();
  interval;
  lastNumber = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onStartGame() {
    this.interval = setInterval(() => {
      this.intervalFired.emit(this.lastNumber + 1);
      this.lastNumber++;
    }, 1000);
  }

  onPauseGame(){
    clearInterval(this.interval);
  }
}
```

- odd.component.css
```
p {
  color: blue;
}
```

- odd.component.html
```
<p>Odd - {{ number }}</p>
```

- odd.component.ts
```
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.css']
})
export class OddComponent implements OnInit {
  @Input() number: number;
  constructor() { }

  ngOnInit(): void {
  }

}
```

- even.component.css
```
p {
  color: green;
}
```

- even.component.html
```
<p>Even - {{ number }}</p>
```

- even.component.ts
```
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.css']
})
export class EvenComponent implements OnInit {
  @Input() number: number;
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
      <hr>
      <app-game-control (intervalFired)="onIntervalFired($event)"></app-game-control>
    </div>
  </div>
  <div class="row">
    <div class="col-xs-12">
      <hr>
      <app-odd *ngFor="let oddNumber of oddNumbers" [number]="oddNumber"></app-odd>
      <app-even *ngFor="let evenNumber of evenNumbers" [number]="evenNumber"></app-even>
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
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onIntervalFired(firedNumber: number) {
    if (firedNumber % 2 === 0) {
      this.evenNumbers.push(firedNumber);
    }
    else {
      this.oddNumbers.push(firedNumber);
    }
  }

}
```

### 83) Assignment Solution :
