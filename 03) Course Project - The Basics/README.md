### 44) Project Introduction :
- Goal in this project is to build a recipe book and shopping list app.
- Basically there, we're going to have two sections, shopping list and recipe book and we will be able to manage our recipes, view them in detail and also to manage our shopping list and even push ingredients from a recipe directly to the shopping list.

### 45) Planning the App :
- We're going to have a shopping list and a recipe book section, managing either our single ingredients we need to buy or in the recipe book, our whole recipes. Which components will we need for this? 
- Obviously, a root component holding our overall application, the app component, every Angular app has this. Then since we have two sections, it probably makes sense to have some kind of header component where we can navigate between these two sections.
- Of course you could also hard-code the headers simply into the app component but since it will contain its own business logic, in the end it will trigger a routing action later and we will also add a dropdown there in the end which allows us to store our recipes on the server and fetch them from there.
- So since we will have that logic attached to the header, outsourcing it into its own component makes sense so that we don't have to put all the logic into our root component which really mainly should only be responsible for holding our overall app.
- It makes sense to have the overall shopping-list component, the purple box is only the feature so we need a component holding our shopping list and maybe in this shopping-list component,
- We also want to have a shopping list edit part which allows us to add new items, so an input field and a button because that again has its own logic, we will have to decide if we are editing an existing item or adding a new one, we need to submit this, so it makes sense to create its own component for this.
- So if we have an overall list component, mainly holding the data of the list and the edit component being responsible for managing this data kind of, though the edit component will be nested inside the list component.
- A recipe-list component which shows us a list of all our recipes. Here we might later also put each individual recipe into its own item though since it holds a little bit more information than just one line of HTML code and a recipe-detail area would be great too.
- Actually, we'll also have an extra "RecipesComponent" holding Recipe List and Detail next to each other.
- So an area where once we select a recipe, we can see information about that. 
- Later we will also add another component here because we will then somehow need a component which allows us to edit existing recipes or add new ones but since this is really advanced and we would not be able to fill it with much life right now, I will omit it for now and focus on the displaying part.
- So a list with items and then the details section which displays the details for the currently selected item.
- Each of these components should hold a significant amount of business logic and I guess with the component sketch out here, we're really having each component focus on one main topic, displaying a list, displaying information about a single item, displaying detail information about a selected item and so on.
- Now one last thing we should think about, which models will be use in this app? And with model, I simply mean which data.
- So we certainly will need some representation for our ingredient. We will use ingredients a lot in the recipe book too, each recipe there has a couple of ingredients, so we should define how the ingredient looks like. That is something which your application probably also needs,be clear about the data you're going to use and put it into its own class, so that you have your own type you can use later on and that you have a clear interface or definition of what your data looks like so that you can easily have your components talk with each other.
- So besides the ingredients which probably is a very simple model, only controlling the name and amount maybe, we also will need a model for the recipe which contains things like title, the description, the ingredients and so on.

