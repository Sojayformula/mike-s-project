
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationServiceService } from '../services/authentication-service.service'; // Import your authentication service

   @Injectable({
     providedIn: 'root'
   })
   export class AuthGuard implements CanActivate {
     constructor( private authService: AuthenticationServiceService,
      private router: Router) {}

     canActivate(): boolean {
      if (this.authService.isLoggedIn()) {
        return true; 
      } else {
        this.router.navigate(['/signIn']);
        return false;
      }
    }
   }



   






 //  canActivate(): boolean {
    //    if (this.authService.isLoggedIn()) {
    //      return true; 
    //    } else {
         
    //      this.router.navigate(['/signIn']);
    //      return false;
    //    }
    //  }


// import { Injectable } from '@angular/core';
// import { NzNotificationService } from 'ng-zorro-antd/notification';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {

//   constructor(private notification: NzNotificationService) {}

//   createNotification(position: 'top', type: 'success'| 'info'| 'warning'| 'error', title: string, message: string ){
//     this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000});
//   }
  
//   isAuthenticated(){
//     const token = localStorage.getItem('token');
//     return !!token; 
//   }

 
//   logout(){
//     localStorage.removeItem('token');
//   }