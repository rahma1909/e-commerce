import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Icart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],

  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  cartdetails: Icart = {} as Icart;

  ngOnInit(): void {
    this._CartService.getproductsfromcart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartdetails = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(id: string): void {
    this._CartService.deleteProductsCart(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartdetails = res.data;

        this._ToastrService.error('product deleted');
        console.log(res.numOfCartItems);

        this._CartService.cartNumber.set(res.numOfCartItems);

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updatecount(id: string, count: number): void {
    if (count > 0) {
      this._CartService.updateProductsCart(id, count).subscribe({
        next: (res) => {
          console.log(res.data);
          this.cartdetails = res.data;

          this._ToastrService.success('product updated');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  clearCartWithConfirmation(): void {
    Swal.fire({
      title: 'Are you sure you want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        this._CartService.clearCart().subscribe({
          next: (res) => {

            if (res.message === 'success') {
              this.cartdetails = {} as Icart; // Clear cart details
              Swal.fire('Deleted!', 'Your cart has been cleared.', 'success');
              this._CartService.cartNumber.set(0);
            }
          },
          error: (err) => {
            console.log(err);
            Swal.fire(
              'Error',
              'There was an issue clearing your cart.',
              'error'
            );
          },
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your cart is safe :)', 'error');
      }
    });
  }
}
