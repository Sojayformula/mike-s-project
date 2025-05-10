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










// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { FormControl, FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { saveAs } from 'file-saver';
// import { leaveModel, leavetypeModel } from '../models/leaveModel';
// import { decideLeaveModel } from '../models/decide-leave.model';
// import { getLeaveModel, mediaModel, departmentModel } from '../models/get-leave.model';
// import { LeaveManagementService } from '../services/institution';
// import { NzNotificationService } from 'ng-zorro-antd/notification';
// import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
// import { NzIconModule } from 'ng-zorro-antd/icon';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { debounceTime, distinctUntilChanged } from 'rxjs';
// import { BehaviorSubject } from 'rxjs';
// import { NzSelectModule } from 'ng-zorro-antd/select'
// import { NzModalModule } from 'ng-zorro-antd/modal'
// import { NzFormModule } from 'ng-zorro-antd/form';


// import { Subject } from 'rxjs';





// // export class GetLeaveModel {
// //   leaveStatus?: string;
// //   leaveType?: string;
// //   department?: string;
// //   search?: string;
// // }

// @Component({
//   selector: 'app-institutions',
//   imports: [CommonModule, NzDropDownModule, NzFormModule, NzIconModule, FormsModule, NzSelectModule, NzModalModule],
//   templateUrl: './institutions.component.html',
//   styleUrl: './institutions.component.scss'
// })
// export class InstitutionsComponent implements OnInit {

//  // searchControl: any;

 
// approve(arg0: any) {
// throw new Error('Method not implemented.');
// }
// markPending(arg0: any) {
// throw new Error('Method not implemented.');
// }
// decline(arg0: any) {
// throw new Error('Method not implemented.');
// }

// storeId(arg0: any) {
// throw new Error('Method not implemented.');
// }
  
//  apiData: any[] = [];
//  departmentList: any[] = [];
//  //originalData: any[] = [];
 
//  isFilterModalVisible = false;
//  filterData = { department: '', leaveType: '' };
//  departmentOptions: any[] = [];
//  leaveTypeOptions: any[] = [];



//   // getLeaveData!: getLeaveModel;
//   // leaveTypeData!:leavetypeModel;
//   // departmentData!: departmentModel;
//   // pageIndex = 1
//   //  pageSize =  10
//   //  currentPage = 1
//   //  totalItems: number = 25; 
//   //  pageSizeOptions:number[] = [2,5, 10, 20, 30, 50]
//   //  searchQuery: string = ''; // Holds search input value
//   //  totalPages = Math.ceil(this.totalItems / this.pageSize);

//   //  page: any;

//   //  startDate: string = '';
//   // endDate: string = '';
//   // minEndDate: string = '';
//   // decideLeaveData!:decideLeaveModel;
//   //   leaveData!: leaveModel;  



//   leaveData!: leaveModel;
//   getLeaveData!: getLeaveModel;
//   leaveTypeData!:leavetypeModel;
//   decideLeaveData!:decideLeaveModel;
//   uploadFile!: mediaModel;
//   departmentData!: departmentModel;
//   startDate: string = '';
//   endDate: string = '';
//   minEndDate: string = '';
//   pageIndex = 1
//   pageSize =  10
//   currentPage = 1
//   totalItems: number = 0; 
//   pageSizeOptions:number[] = [2,5, 10, 20, 30, 50] 
//   searchQuery: string = ''; // Holds search input value  
//   totalPages = Math.ceil(this.totalItems / this.pageSize);


//   constructor(private cdr: ChangeDetectorRef,  private router:Router, private leaveMgtService:LeaveManagementService,private notification:NzNotificationService) {
  

//     // this.getLeaveData = new getLeaveModel()
//     //  this.leaveTypeData = new leavetypeModel()

//     // this.decideLeaveData = new decideLeaveModel()
//    // this.uploadFile = new mediaModel()
//     //this.departmentData = new departmentModel()


//     //this.getLeaveData = new getLeaveModel()
//     //this.leaveTypeData = new leavetypeModel()
//    // this.departmentData = new departmentModel


