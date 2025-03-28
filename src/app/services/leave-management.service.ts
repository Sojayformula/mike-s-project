import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment copy'; 
import { LeaveType } from '../models/leaveMgt';
//import { leaveModel, leavetypeModel } from '../models/leave.model';
import { leaveModel, leavetypeModel } from '../models/leaveModel';
import { decideLeaveModel } from '../models/decide-leave.model';
import { getLeaveModel, mediaModel, departmentModel } from '../models/get-leave.model';


@Injectable({
  providedIn: 'root'
})
export class LeaveManagementService {

  constructor(private http:HttpClient) { }

  fetchAllLeaves(leaveStatus: string, leaveType: string, page: string, pageSize: string, searchQuery: string, item: getLeaveModel):Observable<any>{
    console.log("give me leaves",item)
    let url = `${environment.baseUrl}/leave/list-all-leaves`

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
    if (item.leaveStatus) {
      url += `${isFirstParam ? '?' : '&'}leaveStatus=${item.leaveStatus}`;
      isFirstParam = false;
    }
    if (item.leaveType) {
      url += `${isFirstParam ? '?' : '&'}leaveType=${item.leaveType}`
    }

    return this.http.get<getLeaveModel>(url)
  }


createLeave(item:leaveModel):Observable<any>{
  return this.http.post(environment.baseUrl + '/leave/create',item)
}

 getLeaveType(item:leavetypeModel):Observable<any>{
  return this.http.get(environment.baseUrl + '/leave-types/list-leave-types')
 }

 decideLeave(item:decideLeaveModel):Observable<any>{
  return this.http.post(environment.baseUrl + '/leave/decide-on-leave',item)
 }

 uploadFile(file:File):Observable<any>{
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post(environment.baseUrl + '/media/upload',formData)
 }

 listDepartment(item: departmentModel): Observable<any> {

  console.log('what we expect:', item)
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
  // if (item.department) {
  //   url += `${isFirstParam ? '?' : '&'}department=${item.department}`;
  //   isFirstParam = false;
  // }
  // if (item.employeeStatus) {
  //   url += `${isFirstParam ? '?' : '&'}employeeStatus=${item.employeeStatus}`;
  //   isFirstParam = false;
  // }
  // if (item.search) {
  //   url += `${isFirstParam ? '?' : '&'}search=${item.search}`;
  //   isFirstParam = false;
  // }
  return this.http.get<departmentModel>(url)
}

}

  // fetchAllLeaves(leaveStatus: string, leaveType: string, page: string, pageSize: string, searchQuery: string):Observable<any>{
  //   return this.http.get(environment.baseUrl + `/leave/list-all-leaves?page=${page}&pageSize=${pageSize}`);
  // }

  // searchLeaves(searchQuery: string, page: string, pageSize: string): Observable<any> {
  //   return this.http.get(environment.baseUrl + `/leave/search-leaves?query=${searchQuery}&page=${page}&pageSize=${pageSize}`);
  // }
  
//}