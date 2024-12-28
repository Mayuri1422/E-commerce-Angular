import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartStoreItem } from '../cart/cart.storeItem';
import { Order } from '../../types/order.types';
import { OrderItem } from '../../types/order.types';
import { DeliveryAddress } from '../../types/cart.types';
import { UserService } from '../user/user-service.service';
import { PastOrder, PastOrderProduct } from '../../types/order.types';
@Injectable()
export class OrderService {

  constructor(private http: HttpClient, private cartStoreItem: CartStoreItem, private userService: UserService) { }

  saveOrder(deliveryAddress: DeliveryAddress, userEmail: string): Observable<any> {
    const url: string = 'http://localhost:5001/orders/add';
    const orderDetails: OrderItem[] = [];
    this.cartStoreItem.cart.products.forEach(product => {
      const orderItem: OrderItem = {
        productId: product.product.id,
        price: product.product.price,
        qty: product.quantity,
        amount: product.amount,

      };
      orderDetails.push(orderItem);
    });
    const order: Order = {
      userName: deliveryAddress.userName,
      address: deliveryAddress.address,
      city: deliveryAddress.city,
      state: deliveryAddress.state,
      pin: deliveryAddress.pin,
      total: this.cartStoreItem.cart.totalAmount,
      userEmail: userEmail,
      orderDetails: orderDetails
    };
    return this.http.post(url, order, {
      headers: { authorization: this.userService.token },
    });
  }

  getOrders(userEmail: string): Observable<PastOrder[]> {
    const url = `http://localhost:5001/orders/allorders?userEmail=${userEmail}`;
    return this.http.get<PastOrder[]>(url,
      {
        headers: {
          authorization: this.userService.token
        }
      });
  }

  getOrderProducts(orderId: number): Observable<PastOrderProduct[]> {
    const url = `http://localhost:5001/orders/orderproducts?orderId=${orderId}`;
    return this.http.get<PastOrderProduct[]>(url, {
      headers: {
        authorization: this.userService.token
      }
    });
  }
}