//    this.leaveData = new leaveModel()
//    this.getLeaveData = new getLeaveModel()
//    this.leaveTypeData = new leavetypeModel()
//    this.decideLeaveData = new decideLeaveModel()
//    this.uploadFile = new mediaModel()
//    this.departmentData = new departmentModel()
//   }

//   user: string = 'hr';

//   ngOnInit(): void {
//     this.getAllLeaves();
//     this.fetchDepartments(); 
//     this.fetchLeaveTypes();
//   }

  

//   searchLeaves(): void {
//     this.pageIndex = 1; 
//     this.getAllLeaves();
//   }


//   getAllLeaves(): void {

//     // const department = this.getLeaveData.department ? this.getLeaveData.department : '';
//     // const searchQuery = this.searchQuery.trim();
//     // this.getLeaveData.search = this.searchTerm
//     // this.getLeaveData.page = 1
//     // this.getLeaveData.department = 'deparhidaga'


//     const leaveStatus = this.getLeaveData.leaveStatus || '';
//     const leaveType = this.getLeaveData.leaveType || '';
//     const page = this.pageIndex.toString(); 
//     const pageSize = this.pageSize.toString();  
//    // const searchQuery = this.searchQuery || '';
//     const searchQuery = this.searchQuery?.trim() || '';
//     const department = this.getLeaveData.department ? this.getLeaveData.department : '';

  
//     console.log('Calling API with:', this.getLeaveData);
//     // this.getLeaveData, this.leaveTypeData
  
//     this.leaveMgtService.fetchAllLeaves( this.getLeaveData, this.leaveTypeData).subscribe({
//       next: (res) => {
//         console.log('API Response:', res);
//         if (res.leaves.length === 0) {
//           console.warn('No results found for:', searchQuery);
//         }
//         this.apiData = res.leaves; 
//         console.log('Updated Table Data:', this.apiData); 
//       },
//       error: (error) => {
//         console.error('Error fetching leaves:', error);
//       }
//     });
//   }

//   // // leaveTypeList:[]=[];
//   // fetchLeaveTypes(): void {
//   //   this.leaveMgtService.getLeaveType(this.leaveTypeData).subscribe((res) => {
//   //     this.leaveTypeOptions = res.leaveTypes || [];
//   //     console.log('you',this.leaveTypeOptions)
//   //     this.getAllLeaves()
//   //   });
//   // }
//   selectedLeaveType: string = ''; // declare it

//   fetchLeaveTypes(): void {
//     this.leaveMgtService.getLeaveType(this.leaveTypeData).subscribe((res) => {
//       this.leaveTypeOptions = res.leaveTypes || [];
  
//       if (this.leaveTypeOptions.length > 0) {
//         this.selectedLeaveType = this.leaveTypeOptions[0].id; // or leaveTypeOptions[0] depending on format
//       }
  
//       this.getAllLeaves(); // only call after selectedLeaveType is set
//     });
//   }
  
  


//         //filter by search//
//   searchTerm: string = ''; 

//   findMe(){
//     console.log('my searched friend:', this.searchTerm)
//     this.getLeaveData.search = this.searchTerm
//     console.log('sending item:',this.getLeaveData)
//     this.getAllLeaves()
//   }


//   // Function to Toggle ALL APPROVED PENDING DECLINED
//   selectedChoice:string = 'ALL';
//   toggleState:boolean = false;

//   toggleSelect(trim:string){
//     this.getLeaveData.leaveStatus = trim === 'ALL' ? '' :trim;
//     this.getAllLeaves();
//     this.selectedChoice = trim;
//     console.log("toggle some",trim);
//   }
//   onToggleChange(){
//     console.log('Toggle state:', this.toggleState);
//   }


//     //Function to export table data
// exportTableToCSV() {
//   const table = document.getElementById('Data');
//   const rows = table?.querySelectorAll('tr');
//   const csvData = Array.from(rows || []).map(row => {
//     const cols = row.querySelectorAll('td, th');
//     return Array.from(cols)
//       .map(col => col.textContent?.trim() || "")
//       .join(',');
//   }).join('\n');

//   const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
//   saveAs(blob, 'table.csv');
// }



