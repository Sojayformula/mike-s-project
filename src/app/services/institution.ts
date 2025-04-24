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

  constructor(private http:HttpClient) { }   //leaveTypeData: leavetypeModel


  fetchAllLeaves( item: getLeaveModel):Observable<any>{
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


// createLeave(item:leaveModel):Observable<any>{
//   return this.http.post(environment.baseUrl + '/leave/create',item)
// }


getLeaveType(leaveTypeData: leavetypeModel): Observable<any> {
  let url = `${environment.baseUrl}/leave-types/list-leave-types`;

  // Add pagination or filtering params if necessary
  let isFirstParam = true;
  if (leaveTypeData.page) {
    url += `${isFirstParam ? '?' : '&'}page=${leaveTypeData.page}`;
    isFirstParam = false;
  }
  if (leaveTypeData.pageSize) {
    url += `${isFirstParam ? '?' : '&'}pageSize=${leaveTypeData.pageSize}`;
    isFirstParam = false;
  }

  return this.http.get<any>(url); // Make the HTTP GET request
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

  return this.http.get<departmentModel>(url)
}

// isAuthenticated(): boolean {
//   const token = localStorage.getItem('token');
//   return !!token;
// }

}
