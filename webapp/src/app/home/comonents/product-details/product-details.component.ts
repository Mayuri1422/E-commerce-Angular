import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../types/products.types';
import { ProductsService } from '../../services/product/products.service';
import { Subscription } from 'rxjs';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../../services/cart/cart.storeItem';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  subscription: Subscription = new Subscription();
  faShoppingCart = faShoppingCart;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private cartStoreItem: CartStoreItem
  ) { }

  ngOnInit(): void {
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.subscription.add(
      this.productsService.getProduct(id).subscribe((product) => {
        this.product = product[0];
      })
    );
  }

  addtocart() {
    this.cartStoreItem.addProducts(this.product);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}