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

  // forgot(item:ForgotModel):Observable<any>{
  //  return this.http.post<ForgotModel>(environment.baseUrl + '/auth/forget-password', item, {observe: 'response'})
  // }
  
  // reset(item:ResetModel):Observable<any>{
  //   return this.http.post<ResetModel>(environment.baseUrl + '/auth/reset-password', item, {observe: 'response'})
  // }

  //update(item:updateModel):Observable<any>{
  //   const myToken = localStorage.getItem('token')
  //   const ama: HttpHeaders = new HttpHeaders({
  //     Authorization: `Bearer ${myToken}`,
  // });
  //   return this.http.patch<updateModel>(environment.baseUrl + '/auth/update-password',item)
  // }

  getUser():Observable<any>{
    return this.http.get(environment.baseUrl+ `leave?leaveStatus=PENDING&leaveType=CASUAL_LEAVE&page=1&pageSize=10`)
   }

  //  delete():Observable<any>{
    // return this.http.delete<LoginModel>('abigail.com')
  //  }




//   getLeaveType(item: leavetypeModel):Observable<any>{
//     return this.http.get(environment.baseUrl + '/leave-types/list-leave-types')
//    }

}



