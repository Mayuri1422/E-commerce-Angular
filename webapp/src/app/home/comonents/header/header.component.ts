import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { faSearch, faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { CategoriesStoreItem } from '../../services/category/categories.storeItem';
import { SearchKeyword } from '../../types/searchKeyword.types';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { UserService } from '../../services/user/user-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnDestroy {
  faSearch = faSearch;
  faUserCircle = faUserCircle;
  faShoppingCart = faShoppingCart;
  subscription: Subscription = new Subscription();

  @Output()
  searchClicked: EventEmitter<SearchKeyword> = new EventEmitter<SearchKeyword>();

  displaySearch: boolean = false;
  isUserAuthenticated: boolean = false;
  userName: string = '';

  constructor(
    public categorystore: CategoriesStoreItem,
    private router: Router,
    public cartStoreItem: CartStoreItem,
    private userService: UserService
  ) {
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => this.displaySearch = (event as NavigationEnd).url === 'home/products' ? true : false)

    this.subscription.add(this.userService.isUserauthenticated$.subscribe((result) => {
      this.isUserAuthenticated = result;
    }));

    this.subscription.add(this.userService.loggedInUser$.subscribe((result) => {
      this.userName = result.firstName;
    }));
  }

  onClickSearch(keyword: string, categoryId: string) {
    this.searchClicked.emit({ categoryId: parseInt(categoryId), keyword: keyword });
  }

  // navigateToCart(): void {
  //   this.router.navigate(['home/cart'])
  // }

  navigateToCart() {
    if (this.userService.isUserauthenticated) {
      this.router.navigate(['home/cart']);
    } else {
      this.router.navigate(['home/login']);
      alert('Please log in to add items to your cart.');
    }
  }
  

  logout(): void {
    this.userService.logout();
    this.cartStoreItem.clearCart(); 
    this.router.navigate(['/home/login']);

  }

  pastOrders(): void {
    this.router.navigate(['home/pastorders']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}