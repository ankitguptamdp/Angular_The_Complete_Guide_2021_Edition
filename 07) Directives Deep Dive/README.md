### 90) Module Introduction :
- Attribute Directives :
    - Look like a normal HTML Attribute (possibly with data binding or event binding)
    - Only affect/ change the element they are added to
- Structural Directives :
    - Look like a normal HTML Attribute but have a leading * (for desugaring)
    - Affect a whole area in the DOM (elements get added/ removed)

### 91) ngFor and ngIf Recap :
- app.component.html
```
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <button class="btn btn-primary" (click)="onlyOdd = !onlyOdd">Only show odd numbers</button>
      <br><br>
      <ul class="list-group">
        <div *ngIf="onlyOdd">
          <li class="list-group-item" *ngFor="let odd of oddNumbers">
            {{ odd }}
          </li>
        </div>
        <div *ngIf="!onlyOdd">
          <li class="list-group-item" *ngFor="let even of evenNumbers">
            {{ even }}
          </li>
        </div>
      </ul>
      <ng-template [ngIf]="onlyOdd">
        <p>Only odd</p>
      </ng-template>
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
  numbers = [1, 2, 3, 4, 5];
  oddNumbers = [1, 3, 5];
  evenNumbers = [2, 4];
  onlyOdd = false;
}
```

### 92) ngClass and ngStyle Recap :
- app.component.css
```
.container {
  margin-top: 30px;
}

.odd {
  color: red;
}
```
- app.component.html
```
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <button class="btn btn-primary" (click)="onlyOdd = !onlyOdd">Only show odd numbers</button>
      <br><br>
      <ul class="list-group">
        <div *ngIf="onlyOdd">
          <li class="list-group-item" [ngClass]="{odd: odd%2 !== 0}"
            [ngStyle]="{backgroundColor: odd%2!==0? 'yellow' : 'transparent'}" *ngFor="let odd of oddNumbers">
            {{ odd }}
          </li>
        </div>
        <div *ngIf="!onlyOdd">
          <li class="list-group-item" [ngClass]="{odd: even%2 !== 0}"
            [ngStyle]="{backgroundColor: even%2!==0? 'yellow' : 'transparent'}" *ngFor="let even of evenNumbers">
            {{ even }}
          </li>
        </div>
      </ul>
      <ng-template [ngIf]="onlyOdd">
        <p>Only odd</p>
      </ng-template>
    </div>
  </div>
</div>
```

### 93) Creating a Basic Attribute Directive :
- basic-highlight.directive.ts
```
import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}
```
- app.module.ts
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
- app.component.html
```
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <button class="btn btn-primary" (click)="onlyOdd = !onlyOdd">Only show odd numbers</button>
      <br><br>
      <ul class="list-group">
        <div *ngIf="onlyOdd">
          <li class="list-group-item" [ngClass]="{odd: odd%2 !== 0}"
            [ngStyle]="{backgroundColor: odd%2!==0? 'yellow' : 'transparent'}" *ngFor="let odd of oddNumbers">
            {{ odd }}
          </li>
        </div>
        <div *ngIf="!onlyOdd">
          <li class="list-group-item" [ngClass]="{odd: even%2 !== 0}"
            [ngStyle]="{backgroundColor: even%2!==0? 'yellow' : 'transparent'}" *ngFor="let even of evenNumbers">
            {{ even }}
          </li>
        </div>
      </ul>
      <ng-template [ngIf]="onlyOdd">
        <p>Only odd</p>
      </ng-template>
      <p appBasicHighlight>Style me with basic directive!</p>
    </div>
  </div>
</div>
```

### 94) Using the Renderer to build a Better Attribute Directive :
- To create directive :
    - ng g d better-highlight
