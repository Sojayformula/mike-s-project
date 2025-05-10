import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationServiceService } from '../services/authentication-service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor(private router: Router, private auth: AuthenticationServiceService) { }

  canActivateChild(): boolean { 
  if(this.auth.isLoggedIn()){
    return true
  }else{
    this.router.navigate(['/signIn'])
    return false
  }
}
}
