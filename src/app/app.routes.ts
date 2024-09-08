import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then((m) => m.RegisterComponent),
      },
      {
        path: 'forget',
        loadComponent: () =>
          import('./components/forget/forget.component').then((m) => m.ForgetComponent),
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'product',
        loadComponent: () =>
          import('./components/product/product.component').then((m) => m.ProductComponent),
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then((m) => m.BrandsComponent),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then((m) => m.CategoriesComponent),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then((m) => m.CartComponent),
      },
      {
        path: 'datails/:id',
        loadComponent: () =>
          import('./components/details/details.component').then((m) => m.DetailsComponent),
      },
      {
        path: 'categories/:id',
        loadComponent: () =>
          import('./components/cat-details/cat-details.component').then((m) => m.CatDetailsComponent),
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/allorders/allorders.component').then((m) => m.AllordersComponent),
      },
      {
        path: 'orders/:id',
        loadComponent: () =>
          import('./components/orders/orders.component').then((m) => m.OrdersComponent),
      },
      {
        path: 'categories/:id/subcategories',
        loadComponent: () =>
          import('./components/subcat/subcat.component').then((m) => m.SubcatComponent),
      },
      {
        path: 'subcategories/:id',
        loadComponent: () =>
          import('./components/subsubcategory/subsubcategory.component').then((m) => m.SubsubcategoryComponent),
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./components/wishlist/wishlist.component').then((m) => m.WishlistComponent),
      },
      {
        path: 'branddetails/:id',
        loadComponent: () =>
          import('./components/branddetails/branddetails.component').then((m) => m.BranddetailsComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/notfound/notfound.component').then((m) => m.NotfoundComponent),
  },
];