- The Renderer2 class is an abstraction provided by Angular in the form of a service that allows to manipulate elements of your app without having to touch the DOM directly.
- better-highlight.directive.ts
```
import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
  }

}
```
- app.component.html
```
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <button class="btn btn-primary" (click)="onlyOdd = !onlyOdd">Only show odd numbers</button>
      <br><br>
      <ul class="list-group">
        <div *ngIf="onlyOdd">
          <li class="list-group-item" [ngClass]="{odd: odd%2 !== 0}"
            [ngStyle]="{backgroundColor: odd%2!==0? 'yellow' : 'transparent'}" *ngFor="let odd of oddNumbers">
            {{ odd }}
          </li>
        </div>
        <div *ngIf="!onlyOdd">
          <li class="list-group-item" [ngClass]="{odd: even%2 !== 0}"
            [ngStyle]="{backgroundColor: even%2!==0? 'yellow' : 'transparent'}" *ngFor="let even of evenNumbers">
            {{ even }}
          </li>
        </div>
      </ul>
      <ng-template [ngIf]="onlyOdd">
        <p>Only odd</p>
      </ng-template>
      <p appBasicHighlight>Style me with basic directive!</p>
      <p appBetterHighlight>Style me with a better directive!</p>
    </div>
  </div>
</div>
```
- app.module.ts
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { BasicHighlightDirective } from './basic-highlight/basic-highlight.directive';
import { BetterHighlightDirective } from './better-highlight/better-highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    BasicHighlightDirective,
    BetterHighlightDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 95) More about the Renderer :
