import { HttpInterceptorFn } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};