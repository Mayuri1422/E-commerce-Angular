import { Component } from '@angular/core';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { EventEmitter, Output } from '@angular/core';
import { Category } from '../../types/category.types';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-cat-navigation',
  templateUrl: './cat-navigation.component.html',
  styleUrls: ['./cat-navigation.component.css']
})
export class CatNavigationComponent {

  constructor(public categoryStore: CategoriesStoreItem, private router: Router) {
    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => this.displayOptions = (event as NavigationEnd).url === '/home/products' ? true : false)
  }

  @Output()
  categoryClicked: EventEmitter<number> = new EventEmitter<number>();

  displayOptions: boolean = true


  onCategoryClicked(category: Category): void {
    this.categoryClicked.emit(category.id);
  }
}
