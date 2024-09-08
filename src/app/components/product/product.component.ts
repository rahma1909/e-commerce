import { Component, inject, NgModule } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Iproduct } from '../../core/interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist.service';
import { FormsModule, NgModel } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterLink,FormsModule,SearchPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
private _ProductsService=inject(ProductsService)
private _CartService=inject(CartService)
private _ToastrService=inject(ToastrService)
private _WishlistService=inject(WishlistService)
productID  : string='';
productList:Iproduct[]=[]
text: string = '';
ngOnInit(): void {
  this._ProductsService.getallproducts().subscribe({
    next: (res) => {
      console.log('products', res.data);
      this.productList = res.data;
    },
  });

}
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
addPro(id:string):void{
  this._WishlistService.addProductToWish(id).subscribe({
    next: (res) => {

      this.productID = res.data[0];
      console.log(this.productID);
      // id
      // this._ToastrService.success(res.message);
    },
    error: (err) => {
      console.log(err);
    },
  });
}
}
