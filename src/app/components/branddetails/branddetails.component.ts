import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrands } from '../../core/interfaces/ibrands';

@Component({
  selector: 'app-branddetails',
  standalone: true,
  imports: [],

templateUrl: './branddetails.component.html',
  styleUrl: './branddetails.component.scss'
})
export class BranddetailsComponent {
  private readonly _ActivatedRoute = inject(ActivatedRoute)
  private readonly _BrandsService = inject(BrandsService)


  brandId: string | null= null;
  brandDetail : Ibrands = {} as Ibrands

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({

      next: (params) => {
        console.log(params);

        let brandId = params.get('id')

        this._BrandsService.getSpecificbrand(brandId).subscribe({
next:(res)=>{
console.log(res);

this.brandDetail= res.data

}

        })
      }
  })
}
}
