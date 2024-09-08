import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { Iproduct } from '../../core/interfaces/iproduct';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);
  specificProduct: Iproduct |null= null;
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
}
