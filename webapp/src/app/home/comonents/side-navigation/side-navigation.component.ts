import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from '../../types/category.types';
import { OnDestroy } from '@angular/core';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent implements OnDestroy {

  categories: Category[] = [];
  subscriptions: Subscription = new Subscription();
  @Output() subCategoryClicked:EventEmitter<number>=new EventEmitter<number>();

  constructor(categoryStore: CategoriesStoreItem) {
    this.subscriptions.add(categoryStore.categories$.subscribe((categories) => {
      this.categories = categories;
    }))
  }

  getCategories(parentCategoryId?: number): Category[] {
    return this.categories.filter(category =>
      parentCategoryId
        ? category.parent_category_id === parentCategoryId
        : category.parent_category_id === null
    );
  }

  onSubCategoryClick(subCategory:Category):void{
    this.subCategoryClicked.emit(subCategory.id);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
