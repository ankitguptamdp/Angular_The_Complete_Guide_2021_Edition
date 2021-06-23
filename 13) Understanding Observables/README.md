### 169) Module Introduction :
- What is an Observable?
    - Various Data Sources like (User Input) Events, Http Requests, Triggered in Code etc.
- Observer :
    - You write the Code which get executed!
    - Handle Data, Handle Error or Handle Completion

### 170) Analyzing Angular Observables :
- ng new observables --no-strict
- cd observables

### 171) Getting Closer to the Core of Observables :
- home.component.ts
```
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    this.firstObsSubscription = interval(1000).subscribe(count => {
      console.log(count);
    });
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
```

### 172) Building a Custom Observable :
- home.component.ts
```
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, observable, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.subscribe(data => {
      console.log(data);
    });
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
```

173) Errors & Completion :
- home.component.ts
```
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, observable, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed!');
    });
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
```

### 174) Observables & You! :

### 175) Understanding Operators :
- Data -> Observable -> Operators -> Subscription
- home.component.ts
```
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, observable, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
      return data > 0;
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    }))
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
        alert(error.message);
      }, () => {
        console.log('Completed!');
      });
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
```

### 176) Subjects :
- Observable <- Observer : Passive e.g. wraps callback, event etc.
- Subject <- Observer : Active can be triggered from code
- home.component.ts
```
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, observable, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
      return data > 0;
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    }))
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
        alert(error.message);
      }, () => {
        console.log('Completed!');
      });
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
```
- user.component.html
```
<p>User with <strong>ID {{ id }}</strong> was loaded</p>
<button class="btn btn-primary" (click)="onActivate()">Activate</button>
```
- user.component.ts
```
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }

  onActivate() {
    this.userService.activatedEmitter.next(true);
  }
}
```
- app.component.html
```
<div class="container">
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <a routerLink="/">Home</a> |
      <a [routerLink]="['user', 1]">
        User 1
      </a>
      |
      <a [routerLink]="['user', 2]">
        User 2
      </a>
    </div>
  </div>
  <hr />
  <p *ngIf="userActivated">Activated!</p>
  <hr />
  <div class="row">
    <div class="col-xs-12 col-sm-10 col-md-8 col-sm-offset-1 col-md-offset-2">
      <router-outlet></router-outlet>
    </div>
  </div>
</div>
```
- app.component.ts
```
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  private activatedSub: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.activatedSub = this.userService.activatedEmitter.subscribe(didActivate => {
      this.userActivated = didActivate;
    });
  }

  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }
}
```
- user.service.ts
```
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserService {
  activatedEmitter = new Subject<boolean>();
}
```

### 177) Wrap Up :

### 178) Useful Resources & Links :
- Official Docs: https://rxjs-dev.firebaseapp.com/
- RxJS Series: https://academind.com/learn/javascript/understanding-rxjs/
- Updating to RxJS 6: https://academind.com/learn/javascript/rxjs-6-what-changed/