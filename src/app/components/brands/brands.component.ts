import { Component, inject } from '@angular/core';
import { CutTextPipePipe } from '../../core/pipes/cut-text-pipe.pipe';
import { RouterLink } from '@angular/router';
import { Ibrands } from '../../core/interfaces/ibrands';
import { BrandsService } from '../../core/services/brands.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CutTextPipePipe,RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  private readonly _BrandsService = inject(BrandsService)
  constructor() { }
  brands: Ibrands[] = []


  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
        console.log('brands', res);

      },
    });
  }
}