### 46) Creating a new app correctly :
- Make sure, you do create that app by also adding the --no-strict flag to the ng new command - otherwise you will run into issues later on (we'll still dive into that "Strict Mode" later in the course of course, no worries)!
- We'll also install the Bootstrap CSS Framework and in this course, we use version 3 of the framework. Install it via npm install --save bootstrap@3  => The @3  is important!
- Additionally, when using a project created with Angular CLI 6+ (check via ng v ), you'll have an angular.json  file instead of an .angular-cli.json  file. In that file, you still need to add Bootstrap to the styles[]  array as shown in the next video, but the path should be node_modules/bootstrap/dist/css/bootstrap.min.css , NOT ../node_modules/bootstrap/dist/css/bootstrap.min.css . The leading ../  must not be included.
- Also see this lecture - I do show the complete setup process there: https://www.udemy.com/the-complete-guide-to-angular-2/learn/v4/t/lecture/6655614/
- If you're facing any problems, please have a look at this very thorough thread by Jost: https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/17862130#questions/10444944

### 47) Setting up the Application : 
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

### 48) Creating the components : 
- To create components to create component without header.component.spec.ts file:
- ng g c header --skip-tests true
- ng g c recipes --skip-tests true
- ng g c recipes/recipe-list --skip-tests true
- ng g c recipes/recipe-detail --skip-tests true
- ng g c recipes/recipe-list/recipe-item --skip-tests true
- ng g c shopping-list --skip-tests true
- ng g c shopping-list/shopping-edit --skip-tests true

- app.component.html
```
<app-header></app-header>
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <hr>
      <h2>I'm Working!</h2>
    </div>
  </div>
</div>
```

- header.component.html
```
<h1>The Header</h1>
```


### 49) Using the Components :
- app.component.html
```
<app-header></app-header>
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <hr>
      <app-recipes></app-recipes>
      <app-shopping-list></app-shopping-list>
    </div>
  </div>
</div>
```

- recipes.component.html
```
<div class="row">
  <div class="col-md-5">
    <app-recipe-list></app-recipe-list>
  </div>
  <div class="col-md-7">
    <app-recipe-detail></app-recipe-detail>
  </div>
</div>
```

- recipe-list.component.html
```
<app-recipe-item></app-recipe-item>
```

- shopping-list.component.html
```
<div class="row">
  <div class="col-xs-10">
    <app-shopping-edit></app-shopping-edit>
    <hr>
    <p>The List</p>
  </div>
</div>
```

### 50) Adding a Navigation Bar : 
- header.component.html
```
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a href="#" class="navbar-brand">Recipe Book</a>
    </div>

    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li><a href="#">Recipes</a></li>
        <li><a href="#">Shopping List</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" role="button">Manage <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Save Data</a></li>
            <li><a href="#">Fetch Data</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

### 51) Alternative Non-Collapsible Navigation Bar :
- The way we added it, the Navbar will collapse on smaller screens. Since we didn't implement a Hamburger menu, that means that there's no way of accessing our links on smaller screens.
- You can either add such a menu on your own (see below), or you replace collapse navbar-collapse  with just navbar-default.
- Adding a Hamburger Menu:
- Alternatively, if you want to make the navigation bar responsive, please replace these lines in header.component.html:
```
<div class="navbar-header">
  <a routerLink="/" class="navbar-brand">Recipe Book</a>
</div>
<div class="collapse navbar-collapse">
```
- with these lines:
```
<div class="navbar-header">
  <button type="button" class="navbar-toggle" (click)="collapsed = !collapsed">
	<span class="icon-bar" *ngFor="let iconBar of [1, 2, 3]"></span>
  </button>
  <a routerLink="/" class="navbar-brand">Recipe Book</a>
</div>
<div class="navbar-collapse" [class.collapse]="collapsed" (window:resize)="collapsed = true">
```
- and add this line to header.component.ts:
```
collapsed = true;
```

- header.component.html
```
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" (click)="collapsed = !collapsed">
        <span class="icon-bar" *ngFor="let iconBar of [1, 2, 3]"></span>
      </button>
      <a routerLink="/" class="navbar-brand">Recipe Book</a>
    </div>
    <div class="navbar-collapse" [class.collapse]="collapsed" (window:resize)="collapsed = true">
      <ul class="nav navbar-nav">
        <li><a href="#">Recipes</a></li>
        <li><a href="#">Shopping List</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" role="button">Manage <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Save Data</a></li>
            <li><a href="#">Fetch Data</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
```

- header.component.ts
```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor() { }

  ngOnInit(): void {
  }
}
```

### 52) Creating a Recipe Model :
- recipe-list.component.ts
```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes = [];
  constructor() { }

  ngOnInit(): void {
  }

}
```

- recipe.model.ts
```
export class Recipe{
  public name: string;
  public description: string;
  public imagePath: string;

  constructor(name: string, description: string, imagePath: string){
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
  }
}
```

### 53) Adding Content to the Recipes Components :
- recipe-list.component.ts
```
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
```

- recipe-list.component.html
```
<div class="row">
  <div class="col-xs-12">
    <button class="btn btn-success">New Recipe</button>
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <a href="#" class="list-group-item clearfix">
      <div class="pull-left">
        <h4 class="list-group-item-heading">Recipe Name</h4>
        <p class="list-group-item-text">Description</p>
      </div>
      <span class="pull-right">
        <img src="" alt="" class="img-responsive" style="max-height: 50px;">
      </span>
    </a>
    <app-recipe-item></app-recipe-item>
  </div>
