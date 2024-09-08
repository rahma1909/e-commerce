import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  viewChild,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

import { CurrencyPipe, NgClass, UpperCasePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Icategory } from '../../core/interfaces/icategory';
import { Iproduct } from '../../core/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TexttermPipe } from '../../core/pipes/textterm.pipe';
import { CartService } from '../../core/services/cart.service';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { SubcategoryService } from '../../core/services/subcategory.service';
import { Console } from 'console';
import { WishlistService } from '../../core/services/wishlist.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CarouselModule,
    RouterLink,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    UpperCasePipe,
    CurrencyPipe,
    TexttermPipe,
    SearchPipe,
    FormsModule,
    TranslateModule,
    NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  productsList:Iproduct[] =[]
  categoriesList: WritableSignal<Icategory[]> = signal([]);
  categoriessub!: Subscription;
  getproductlistsub!: Subscription;

  @ViewChild('layer') mylayer!: ElementRef;
  @ViewChild('mattooler') mymat!: ElementRef;
  @ViewChild('matsidenav') mysidenav!: ElementRef;

  private readonly _ProductsService = inject(ProductsService);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _CartService = inject(CartService);

  private readonly _ToastrService = inject(ToastrService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);
  private readonly _WishlistService = inject(WishlistService);





 productID  : string='';
  products:Iproduct={} as Iproduct
  text: string = '';
  opened = false;
  categoryitems: WritableSignal<Icategory[]> = signal([]);
  wishListData: string[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    rtl: true,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: false,
  };

  ngOnInit(): void {
    this._WishlistService.getWishList().subscribe({
      next: (response) => {
        const newData = response.data.map((item: any) => item._id)//returns array but diff format
        this.wishListData = newData;
        console.log(response, 'd');
      }
    });
    this._NgxSpinnerService.show('loading-3');
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log('categories', res.data);

        this.categoriesList.set(res.data);
        this._NgxSpinnerService.hide('loading-3');
      },
    });

    this._ProductsService.getallproducts().subscribe({
      next: (res) => {
        console.log('products', res.data);
        this.productsList = res.data;
      },
    });

    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryitems.set(res.data);
        console.log(this.categoryitems);
      },
    });






  }

  ngOnDestroy(): void {
    this.getproductlistsub?.unsubscribe();
    this.categoriessub?.unsubscribe();
  }

  growHeight(): any {
    this.opened = !this.opened;
  }

  displayFunction(): void {
    if (this.opened) {
      this.mylayer.nativeElement.classList.remove('d-none');
    } else {
      this.mylayer.nativeElement.classList.add('d-none');
    }
  }

  customOptionss: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: false,
    autoplayTimeout: 2000,
    navSpeed: 700,
    navText: ['', ''],

    items: 1,

    nav: false,
  };



  addCart(id: string): void {
    this._CartService.AddproductsToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, 'Amazon');
        this._CartService.cartNumber.set(res.numOfCartItems);
        console.log('res', this._CartService.cartNumber);
      },
    });
  }

  addPro(id: string): void {
    // Check if the product is already in the wishlist to avoid duplicate entries
    if (!this.wishListData.includes(id)) {
      this._WishlistService.addProductToWish(id).subscribe({
        next: (response) => {
          // Assuming response.data contains the updated wishlist data
          this.productID = response.data;

          // Add the product ID to wishListData array
          this.wishListData.push(id);

          // Show success message
          this._ToastrService.success(response.message);

          // Log the updated wishlist
          console.log(this.wishListData);
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
