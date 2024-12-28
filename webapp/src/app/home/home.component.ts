import { Component } from '@angular/core';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductStoreItem } from './services/product/product.storeItems';
import { SearchKeyword } from './types/searchKeyword.types';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private categoriesStoreItem: CategoriesStoreItem,
    private productStoreItem: ProductStoreItem,
    private router: Router
  ) {
    this.categoriesStoreItem.loadCategories();
    this.productStoreItem.loadProducts();
    router.events.pipe(filter(event => event instanceof NavigationEnd)).
      subscribe(event => {
        if ((event as NavigationEnd).url === '/home') {
          router.navigate(['/home/products'])
        }
      }
      )
  }

  onSelectCategory(mainCategoryId: number): void {
    this.productStoreItem.loadProducts('mainCategoryId=' + mainCategoryId);
    // console.log('MainCategoryId:',mainCategoryId);
  }

  onSearchKeyword(searchKeyword: SearchKeyword): void {
    this.productStoreItem.loadProducts('mainCategoryId=' + searchKeyword.categoryId + '&keyword=' + searchKeyword.keyword)
    console.log(searchKeyword.keyword);
  }
}
