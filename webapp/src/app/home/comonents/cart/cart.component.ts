import { Component } from '@angular/core';
import { CartStoreItem } from '../../services/cart/cart.storeItem';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../../types/cart.types';
import { Router } from '@angular/router';
import { OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user-service.service';
import { loggedInUser } from '../../types/user.type';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order/order.service';
import { DeliveryAddress } from '../../types/cart.types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  faTrash = faTrash;
  orderForm: FormGroup;
  user: loggedInUser;
  subscription: Subscription = new Subscription();
  alertType: number = 0;
  alertMessage: string = '';
  disableCheckout: boolean = false;
  constructor(
    public cartStoreItem: CartStoreItem,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private orderService: OrderService
  ) {
    this.user = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      pin: '',
      email: ''
    }
    this.subscription.add(
      userService.loggedInUser$.subscribe(loggedUser => {
        if (loggedUser.firstName) {
          this.user = loggedUser;
        }
      })
    );
  }

  navigateToHome(): void {
    this.router.navigate(['home/products']);
  }

  updateQuantity($event: any, cartItem: CartItem): void {
    if ($event.target.innerText === '+') {
      this.cartStoreItem.addProducts(cartItem.product);
    } else if ($event.target.innerText === '-') {
      this.cartStoreItem.decreaseProductQuantity(cartItem)
    }
  }

  removeItem(cartItem: CartItem): void {
    this.cartStoreItem.removeProduct(cartItem);
  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      name: [`${this.user.firstName} ${this.user.lastName}`, Validators.required],
      address: [this.user.address, Validators.required],
      city: [this.user.city, Validators.required],
      state: [this.user.state, Validators.required],
      pin: [this.user.pin, Validators.required],
    })
  }

  onSubmit(): void {
    if (this.userService.isUserauthenticated) {
      const deliveryAddress: DeliveryAddress = {
        userName: this.orderForm.get('name')?.value,
        address: this.orderForm.get('address')?.value,
        city: this.orderForm.get('city')?.value,
        state: this.orderForm.get('state')?.value,
        pin: this.orderForm.get('pin')?.value,
      };
      this.subscription.add(
        this.orderService.saveOrder(deliveryAddress, this.user.email).subscribe({
          next: result => {
            this.cartStoreItem.clearCart();
            this.alertType = 0;
            this.alertMessage = 'Order Registered Succesfully';
            this.disableCheckout = true;
            alert(this.alertMessage);
          },
          error: (error) => {
            this.alertType = 2;
            if (error.error.message === 'Authentication Failed!') {
              this.alertMessage = 'Please log in to register your order.';
            } else {
              this.alertMessage = error.error.message;
            }
          }
        })
      )
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}