// onPaginateChange(event: PageEvent) {
//   this.pageIndex = event.pageIndex + 1;  
//   this.pageSize = event.pageSize;
//   this.getAllLeaves();
// }

//   // Method to go to the next page
//   nextPage() {
//     if (this.pageIndex < this.totalPages) {
//       this.pageIndex++;
//       this.getAllLeaves();
//     }
//   }

//   // Method to go to the previous page
//   prevPage() {
//     if (this.pageIndex > 1) {
//       this.pageIndex--;
//       this.getAllLeaves();
//     }
//   }

  
//   openFilterModal() {
//     this.isFilterModalVisible = true;
//   }
  
//   closeFilterModal() {
//     this.isFilterModalVisible = false;
//   }
  
//   applyFilters() {
//     this.getLeaveData.department = this.filterData.department;
//     this.getLeaveData.leaveType = this.filterData.leaveType;
//     this.getAllLeaves();
//     this.isFilterModalVisible = false;
//   }



//            //Filter by department//
//   fetchDepartments() {
//     console.log('display',this.departmentData)
//     this.leaveMgtService.listDepartment(this.departmentData).subscribe({
//       next: (res) => {
//         console.log('Fetched Departments:', res); 
  
//         if (res && res.data && res.data.departments) {
//           this.departmentOptions = res.data.departments.map((dept: any) => ({
//             label: dept.name, 
//             value: dept._id   
//           }));
//           console.log('Processed department options:', this.departmentOptions);
//         } else {
//           console.warn('No department data found in API response.');
//         }
//       },
//       error: (err) => console.error('Error fetching departments:', err)
//     });
//   }


//                 //Filter by leave type//
//   // fetchLeaveTypes(): void {
//   //   this.leaveMgtService.getLeaveType( this.leaveTypeData).subscribe({
//   //     next: (res) => {
//   //       console.log('Fetched Leave Types:', res); 
  
//   //       if (res.data.leavetypes) {
//   //         this.leaveTypeOptions = res.data.leavetypes.map((type: any) => ({
//   //           label: type.name, 
//   //           value: type._id    
//   //         }));
//   //         console.log('Processed leave type options:', this.leaveTypeOptions);
//   //       } else {
//   //         console.warn('No leave types found in API response.');
//   //       }
//   //     },
//   //     error: (err) => {
//   //       console.error('Error fetching leave types:', err);
//   //     }
//   //   });
//   // }
  
  
  

//   applyFilter() {
//     this.pageIndex = 1;
//     this.getLeaveData.department = this.filterData.department; 
//     this.getLeaveData.leaveType = this.filterData.leaveType; 
//     this.getAllLeaves(); 
//     this.isFilterModalVisible = false; 
//   }





// //   friends!: getModel[];
// //   searchFor = 'kofi';

