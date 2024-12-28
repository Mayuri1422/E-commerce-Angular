import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './comonents/header/header.component';
import { CatNavigationComponent } from './comonents/cat-navigation/cat-navigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SideNavigationComponent } from './comonents/side-navigation/side-navigation.component';
import { ProductsComponent } from './comonents/products/products.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoryService } from './services/category/category.service';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductStoreItem } from './services/product/product.storeItems';
import { ProductsService } from './services/product/products.service';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { ProductsGalleryComponent } from './comonents/products-gallery/products-gallery.component';
import { ProductDetailsComponent } from './comonents/product-details/product-details.component';
import { CartStoreItem } from './services/cart/cart.storeItem';
import { CartComponent } from './comonents/cart/cart.component';
import { UserSignupComponent } from './comonents/users/user-signup/user-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserLoginComponent } from './comonents/users/user-login/user-login.component';
import { UserService } from './services/user/user-service.service';
import { OrderService } from './services/order/order.service';
import { PastOrdersComponent } from './comonents/past-orders/past-orders.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    CatNavigationComponent,
    SideNavigationComponent,
    ProductsComponent,
    ProductsGalleryComponent,
    ProductDetailsComponent,
    CartComponent,
    UserSignupComponent,
    UserLoginComponent,
    PastOrdersComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    HomeRoutingModule,
    ReactiveFormsModule

  ],
  providers: [CategoryService, CategoriesStoreItem, ProductStoreItem, ProductsService,
    CartStoreItem, UserService, OrderService
  ]
})
export class HomeModule { }
