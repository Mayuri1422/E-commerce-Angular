import { Component } from '@angular/core';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { ProductStoreItem } from '../../services/product/product.storeItems';
import { SearchKeyword } from '../../types/searchKeyword.types';

@Component({
  selector: 'app-products-gallery',
  templateUrl: './products-gallery.component.html',
  styleUrls: ['./products-gallery.component.css']
})
export class ProductsGalleryComponent {
  constructor(private categoriesStoreItem: CategoriesStoreItem, private productStoreItem: ProductStoreItem) {
    this.categoriesStoreItem.loadCategories();
    this.productStoreItem.loadProducts();
  }

  onSelectSubCategory(subCategoryId: number): void {
    this.productStoreItem.loadProducts('subCategoryId=' + subCategoryId);
    // console.log('Selected Subcategory ID:', subCategoryId);
  }
}