// //   findKofi(){
// //     console.log('searchInput', this.searchFor)
// //     for(let get of this.friends){
// //       if(get.firstName == "kofi"){
// //         return get
// //       }
// //       return null
// //     }
// // }


 
//   }

  
//   export class getModel {
//     firstName!: string 
//     password!: string; 
//   }




 








 // this.apiData = [...res.leaves];
        // this.originalData = [...res.leaves]; 
        // console.log('Updated Table Data:', this.apiData);
        // this.cdr.markForCheck();
        // this.cdr.detectChanges();
        // this.totalItems = res.totalItems;
        // this.cdr.detectChanges();

        // { leaveStatus, leaveType, page, pageSize, searchQuery, department }
        //this.originalData = [...res.leaves];


  // fetchDepartments() {
  //   this.leaveMgtService.listDepartment(this.departmentData).subscribe({
  //     next: (res) => {
  //       this.departmentOptions = res.departments.map((dept: any) => ({
  //         label: dept.name,
  //         value: dept._id
  //       }));
  //     },
  //     error: (err) => console.error('Error fetching departments:', err)
  //   });
  // }



 // getAllLeaves(){

  //   const leaveStatus = this.getLeaveData.leaveStatus || '';
  //   const leaveType = this.getLeaveData.leaveType || '';
  //   const page = this.pageIndex.toString();
  //   const pageSize = this.pageSize.toString();
  //   const searchQuery = this.getLeaveData.search || '';  // Make sure search query is included
  //   const department = this.getLeaveData.department ? this.getLeaveData.department : '';

  //   this.leaveMgtService.fetchAllLeaves( leaveStatus, leaveType, page, pageSize, searchQuery,{ ...this.getLeaveData, department } ).subscribe({
  //     next:(res)=>{ 
  //       console.log('API response:', res);
  //       this.apiData = res.leaves;
  //       console.log('responseData', this.apiData);
  //       this.totalItems = res.totalItems;
  //       this.cdr.detectChanges(); 
  //     },
  //     error:(error: any)=>{
  //       console.log("error",error)
  //     },
  //     complete:()=>{
        
  //     }
    
  //   })
  // }





  // filteredData() {
  //   console.log('Search Term:', this.searchTerm);
  
  //   // If no search term, return the full data
  //   if (!this.searchTerm.trim()) {
  //     console.log('No search term provided. Returning full data:', this.apiData);
  //     this.apiData = [...this.originalData]; 

  //     this.cdr.markForCheck();  
  //     this.cdr.detectChanges(); 
  //     return this.apiData;
  //   }
  
  
  //   // Filter the data based on the search term
  //   console.log('Before Filtering:', this.apiData);
  //   const filteredResults = this.apiData.filter((Data) => {
  //     console.log('Checking Item:', Data);
  //     const fullName = `${Data?.appliedBy?.personalDetails?.firstName} ${Data?.appliedBy?.personalDetails?.lastName}`;
  //     if (typeof fullName === 'string') {
  //       return fullName.toLowerCase().includes(this.searchTerm.toLowerCase());
  //     }
  
  //     return false;
  //   });
  
  //   console.log('Filtered Results:', filteredResults);
  //   this.apiData = filteredResults; 
  //   this.cdr.markForCheck();  
  //   this.cdr.detectChanges(); 
  
  //   return filteredResults;
  // }


}



// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
// import { FormControl, FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { saveAs } from 'file-saver';
// import { leaveModel, leavetypeModel } from '../models/leaveModel';
// import { decideLeaveModel } from '../models/decide-leave.model';
// import { getLeaveModel, mediaModel, departmentModel } from '../models/get-leave.model';
// import { LeaveManagementService } from '../services/institution';
// import { NzNotificationService } from 'ng-zorro-antd/notification';
// import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
// import { NzIconModule } from 'ng-zorro-antd/icon';
// import { MatPaginator, PageEvent } from '@angular/material/paginator';
// import { debounceTime, distinctUntilChanged } from 'rxjs';
// import { BehaviorSubject } from 'rxjs';
// import { NzSelectModule } from 'ng-zorro-antd/select'
// import { NzModalModule } from 'ng-zorro-antd/modal'
// import { NzFormModule } from 'ng-zorro-antd/form';
// import { NzPaginationModule } from 'ng-zorro-antd/pagination';



// import { Subject } from 'rxjs';





// // export class GetLeaveModel {
// //   leaveStatus?: string;
// //   leaveType?: string;
// //   department?: string;
// //   search?: string;
// // }

// @Component({
//   selector: 'app-institutions',
//   imports: [CommonModule, NzDropDownModule, NzFormModule, NzIconModule, FormsModule, NzSelectModule, NzModalModule, NzPaginationModule],
//   templateUrl: './institutions.component.html',
//   styleUrl: './institutions.component.scss'
// })
// export class InstitutionsComponent implements OnInit {

//  // searchControl: any;

 
// approve(arg0: any) {
// throw new Error('Method not implemented.');
// }
// markPending(arg0: any) {
// throw new Error('Method not implemented.');
// }
// decline(arg0: any) {
// throw new Error('Method not implemented.');
// }

// storeId(arg0: any) {
// throw new Error('Method not implemented.');
// }
  
//  apiData: any[] = [];
//  departmentList: any[] = [];
//  //originalData: any[] = [];
 
//  isFilterModalVisible = false;
//  filterData = { department: '', leaveType: '' };
//  departmentOptions: any[] = [];
//  leaveTypeOptions: any[] = [];




