import { Component } from '@angular/core';
import { ProductStoreItem } from '../../services/product/product.storeItems';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Product } from '../../types/products.types';
import { CartStoreItem } from '../../services/cart/cart.storeItem';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {

  faShoppingCart = faShoppingCart;

  constructor(
    public productStoreItems: ProductStoreItem,
    private cartStoreItem: CartStoreItem
  ) {
  }

  addToCart(product: Product) {
    this.cartStoreItem.addProducts(product);
  }
}