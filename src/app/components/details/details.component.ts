import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Iwish } from '../../core/interfaces/iwish';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CarouselModule,NgClass],

templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  specificProduct: Iproduct |null= null;
  sspecificProduct: Iproduct ={} as Iproduct;
  specificProductsub!: Subscription;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let productid = p.get('id');
        // call api specific products
        this.specificProductsub = this._ProductsService
          .getspecificproducts(productid)
          .subscribe({
            next: (res) => {
              console.log(res.data);
              this.specificProduct = res.data;
              this.sspecificProduct=res.data
            },
            error: (err) => {
              console.log(err);
            },
          });
      },
    });
  }

  ngOnDestroy(): void {
    this.specificProductsub.unsubscribe();
  }

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
  private readonly _WishlistService = inject(WishlistService);
  private readonly _ToastrService = inject(ToastrService);

  wishData: Iwish[] = [];
  wishListData: Iwish = {} as Iwish
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

  productID  : string='';
  products:Iproduct={} as Iproduct
  wishListDataa: string[] = [];
  wishlistdata:Iwish[]=[]

  addPro(id: string): void {
    // Check if the product is already in the wishlist to avoid duplicate entries
    if (!this.wishListDataa.includes(id)) {
      this._WishlistService.addProductToWish(id).subscribe({
        next: (response) => {
          // Assuming response.data contains the updated wishlist data
          this.productID = response.data;
         this. wishlistdata=response.data
          // Add the product ID to wishListData array
          this.wishListDataa.push(id);

          // Show success message
          this._ToastrService.success(response.message);

          // Log the updated wishlist
          console.log(this.wishListDataa);
          console.log(this.productID);
        },
        error: (err) => {
          this._ToastrService.error('Failed to add product to wishlist');
          console.error(err);
        }
      });
    } else {
      // Optionally show a message if the product is already in the wishlist
      this._ToastrService.info('Product is already in your wishlist');
    }
  }
}