//   leaveData!: leaveModel;
//   getLeaveData!: getLeaveModel;
//   leaveTypeData!:leavetypeModel;
//   decideLeaveData!:decideLeaveModel;
//   uploadFile!: mediaModel;
//   departmentData!: departmentModel;
//   startDate: string = '';
//   endDate: string = '';
//   minEndDate: string = '';
//   pageIndex = 1
//   pageSize =  10
//   currentPage = 1
//   totalItems: number = 0; 
//   pageSizeOptions:number[] = [5, 10, 20, 30, 50] 
//   searchQuery: string = ''; // Holds search input value  
//   //totalPages = Math.ceil(this.totalItems / this.pageSize);


//   constructor(private cdr: ChangeDetectorRef,  private router:Router, private leaveMgtService:LeaveManagementService,private notification:NzNotificationService) {
  

//    this.leaveData = new leaveModel()
//    this.getLeaveData = new getLeaveModel()
//    this.leaveTypeData = new leavetypeModel()
//    this.decideLeaveData = new decideLeaveModel()
//    this.uploadFile = new mediaModel()
//    this.departmentData = new departmentModel()
//   }

//   user: string = 'hr';

//   ngOnInit(): void {
//     this.getAllLeaves();
//     this.fetchDepartments(); 
//     this.fetchLeaveTypes();
//   }

  

//   // searchLeaves(): void {
//   //   this.pageIndex = 1; 
//   //   this.getAllLeaves();
//   // }


 
//   getAllLeaves(): void {

//     this.getLeaveData.page = this.pageIndex;
//     this.getLeaveData.pageSize = this.pageSize;

//     // Apply the selected filters
//     const department = this.filterData.department ? this.filterData.department : '';
//     const leaveType = this.filterData.leaveType ? this.filterData.leaveType : '';
//     const searchQuery = this.searchQuery.trim();
  
//     // Update `getLeaveData` with selected filters and pagination
//     this.getLeaveData.search = searchQuery;
//     this.getLeaveData.leaveType = leaveType;
//     this.getLeaveData.page = this.pageIndex;  // Current page for pagination
//     this.getLeaveData.department = department;
  
//     console.log('Calling API with:', this.getLeaveData);
  
//     this.leaveMgtService.fetchAllLeaves(this.getLeaveData, this.leaveTypeData).subscribe({
//       next: (res) => {
//         console.log('API Response:', res);
//         if (res.leaves.length === 0) {
//           console.warn('No results found for:', searchQuery);
//         }
//         this.apiData = res.leaves;  // Store fetched data
//         this.totalItems = res.totalItems || this.apiData.length;
//         //this.totalPages = Math.ceil(this.totalItems / this.pageSize);  // Recalculate total pages
//         console.log('Updated Table Data:', this.apiData);
//       },
//       error: (error) => {
//         console.error('Error fetching leaves:', error);
//         this.totalItems = 0;
//       }
//     });
//   }
  






//       // Handles page change
// onPageChange(pageIndex: number): void {
//   this.pageIndex = pageIndex;
//   this.getAllLeaves(); // Fetch leaves with updated page index
// }

// // Handles page size change
// onPageSizeChange(pageSize: number): void {
//   this.pageSize = pageSize;
//   this.pageIndex = 1;  // Reset to page 1 when changing page size
//   this.getAllLeaves(); // Fetch leaves with updated page size
// }

// // Search method triggers data fetching with search query
// searchLeaves(): void {
//   this.getLeaveData.search = this.searchTerm
//   this.pageIndex = 1;  // Reset page to 1 on search
//   this.getAllLeaves(); // Fetch leaves with updated filters
// }

// // Filter method for changing the department
// onDepartmentChange(department: string): void {
//   this.filterData.department = department;
//   this.pageIndex = 1;  // Reset to page 1 when changing filter
//   this.getAllLeaves(); // Fetch leaves with updated filters
// }

// // Filter method for changing the leave type
// onLeaveTypeChange(leaveType: string): void {
//   this.filterData.leaveType = leaveType;
//   this.pageIndex = 1;  // Reset to page 1 when changing filter
//   this.getAllLeaves(); // Fetch leaves with updated filters
// }




//correct pagination
 //totalPages = Math.ceil(this.totalItems / this.pageSize);

