import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../routeguardSer/auth-service.guard'; 


export const authguardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  

const expiry = Number(localStorage.getItem('tokenExpiry'));


if (Date.now() > expiry) {
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExpiry');
  authService.createNotification('top', 'error', 'Session Expired', 'Please log in again.');
  router.navigate(['/signIn']);
 
  return false;
}
  return true;


}





//   if (authService.isAuthenticated()) {
//     return true ;
//   } else {

//     authService.createNotification('top', 'error', 'Session Expired', 'Please log in again.');

//     router.navigate(['signIn']);
//   return false }
// };
