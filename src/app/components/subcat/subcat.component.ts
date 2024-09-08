import { Component, inject } from '@angular/core';
import { SubcategoryService } from '../../core/services/subcategory.service';
import { Isubcat } from '../../core/interfaces/isubcat';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Isubsubcat } from '../../core/interfaces/isubsubcat';

@Component({
  selector: 'app-subcat',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './subcat.component.html',
  styleUrl: './subcat.component.scss',
})
export class SubcatComponent {
  private readonly _SubcategoryService = inject(SubcategoryService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  subcategoryItems: Isubcat[] = [];

  subsubItems: Isubsubcat = {} as Isubsubcat;

  subId: string | null = '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let id = p.get('id')!;
        console.log(id);
        this._SubcategoryService.getAllSubCategories(id).subscribe({
          next: (res) => {
            console.log('data', this.subsubItems);

            this.subcategoryItems = res.data;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });

    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this.subId = p.get('id');

        console.log(this.subId);

        this._SubcategoryService.getspaSubCategories(this.subId!).subscribe({
          next: (res) => {
            console.log('x',this.subsubItems);
            this.subsubItems = res.data;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }





}
