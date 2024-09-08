import {
  Component,
  ElementRef,
  inject,
  ViewChild,
  OnInit,
  Signal,
  computed,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../../core/services/auth.service';
import { HomeComponent } from '../home/home.component';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MytranslateService } from '../../core/services/mytranslate.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [
    MatIconModule,
    MatBadgeModule,
    MatSidenavModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    RouterOutlet,
    RouterLink,
    HomeComponent,
    CarouselModule,
    TranslateModule,
  ],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss',
})
export class NavBlankComponent {
  readonly _AuthService = inject(AuthService);
  readonly _Router = inject(Router);
  readonly _ActivatedRoute = inject(ActivatedRoute);
  readonly _MytranslateService = inject(MytranslateService);
  readonly _TranslateService = inject(TranslateService);
  readonly _CartService = inject(CartService);
  countNum:Signal<number> = computed(()=>this._CartService.cartNumber());
  opened = false;

  growHeight(): any {
    this.opened = !this.opened;
  }


  ngOnInit(): void {
// handeling of reload
this._CartService.getproductsfromcart().subscribe({
  next:(data)=>{
    console.log(data);
    this._CartService.cartNumber.set(data.numOfCartItems)

  }
})





  }



  change(lang: string): void {
    this._MytranslateService.changeLang(lang);
  }
}
