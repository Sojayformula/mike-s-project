// import { HttpInterceptorFn } from '@angular/common/http';
// import { NgForm } from '@angular/forms';
// import { Observable } from 'rxjs';

// export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };



// import { HttpInterceptorFn } from '@angular/common/http';
// import { LoginModel } from '../models/login-model';

// export const apiInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
//   console.log('Outgoing HTTP request', req);

//   const token = localStorage.getItem('token')

//   const authReq = req.clone({
//     setHeaders: {
//       Authorization: `Bearer ${token}`
//     }
//   });

//   // return next.handle(authReq);

//    return next(authReq);
// };