// <div class="bg-[#EBEBEB]">
// <div class="pagination">
//   <button (click)="prevPage()" [disabled]="pageIndex === 1">Previous</button>
//   <span>Page {{pageIndex}} of {{totalPages}}</span>
//   <button (click)="nextPage()" [disabled]="pageIndex >= totalPages">Next</button>
// </div>
// </div>

// onPaginateChange(event: PageEvent) {
//   this.pageIndex = event.pageIndex + 1;  
//   this.pageSize = event.pageSize;
//   this.getAllLeaves();
// }

//   //Method to go to the next page
//   nextPage() {
//     if (this.pageIndex < this.totalPages) {
//       this.pageIndex++;
//       this.getAllLeaves();
//     }
//   }

//   // Method to go to the previous page
//   prevPage() {
//     if (this.pageIndex > 1) {
//       this.pageIndex--;
//       this.getAllLeaves();
//     }
//   }


      /////searches only the front end////
//   selectedLeaveType: string = ''; 
//   leaveTypes: any[] = []; 

// fetchLeaveTypes() {
//   this.leaveMgtService.getLeaveType(this.leaveTypeData ).subscribe({
//     next: (res) => {
//       console.log('Leave Types API response:', res);
//       this.leaveTypes = res.data?.leavetypes || [];
//       console.log('filter Leave Types:', this.leaveTypes);    
//       console.log('res.data:', res.data);

//     },
//     error: (err) => {
//       console.error('Error fetching leave types:', err);
//     }
//   });
// }


// <nz-select
//             [(ngModel)]="filterData.leaveType"
//             (ngModelChange)="onLeaveTypeChange($event)"
//             nzAllowClear
//             nzPlaceHolder="Select Leave Type"
//             style="width: 200px"
//             name="leaveType" (change)="applyFilter()"
//           >
//             <nz-option 
//               *ngFor="let type of leaveTypeOptions" 
//               [nzValue]="type._id" 
//               [nzLabel]="type.name">
//             </nz-option>
//           </nz-select>


  // searchLeaves(): void {
  //   this.pageIndex = 1; 
  //   this.getAllLeaves();
  // }


  // const department = this.filterData.department ? this.filterData.department : '';
  //   const leaveType = this.filterData.leaveType ? this.filterData.leaveType : '';

//        // page index 
// onPageChange(pageIndex: number): void {
//   this.pageIndex = pageIndex;
//   this.getAllLeaves(); 
// }

// // page size
// onPageSizeChange(pageSize: number): void {
//   this.pageSize = pageSize;
//   this.pageIndex = 1; 
//   this.getAllLeaves(); 
// }

// // search query
// searchLeaves(): void {
//   this.getLeaveData.search = this.searchTerm
//   this.pageIndex = 1; 
//   this.getAllLeaves(); 
// }

// // Filter department
// onDepartmentChange(department: string): void {
//   this.filterData.department = department;
//   this.pageIndex = 1;
//   this.getAllLeaves(); 
// }

// // Filter leave type
// LeaveType(leaveType: string){
//   console.log('Selected Leave Type:', leaveType);
//   this.getLeaveData.leaveType = leaveType
//   console.log('Updated Filter Data:', this.getLeaveData);
//   this.getAllLeaves(); 
// }


//pagination
// <nz-pagination class=""
// [nzPageIndex]="pageIndex" 
// [nzTotal]="totalItems" 
// [nzPageSize]="pageSize"
// [nzPageSizeOptions]="pageSizeOptions"
// (nzPageIndexChange)="onPageChange($event)" 
// (nzPageSizeChange)="onPageSizeChange($event)">
// </nz-pagination>
// </div>


// this.extractLeaveTypes(this.apiData);

// extractLeaveTypes(leaves: any[]) {
//   const typesMap: { [key: string]: string } = {};

//   leaves.forEach(leave => {
//     const type = leave.leaveType;
//     if (type && !typesMap[type._id]) {
//       typesMap[type._id] = type.name;
//     }
//   });

//   this.leaveTypeOptions = Object.entries(typesMap).map(([id, name]) => ({ _id: id, name }));
// }







