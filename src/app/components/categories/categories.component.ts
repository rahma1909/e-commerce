import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Icategory } from '../../core/interfaces/icategory';
import { RouterLink } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  categoriesList: WritableSignal<Icategory[]> = signal([]);

  private readonly _CategoriesService=inject(CategoriesService)
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log('categories', res.data);

        this.categoriesList.set(res.data);
     
      },
    });
  }
}
