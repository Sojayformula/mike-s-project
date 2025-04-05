import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel, LoginResponseModel } from '../models/login-model'; 
import { environment } from '../environment/environment copy'; 

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  constructor(private http:HttpClient) { }

  login(item:LoginModel):Observable<any>{
   return this.http.post<LoginModel>(environment.baseUrl + '/auth/login',item,)
  }

}