import { Component, inject, RendererFactory2 } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Iwish } from '../../core/interfaces/iwish';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgClass, NgFor } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CarouselModule, NgFor,RouterLink,NgClass],

  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  private readonly _WishlistService = inject(WishlistService);
  private readonly _ToastrService = inject(ToastrService);


  wishData: Iwish[] = [];
  wishListData: Iwish = {} as Iwish
  productID:string=''

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };
  ngOnInit(): void {


    this._WishlistService.getWishList().subscribe({
      next: (res) => {

        this.wishData = res.data;


        console.log('allwishlist', res.data);

      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  deletefromwish(id: string): void {
    this._WishlistService.removeProductFromWish(id).subscribe({
      next: (res) => {
        console.log(res);
        this.wishListData=res.data
        // Update wishData by filtering out the deleted product
        this.wishData = this.wishData.filter(item => item.id !== id);
        this._ToastrService.success('Product removed from wishlist');
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error('Failed to remove product from wishlist');
      }
    });
  }



}
