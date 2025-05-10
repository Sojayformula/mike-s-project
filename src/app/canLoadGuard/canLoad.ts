import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationServiceService } from '../services/authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private router: Router, private auth: AuthenticationServiceService) { }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    //const isAuthenticated = !!localStorage.getItem('Token');

    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/sigIn']);
      return false; 
    }
  }
}