// // For Leave Type
// LeaveType(leaveType: string): void {
//   console.log('Selected Leave Type:', leaveType);
//   this.applyFilter('leaveType', leaveType);
// }

// // For Leave Status
// LeaveStatus(leaveStatus: string): void {
//   console.log('Selected Leave Status:', leaveStatus);
//   this.applyFilter('leaveStatus', leaveStatus);
// }

// // For Search
// Search(searchQuery: string): void {
//   this.getLeaveData.search = searchQuery.trim();
//   this.pageIndex = 1;
//   this.getAllLeaves();
// }

// resetFilters(): void {
//   this.getLeaveData = {
//     page: 1,
//     pageSize: this.pageSize,
//     search: '',
//     leaveStatus: '',
//     leaveType: ''
//   };
//   this.getAllLeaves();
// }

// applyFilter(filterKey: keyof getLeaveModel, filterValue: any): void {
//   this.getLeaveData[filterKey] = filterValue;
//   this.pageIndex = 1; // Reset to first page when filter changes
//   this.getAllLeaves();
// }

// For Leave Type
// LeaveType(leaveType: string): void {
//   console.log('Selected Leave Type:', leaveType);
//   this.applyFilter('leaveType', leaveType);
// }

// // For Leave Status
// LeaveStatus(leaveStatus: string): void {
//   console.log('Selected Leave Status:', leaveStatus);
//   this.applyFilter('leaveStatus', leaveStatus);
// }

// // For Search
// Search(searchQuery: string): void {
//   this.getLeaveData.search = searchQuery.trim();
//   this.pageIndex = 1;
//   this.getAllLeaves();
// }



//applyFilters() {
  //   this.pageIndex = 1;
  //   this.getLeaveData.department = this.filterData.department; 
  //   this.getLeaveData.leaveType = this.filterData.leaveType; 
  //   this.getAllLeaves(); 
  //   this.isFilterModalVisible = false; 
  // }


  ///^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email())

  // updatePassword(value: string) {
    //   this.password.set(value);
    //   this.successMessage.set('');
    //   this.errorMessage.set('');
    // }


    
//  fetchFilter:string = '';
//   fetchLeaveType(): void{
//     console.log('Leave Types Response:', this.fetchFilter);
//     this.getLeaveData.leaveType = this.fetchFilter
//     console.log('sending item:',this.getLeaveData)
//     this.getAllLeaves()
//   }




//   if (authService.isAuthenticated()) {
//     return true ;
//   } else {

//     authService.createNotification('top', 'error', 'Session Expired', 'Please log in again.');

