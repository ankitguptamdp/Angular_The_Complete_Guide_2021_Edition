### 84) Introduction :

### 85) Adding Navigation with Event Binding and ngIf :
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
        <li><a href="#" (click)="onSelect('recipe')">Recipes</a></li>
        <li><a href="#" (click)="onSelect('shopping-list')">Shopping List</a></li>
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
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  @Output() featureSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}
```
- app.component.html
```
<app-header (featureSelected)="onNavigate($event)"></app-header>
<div class="container">
  <div class="row">
    <div class="col-xs-12">
      <hr>
      <app-recipes *ngIf="loadedFeature === 'recipe'"></app-recipes>
      <app-shopping-list *ngIf="loadedFeature !== 'recipe'"></app-shopping-list>
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
  loadedFeature = 'recipe';

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
```

### 86) Passing Recipe Data with Property Binding :
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
    <app-recipe-item *ngFor="let recipeEl of recipes" [recipe]="recipeEl"></app-recipe-item>
  </div>
</div>
```
- recipe-item.component.html
```
<a href="#" class="list-group-item clearfix">
  <div class="pull-left">
    <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
    <p class="list-group-item-text">{{ recipe.description }}</p>
  </div>
  <span class="pull-right">
    <img [src]="recipe.imagePath" alt="{{ recipe.name }}" class="img-responsive" style="max-height: 50px;">
  </span>
</a>
```
- recipe-item.component.ts
```
import { Component, Input, OnInit } from '@angular/core';

import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor() { }

  ngOnInit(): void {
  }

}
```

### 87) Passing Data with Event and Property Binding (Combined) :
- recipe-item.component.html
```
<a href="#" class="list-group-item clearfix" (click)="onSelected()">
  <div class="pull-left">
    <h4 class="list-group-item-heading">{{ recipe.name }}</h4>
    <p class="list-group-item-text">{{ recipe.description }}</p>
  </div>
  <span class="pull-right">
    <img [src]="recipe.imagePath" alt="{{ recipe.name }}" class="img-responsive" style="max-height: 50px;">
  </span>
</a>
```
- recipe-item.component.ts
```
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() recipeSelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelected() {
    this.recipeSelected.emit();
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
<hr>
<div class="row">
  <div class="col-xs-12">
    <app-recipe-item *ngFor="let recipeEl of recipes" [recipe]="recipeEl" (recipeSelected)="onRecipeSelected(recipeEl)">
    </app-recipe-item>
  </div>
</div>
```
- recipe-list.component.ts
```
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg')
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    this.recipeWasSelected.emit(recipe);
  }
}
```
- recipe-detail.component.html
```
<div class="row">
  <div class="col-xs-12">
    <img [src]="recipe.imagePath" alt="{{ recipe.name }}" class="img-responsive" style="max-height: 300px;">
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    <h1>{{ recipe.name }}</h1>
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
    {{ recipe.description }}
  </div>
</div>
<div class="row">
  <div class="col-xs-12">
    Ingredients
  </div>
</div>
```
- recipe-detail.component.ts
```
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  constructor() { }

  ngOnInit(): void {
  }

}
```
- recipes.component.html
```
<div class="row">
  <div class="col-md-5">
    <app-recipe-list (recipeWasSelected)="selectedRecipe = $event"></app-recipe-list>
  </div>
  <div class="col-md-7">
    <app-recipe-detail *ngIf="selectedRecipe; else infoText" [recipe]="selectedRecipe"></app-recipe-detail>
    <ng-template #infoText>
      <p>Please select a Recipe!</p>
    </ng-template>
  </div>
</div>
```
- recipes.component.ts
```
import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
```

### 88) Make sure you have FormsModule added :
- One quick note: In case you're hitting an error in the next lecture, make sure you have FormsModule added to your imports[] in the AppModule. Also have a look at the following Q&A thread for more info: https://www.udemy.com/the-complete-guide-to-angular-2/learn/v4/questions/4924644

### 89) Allowing the User to Add Ingredients to the Shopping List :
- shopping-edit.component.html
```
<div class="row">
  <div class="col-xs-12">
    <form>
      <div class="row">
        <div class="col-sm-5 form-group">
          <label for="name">Name</label>
          <input type="text" id="name" class="form-control" #nameInput>
        </div>
        <div class="col-sm-2 form-group">
          <label for="amount">Amount</label>
          <input type="number" id="amount" class="form-control" #amountInput>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <button class="btn btn-success" type="submit" (click)="onAddItem()">Add</button>
          <button class="btn btn-danger" type="button">Delete</button>
          <button class="btn btn-primary" type="button">Clear</button>
        </div>
      </div>
    </form>
  </div>
</div>
```
- shopping-edit.component.ts
```
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);
    this.ingredientAdded.emit(newIngredient);
  }

}
```
- shopping-list.component.html
```
<div class="row">
  <div class="col-xs-10">
    <app-shopping-edit (ingredientAdded)="onIngredientAdded($event)"></app-shopping-edit>
    <hr>
    <ul class="list-group">
      <a class="list-group-item" style="cursor: pointer;" *ngFor="let ingredient of ingredients">
        {{ ingredient.name }} ({{ingredient.amount}})
      </a>
    </ul>
  </div>
</div>
```
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

  onIngredientAdded(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
```