- In the last lecture, we used the Angular Renderer class to change the style of a HTML element. As explained in that lecture, you should use the Renderer for any DOM manipulations.
- Of course, you can do more than simply change the styling of an element via setStyle(). Learn more about the available Renderer methods here(https://angular.io/api/core/Renderer2).

### 96) Using HostListener to Listen to Host Events :
- better-highlight.directive.ts
```
import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

  @HostListener('mouseenter') mouseenter(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
  }
}
```

### 97) Using HostBinding to Bind to Host Properties :
- better-highlight.directive.ts
```
import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
  }

  @HostListener('mouseenter') mouseenter(eventData: Event) {
    this.backgroundColor = 'blue';
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = 'transparent';
  }
}
```

### 98) Binding to Directive Properties :
- You can use
```
[defaultColor]="'yellow'"
```
- as
```
defaultColor="yellow"
```
- better-highlight.directive.ts
```
import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input('appBetterHighlight') highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string;
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseenter(eventData: Event) {
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    this.backgroundColor = this.defaultColor;
  }
}
```
- app.component.html
```
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <button class="btn btn-primary" (click)="onlyOdd = !onlyOdd">Only show odd numbers</button>
      <br><br>
      <ul class="list-group">
        <div *ngIf="onlyOdd">
          <li class="list-group-item" [ngClass]="{odd: odd%2 !== 0}"
            [ngStyle]="{backgroundColor: odd%2!==0? 'yellow' : 'transparent'}" *ngFor="let odd of oddNumbers">
            {{ odd }}
          </li>
        </div>
        <div *ngIf="!onlyOdd">
          <li class="list-group-item" [ngClass]="{odd: even%2 !== 0}"
            [ngStyle]="{backgroundColor: even%2!==0? 'yellow' : 'transparent'}" *ngFor="let even of evenNumbers">
            {{ even }}
          </li>
        </div>
      </ul>
      <ng-template [ngIf]="onlyOdd">
        <p>Only odd</p>
      </ng-template>
      <p appBasicHighlight>Style me with basic directive!</p>
      <p [appBetterHighlight]="'red'" [defaultColor]="'yellow'">Style me with a better directive!</p>
    </div>
  </div>
</div>
```

### 99) What Happens behind the Scenes on Structural Directives :
- ng-template is an element which itself is not rendered but which allows us to define a template in the end for Angular to use once it determines that this template, some element needs to be rendered because this condition is true in this case.
- app.component.html
```
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <button class="btn btn-primary" (click)="onlyOdd = !onlyOdd">Only show odd numbers</button>
      <br><br>
      <ul class="list-group">
        <div *ngIf="onlyOdd">
          <li class="list-group-item" [ngClass]="{odd: odd%2 !== 0}"
            [ngStyle]="{backgroundColor: odd%2!==0? 'yellow' : 'transparent'}" *ngFor="let odd of oddNumbers">
            {{ odd }}
          </li>
        </div>
        <div *ngIf="!onlyOdd">
          <li class="list-group-item" [ngClass]="{odd: even%2 !== 0}"
            [ngStyle]="{backgroundColor: even%2!==0? 'yellow' : 'transparent'}" *ngFor="let even of evenNumbers">
            {{ even }}
          </li>
        </div>
        <ng-template [ngIf]="!onlyOdd">
          <div>
            <li class="list-group-item" [ngClass]="{odd: even%2 !== 0}"
              [ngStyle]="{backgroundColor: even%2!==0? 'yellow' : 'transparent'}" *ngFor="let even of evenNumbers">
              {{ even }}
            </li>
          </div>
        </ng-template>
      </ul>
      <ng-template [ngIf]="onlyOdd">
        <p>Only odd</p>
      </ng-template>
      <p appBasicHighlight>Style me with basic directive!</p>
      <p [appBetterHighlight]="'red'" [defaultColor]="'yellow'">Style me with a better directive!</p>
    </div>
  </div>
</div>
```

### 100) Building a Structural Directive :
- ng g d unless
- it should be always same appUnless at both places
- unless.directive.ts
```
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    }
    else {
      this.vcRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
```
- app.component.html
```
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <button class="btn btn-primary" (click)="onlyOdd = !onlyOdd">Only show odd numbers</button>
      <br><br>
      <ul class="list-group">
        <div *ngIf="onlyOdd">
          <li class="list-group-item" [ngClass]="{odd: odd%2 !== 0}"
            [ngStyle]="{backgroundColor: odd%2!==0? 'yellow' : 'transparent'}" *ngFor="let odd of oddNumbers">
            {{ odd }}
          </li>
        </div>
        <div *appUnless="onlyOdd">
          <li class="list-group-item" [ngClass]="{odd: even%2 !== 0}"
            [ngStyle]="{backgroundColor: even%2!==0? 'yellow' : 'transparent'}" *ngFor="let even of evenNumbers">
            {{ even }}
          </li>
        </div>
      </ul>
      <ng-template [ngIf]="onlyOdd">
        <p>Only odd</p>
      </ng-template>
      <p appBasicHighlight>Style me with basic directive!</p>
      <p [appBetterHighlight]="'red'" [defaultColor]="'yellow'">Style me with a better directive!</p>
    </div>
  </div>
</div>
```

### 101) Understanding ngSwitch :
- app.component.html
```
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <button class="btn btn-primary" (click)="onlyOdd = !onlyOdd">Only show odd numbers</button>
      <br><br>
      <ul class="list-group">
        <div *ngIf="onlyOdd">
          <li class="list-group-item" [ngClass]="{odd: odd%2 !== 0}"
            [ngStyle]="{backgroundColor: odd%2!==0? 'yellow' : 'transparent'}" *ngFor="let odd of oddNumbers">
            {{ odd }}
          </li>
        </div>
        <div *appUnless="onlyOdd">
          <li class="list-group-item" [ngClass]="{odd: even%2 !== 0}"
            [ngStyle]="{backgroundColor: even%2!==0? 'yellow' : 'transparent'}" *ngFor="let even of evenNumbers">
            {{ even }}
          </li>
        </div>
      </ul>
      <ng-template [ngIf]="onlyOdd">
        <p>Only odd</p>
      </ng-template>
      <p appBasicHighlight>Style me with basic directive!</p>
      <p [appBetterHighlight]="'red'" [defaultColor]="'yellow'">Style me with a better directive!</p>
      <div [ngSwitch]="value">
        <p *ngSwitchCase="5">Value is 5</p>
        <p *ngSwitchCase="5">Value is 10</p>
        <p *ngSwitchCase="5">Value is 100</p>
        <p *ngSwitchDefault>Value is Default</p>
      </div>
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
  numbers = [1, 2, 3, 4, 5];
  oddNumbers = [1, 3, 5];
  evenNumbers = [2, 4];
  onlyOdd = false;
  value = 10;
}
```