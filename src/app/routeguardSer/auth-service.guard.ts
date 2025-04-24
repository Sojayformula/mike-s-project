
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private notification: NzNotificationService) {}

  createNotification(position: 'top', type: 'success'| 'info'| 'warning'| 'error', title: string, message: string ){
    this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000});
  }
  
  isAuthenticated(){
    const token = localStorage.getItem('token');
    return !!token; 
  }

 
  logout(){
    localStorage.removeItem('token');
  }











  isTokenExpired(): boolean {
    const expiry = Number(localStorage.getItem('tokenExpiry'));
    return !expiry || Date.now() > expiry;
  }

  logoutAndRedirect(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    this.createNotification('top', 'error', 'Session Expired', 'Please log in again.');
  }
}
















 // // Optional: Get token
  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }

  // Check if the user is logged in (based on token presence)
  // isAuthenticated(): boolean {
  //   const token = localStorage.getItem('token');
  //   return !!token; 
  // }

  // // Optional: Clear token (for logout)
  // logout(): void {
  //   localStorage.removeItem('token');
  // }

