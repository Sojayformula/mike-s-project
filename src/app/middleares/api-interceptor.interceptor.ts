import { HttpInterceptorFn } from '@angular/common/http';
import { LoginModel } from '../models/login-model';

export const apiInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Outgoing HTTP request', req);

  const token = localStorage.getItem('token')

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  // return next.handle(authReq);

   return next(authReq);
};