</div>
```

### 54) Outputting a List of Recipes with ngFor :
- We can use both in the case of recipe.imagePath as :
```
src = "{{ recipe.imagePath }}"
[src] = "recipe.imagePath"
```
- recipe-list.component.html
```
<div class="row">
  <div class="col-xs-12">
    <button class="btn btn-success">New Recipe</button>
  </div>
</div>
<hr>
<div class="row">
  <div class="col-xs-12">
    <a href="#" class="list-group-item clearfix" *ngFor="let recipe of recipes">
      <div class="pull-left">
        <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
        <p class="list-group-item-text">{{ recipe.description }}</p>
      </div>
      <span class="pull-right">
        <img [src]="recipe.imagePath" alt="{{ recipe.name }}" class="img-responsive" style="max-height: 50px;">
      </span>
    </a>
    <app-recipe-item></app-recipe-item>
  </div>
</div>
```

- recipe-list.component.ts
```
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg')
  ];
  constructor() { }

  ngOnInit(): void {
  }
}
```

### 55) Displaying Recipe Details :
- recipe-detail.component.html
```
<div class="row">
  <div class="col-xs-12">
    <img src="" alt="" class="img-responsive">
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <h1>Recipe Name</h1>
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <div class="btn-group">
      <button type="button" class="btn btn-primary dropdown-toggle">
        Manage Recipe <span class="caret"></span>
      </button>
      <ul class="dropdown-menu">
        <li><a href="#"></a>To Shopping List</li>
        <li><a href="#"></a>Edit Recipe</li>
        <li><a href="#"></a>Delete Recipe</li>
      </ul>
    </div>
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    Description
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    Ingredients
  </div>
</div>
```

### 56) Working on the ShoppingListComponent :
- Remove href="" from a tag while using style="cursor: pointer"
- The reason for removal is we will use this like a button and therefore, we don't need this ref element there, it would simply lead to unwanted behaviors.
- shopping-list.component.html
```
<div class="row">
  <div class="col-xs-10">
    <app-shopping-edit></app-shopping-edit>
    <hr>
    <ul class="list-group">
      <a class="list-group-item" style="cursor: pointer;"></a>
    </ul>
  </div>
</div>
```

- shopping-list.component.ts
```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients = [];
  constructor() { }

  ngOnInit(): void {
  }
}
```

### 57) Creating an Ingredient Model :
- Ingredient Model belongs in a new folder, the shared folder which we will create in the app folder.
- shared is a fitting name for this folder because it will contain features or elements of our app which are shared across different features, like the ingredient which we're going to use both in the shopping list and the recipes section.
- We can get rid of the declaration of our properties and get rid of the content in the body of this constructor and simply add an accessor in front of the property name, public in front of every argument.
- It will create the same effect we had before, so it will automatically give us properties with the names we specify here as argument names, and it will automatically assign the values we receive in this constructor to these newly created properties.
- ingredient.model.ts
```
export class Ingredient {
  public name: string;
  public amount: number;

  constructor(name: string,amount: number) {
    this.name = name;
    this.amount = amount;
  }
}
```

- Replace with this one
```
export class Ingredient {
  constructor(public name: string, public amount: number) {
  }
}
```

### 58) Creating and Outputting the Shopping List :
- shopping-list.component.ts
```
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];
  constructor() { }

  ngOnInit(): void {
  }
}
```

- shopping-list.component.html
```
<div class="row">
  <div class="col-xs-10">
    <app-shopping-edit></app-shopping-edit>
    <hr>
    <ul class="list-group">
      <a class="list-group-item" style="cursor: pointer;" *ngFor="let ingredient of ingredients">
        {{ ingredient.name }} ({{ingredient.amount}})
      </a>
    </ul>
  </div>
</div>
```

### 59) Adding a Shopping List Edit Section :
- shopping-edit.component.html
```
<div class="row">
  <div class="col-xs-12">
    <form>
      <div class="row">
        <div class="col-sm-5 form-group">
          <label for="name">Name</label>
          <input type="text" id="name" class="form-control">
        </div>
        <div class="col-sm-2 form-group">
          <label for="amount">Amount</label>
          <input type="number" id="amount" class="form-control">
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <button class="btn btn-success" type="submit">Add</button>
          <button class="btn btn-danger" type="button">Delete</button>
          <button class="btn btn-primary" type="button">Clear</button>
        </div>
      </div>
    </form>
  </div>
</div>
```

### 60) Wrap Up & Next Steps :