//     router.navigate(['signIn']);
//   return false }
// };


 // isTokenExpired(): boolean {
  //   const expiry = Number(localStorage.getItem('tokenExpiry'));
  //   return !expiry || Date.now() > expiry;
  // }

  // logoutAndRedirect(): void {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('tokenExpiry');
  //   this.createNotification('top', 'error', 'Session Expired', 'Please log in again.');
  // }

   // const expiryTime = Date.now() + 60000;
          // localStorage.setItem('tokenExpiry', expiryTime.toString());
          // const myToken = localStorage.getItem('token')
          // console.log('my friend::', myToken)





          // import { CommonModule } from '@angular/common';
          // import { Component, signal, computed  } from '@angular/core';
          // import { FormsModule, NgForm } from '@angular/forms';
          // import { Router } from '@angular/router';
          // import { NzNotificationService } from 'ng-zorro-antd/notification';
          // import { LoginModel } from '../models/login-model';
          // import { AuthenticationServiceService } from '../services/authentication-service.service';
          // import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
          
          
          // @Component({
          //   selector: 'app-sign-in',
          //   imports: [CommonModule, FormsModule, MatProgressSpinnerModule],
          //   templateUrl: './sign-in.component.html',
          //   styleUrl: './sign-in.component.scss'
          // })
          // export class SignInComponent {
          //   isLoggedIn() {
          //     throw new Error('Method not implemented.');
          //   }
          
          //   email = signal('');
          //   password = signal('');
          
            
          //   isLoading = signal(false);
          //   successMessage = signal('');
          //   errorMessage = signal(''); 
          
          
          //   constructor(private router:Router,private authService:AuthenticationServiceService, private notification:NzNotificationService) {}  
          
          
          
          //    createNotification(position: 'top', type: 'success'| 'info'| 'warning'| 'error', title: string, message: string ){
          //    this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000});
          //  }
          
              
          //     isValidEmail = computed(() =>
          //     /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.email())
          //     );
          
          //     isValidPassword = computed(() => this.password().length >= 6);
          //     isFormValid = computed(() => this.isValidEmail() && this.isValidPassword());
          
             
          
          //     updateEmail(event: Event) {
          //       const input = event.target as HTMLInputElement;
          //       this.email.set(input.value);
          //     }
          
          //     updatePassword(event: Event) {
          //       const input = event.target as HTMLInputElement;
          //       this.password.set(input.value);
          //     }
          
            
          
              
          
          //     submitForm() {
          //       if (!this.isFormValid()) {
          //         this.errorMessage.set('Please enter a valid email and password.');
          //         return;
          //       }
          
          //       this.isLoading.set(true);
          //       this.errorMessage.set('');
          //       this.successMessage.set('');
          
          //       const payload = {
          //         email: this.email(),
          //         password: this.password(),
          //       };
          
          //       this.authService.login( payload).subscribe({
          //         next:(response)=>{
          //          console.log('success',response.token)
          //          localStorage.setItem('token', response.token)
          //         // localStorage.setItem('isUserLogin', 'true') 
                   
                   
             
          //         this.successMessage.set('Login successful!');
          //         this.createNotification('top', "success", "Login Successful!!", "Welcome Back!");
          //         this.isLoading.set(false);
          //         this.email.set('');
          //         this.password.set('');
                    
          //          if(response.isFirstLogin == true ){
          //           this.router.navigate(['dashboard'])
          //         }else{
          //           this.router.navigate(['dashboard'])
          //         }
                  
          //         },
          //         error: (err) => {
          //           this.errorMessage.set('Please check your network <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; and try again.');
          //           this.isLoading.set(false);
          //         },
          //        });
          
          //     } 
          
          //   }
          
          
          
          //signal
          // count = signal(0);
          // updates = signal(0)
      
          // Counts = computed(() => this.updates() + 2);
          // doubleCount = computed(() => this.count() * 2);
        
          // increment() {
          //   this.count.update(c => c + 1);
          // }
      
          // decrement() {
          //   this.count.update(c => c - 1);
          // }

          // effect(() => {
          //   console.log('Count is now', this.count());
          // });

          //  <p class="mt-4">Count: {{ count() }}</p>
          // <p>Double: {{ doubleCount() }}</p>
          // <button (click)="increment()" class="bg-green-500 rounded-sm h-8 w-20 text-white">Increment</button>&nbsp;
          // <button (click)="decrement()" class="bg-purple-500 rounded-sm h-8 w-20 text-white">Decrement</button>
           
          

          //decideOnLeave
          // markPending(id: string) {
          //   const payload: decideLeaveModel = {
          //     leaveId: id,
          //     status: 'PENDING',
          //     comment: ''
          //   };
          
          //   this.leaveService.decideOnLeave(payload).subscribe({
          //     next: (response) => {
          //       console.log('Marked pending:', response);
          //       this.getAllLeaves();
          //     },
          //     error: (error) => {
          //       console.error('Pending error:', error);
          //     }
          //   });
          // }



           // tempDepartment: string = 'All';
    // tempSearch: string = '';


    // applyFilters() {
    //   if (this.tempDepartment === 'All') {
    //     delete this.employeeData.department;
    //   } else {
    //     this.employeeData.department = this.tempDepartment;
    //   }
    
    //   const trimmedSearch = this.tempSearch.trim();
    //   this.employeeData.search = trimmedSearch ? trimmedSearch : undefined;
    //   this.page = 1;
    //   this.closeFilterModal();
    //   this.getEmployees();
    
    //   console.log('Filters applied:', this.employeeData);
    // }
       
    //   openFilterModal() {
    //     this.isFilterModalVisible = true;
    //   }
      
    //   closeFilterModal() {
    //     this.isFilterModalVisible = false;
    //   }
          
          
          