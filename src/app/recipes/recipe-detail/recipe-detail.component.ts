import { Component, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";
@Component({
  selector: 'rb-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit, OnDestroy{
selectedRecipe: Recipe;
private recipeIndex: number =1;
private subscription: Subscription;

  constructor(private sls: ShoppingListService, 
  	         private router: Router,
  	         private route: ActivatedRoute,
  	         private recipesService: RecipeService) { }

  ngOnInit() {
     this.subscription = this.route.params.subscribe(
     	(params: any) => {
     	this.recipeIndex = params['id'];
        this.selectedRecipe = this.recipesService.getRecipe(this.recipeIndex);
     }
     );
  }
  onEdit(){
  this.router.navigate(['/recipes', this.recipeIndex, 'edit']);
  }
 onDelete(){
    this.recipesService.deleteRecipe(this.selectedRecipe);
    this.router.navigate(['/recipes']);

  }
  ngOnDestroy(){
  	this.subscription.unsubscribe();
  }
  onAddToShoppingList(){
      this.sls.addItems(this.selectedRecipe.ingredients);
  }
}
