import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getDepartmentModel, getEmployeeModel } from '../models/employee-model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environment/environment copy';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  fetchEmployees(item: getEmployeeModel): Observable<any>{ 
    console.log("give me leaves",item)
    let url = `${environment.baseUrl}/employees`     

    let isFirstParam = true;

    if (item.page) {
      url += `${isFirstParam ? '?' : '&'}page=${item.page}`;
      isFirstParam = false;
    }
    if (item.pageSize) {
      url += `${isFirstParam ? '?' : '&'}pageSize=${item.pageSize}`;
      isFirstParam = false;
    }
    if (item.search){
      url += `${isFirstParam ? '?' : '&'}search=${item.search}`;
      isFirstParam = false;
    }

    if (item.maritalStatus){
      url += `${isFirstParam ? '?' : '&'}maritalStatus=${item.maritalStatus}`
      isFirstParam = false;
    }

    if (item.department) {
      url += `${isFirstParam ? '?' : '&'}department=${item.department}`;
      isFirstParam = false;
    }
  
    
    
    return this.http.get(url)
  }



  fetchDepartment(item: getDepartmentModel): Observable<any>{ 
    console.log("give me departments",item)
    let url = `${environment.baseUrl}/department/list-department`     

    let isFirstParam = true;

    if (item.page) {
      url += `${isFirstParam ? '?' : '&'}page=${item.page}`;
      isFirstParam = false;
    }
    if (item.pageSize) {
      url += `${isFirstParam ? '?' : '&'}pageSize=${item.pageSize}`;
      isFirstParam = false;
    }
    if (item.search){
      url += `${isFirstParam ? '?' : '&'}search=${item.search}`;
      isFirstParam = false;
    }    
    
    return this.http.get(url)
  }



}


    

















// (environment.baseUrl + '/employees?page=1&pageSize=10')

 //   let url = `${environment.baseUrl}/employees`;

  //   const params = [];

  //   if (item.page) {
  //     params.push(`page=${item.page}`);
  //   }
  //   if (item.pageSize) {
  //     params.push(`pageSize=${item.pageSize}`);
  //   }

  //   if (params.length) {
  //     url += '?' + params.join('&');
  //   }

  //   console.log('Final URL:', url);

  //   return this.http.get(url);
  // }

  //   let url = `${environment.baseUrl}/employees?page=1&pageSize=10`     

  //   let isFirstParam = true;

  //   if (item.page) {
  //     url += `${isFirstParam ? '?' : '&'}page=${item.page}`;
  //     isFirstParam = false;
  //   }
  //   if (item.pageSize) {
  //     url += `${isFirstParam ? '?' : '&'}pageSize=${item.pageSize}`;
  //     isFirstParam = false;
  //   }
   
  //   return this.http.get(url)
  // }

  // console.log("employees",item)