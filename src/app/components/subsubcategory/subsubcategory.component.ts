import { Component, inject } from '@angular/core';
import { SubcategoryService } from '../../core/services/subcategory.service';
import { Isubcat } from '../../core/interfaces/isubcat';
import { ActivatedRoute } from '@angular/router';
import { Isubsubcat } from '../../core/interfaces/isubsubcat';

@Component({
  selector: 'app-subsubcategory',
  standalone: true,
  imports: [],
  templateUrl: './subsubcategory.component.html',
  styleUrl: './subsubcategory.component.scss',
})
export class SubsubcategoryComponent {
  private readonly _SubcategoryService = inject(SubcategoryService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  subsubItems: Isubsubcat = {} as Isubsubcat;
  subId: string | null = '';

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this.subId = p.get('id');

        console.log(this.subId);

        this._SubcategoryService.getspaSubCategories(this.subId!).subscribe({
          next: (res) => {
            console.log(res);
            this.subsubItems = res;
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
  }

}
