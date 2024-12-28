import { Component, OnInit, OnDestroy } from '@angular/core';
import { PastOrder, PastOrderProduct } from '../../types/order.types';
import { OrderService } from '../../services/order/order.service';
import { UserService } from '../../services/user/user-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.css']
})
export class PastOrdersComponent implements OnInit {
  pastOrderProducts: PastOrderProduct[] = [
    // {
    //   amount: 100,
    //   price: 50,
    //   productId: 1,
    //   productImage: 'shop1.jpg',
    //   productName: 'Jacket',
    //   qty: 2
    // }
  ];


  pastOrder: PastOrder;
  // {
  // address: 'Address',
  // city: 'New Jersey',
  // state: 'NY',
  // pin: '12345',
  // total: 100,
  // userName: 'Thomas Brown',
  // orderDate: '25/12/24'
  // };
  pastOrders: PastOrder[] = [];
  subscription: Subscription = new Subscription();

  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.subscription.add(this.orderService.getOrders(this.userService.loggedInUser.email).subscribe(
      pastOrders => {
        this.pastOrders = pastOrders;
      }
    ))
  }
  selectOrder(event: any): void {
    if (Number.parseInt(event.target.value) > 0) {
      this.pastOrder = this.pastOrders.filter(
        (order) => order.orderId === Number.parseInt(event.target.value)
      )[0];
      this.getOrderProducts(this.pastOrder.orderId);
    } else {
      this.pastOrder = <any>undefined;
      this.pastOrderProducts = [];
    }
  }

  getOrderProducts(orderId: number): void {
    this.subscription.add(
      this.orderService.getOrderProducts(orderId).subscribe(
        (products) => (this.pastOrderProducts = products)
      )
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
