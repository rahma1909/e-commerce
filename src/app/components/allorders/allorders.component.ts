import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { CartItem, Iorders } from '../../core/interfaces/iorders';
import { Itoken } from '../../core/interfaces/itoken';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],

  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  private readonly _OrdersService = inject(OrdersService);

  cartItems: Iorders = {} as Iorders;

  userId: string = this._OrdersService.decodedToken.id;

  ngOnInit(): void {
    console.log(this.userId);
    this._OrdersService.getUserOrders(this.userId).subscribe({
      next: (res) => {

          this.cartItems = res[0];
          console.log(this.cartItems);

      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
