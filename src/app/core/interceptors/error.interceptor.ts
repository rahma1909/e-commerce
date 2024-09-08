import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {


 let _ToastrService=inject(ToastrService)
  return next(req).pipe(
    catchError((err) => {



      console.log('interceptors' ,err.error.message);
     _ToastrService.error(err.error.message,'Amazon')
      return throwError(() => err);
    })
  );
};
