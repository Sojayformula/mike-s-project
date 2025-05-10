import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login-model'; 
import { environment } from '../environment/environment copy'; 

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private http:HttpClient) { }

  login(item:LoginModel):Observable<any>{
   return this.http.post<LoginModel>(environment.baseUrl + '/auth/login',item,)
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); 
  }

  // isLoggedIn(){
  //   const isLoggedIn = localStorage.getItem('isUserLogin');
  //   return isLoggedIn === 'true';
  // }
}






















// isLoggedIn(): boolean {
  //   return !!localStorage.getItem('token'); 
  // }