import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubcategoryService } from '../../core/services/subcategory.service';
import { Isubcat } from '../../core/interfaces/isubcat';

@Component({
  selector: 'app-cat-details',
  standalone: true,
  imports: [RouterLink],

  templateUrl: './cat-details.component.html',
  styleUrl: './cat-details.component.scss',
})
export class CatDetailsComponent {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);
  private readonly _SubcategoryService = inject(SubcategoryService);
  specificCat: Icategory | null = null;

  categoryitems: Icategory[] = [];
  categoryId:string |null=''
  subcategoryItems: Isubcat[]=[];


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this.categoryId = p.get('id');

        this._CategoriesService.getSpecificCategories(this.categoryId).subscribe({
          next: (res) => {
            console.log(res.data);
            this.specificCat = res.data;
            console.log("categoryid",this.categoryId);

          },
          error: (err) => {
            console.log(err);
          },
        });


      },
    });
    this._NgxSpinnerService.show('loading-3');
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryitems = res.data;
        console.log(this.categoryitems);
        this._NgxSpinnerService.hide('loading-3');
      },
    });
  }


}
