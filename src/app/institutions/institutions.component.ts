import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { leaveModel, leavetypeModel } from '../models/leaveModel';
import { decideLeaveModel } from '../models/decide-leave.model';
import { getLeaveModel, mediaModel, departmentModel } from '../models/get-leave.model';
import { LeaveManagementService } from '../services/institution';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import { signal, computed, effect } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { timer } from 'rxjs'
import { of } from 'rxjs'; 



//import { Subject } from 'rxjs';


@Component({
  selector: 'app-institutions',
  imports: [CommonModule, NzDropDownModule, NzFormModule, NzIconModule, FormsModule, NzSelectModule, NzModalModule, NzPaginationModule],
  templateUrl: './institutions.component.html',
  styleUrl: './institutions.component.scss'
})
export class InstitutionsComponent implements OnInit {

 
approve(arg0: any) {
throw new Error('Method not implemented.');
}
markPending(arg0: any) {
throw new Error('Method not implemented.');
}
decline(arg0: any) {
throw new Error('Method not implemented.');
}

storeId(arg0: any) {
throw new Error('Method not implemented.');
}

 apiData: any[] = [];
 departmentList: any[] = [];
 
 isFilterModalVisible = false;
 filterData = { department: '', leaveType: '' };
 departmentOptions: any[] = [];
 leaveTypeOptions: any[] = [];
 


  leaveData!: leaveModel;
  getLeaveData!: getLeaveModel;
  leaveTypeData!:leavetypeModel;
  decideLeaveData!:decideLeaveModel;
  uploadFile!: mediaModel;
  departmentData!: departmentModel;
  startDate: string = '';
  endDate: string = '';
  minEndDate: string = '';
  pageIndex = 1
  pageSize =  10
  currentPage = 1
  totalItems: number = 0; 
  pageSizeOptions:number[] = [5, 10, 20, 30, 50] 
  searchQuery: string = ''; 


  constructor(private cdr: ChangeDetectorRef,  private router:Router, private leaveMgtService:LeaveManagementService,private notification:NzNotificationService) {
  

   this.leaveData = new leaveModel()
   this.getLeaveData = new getLeaveModel()
   this.leaveTypeData = new leavetypeModel()
   this.decideLeaveData = new decideLeaveModel()
   this.uploadFile = new mediaModel()
   this.departmentData = new departmentModel()


   effect(() => {
    console.log('Count is now', this.count());
  });
  }

  

  ngOnInit(): void {
    this.getAllLeaves();
    this.fetchLeaveTypes()
  }


 
  getAllLeaves(): void {

    this.getLeaveData.page = this.pageIndex;
    this.getLeaveData.pageSize = this.pageSize;
    this.getLeaveData.search = this.searchQuery

    const leaveStatus = this.getLeaveData.leaveStatus || '';
    const leaveType = this.getLeaveData.leaveType || '';
   
    
    console.log('Calling API with:', this.getLeaveData);
    this.leaveMgtService.fetchAllLeaves(this.getLeaveData).subscribe({
      next: (res) => {
        console.log('API Response:', res);
        this.apiData = res.leaves;
        this.totalItems = res.totalCount || 0;
        console.log('Updated Table Data:', this.apiData)
        
        
      },
      error: (error) => {
        console.error('Error fetching leaves:', error);
        this.totalItems = 0;
      },
      complete:()=>{

      }
    });
  
  }



     
          //filter by search//
  searchTerm: string = ''; 
  debounceTimer: any;
  //searchTimeout: string = '';
  private searchTimeout: any;
  
  
  
  //   findMe(){
  //     clearTimeout(this.debounceTimer); 
  //     this.debounceTimer = setTimeout(() => {
  //       console.log('User stopped typing. Searched friend:', this.searchTerm);
  //       this.getLeaveData.search = this.searchTerm.trim();
  //       this.pageIndex = 1;
          
  //     console.log('my searched friend:', this.searchTerm)
  //     this.getLeaveData.search = this.searchTerm
  //     console.log('sending item:',this.getLeaveData)
  //     this.getAllLeaves()
  //   }, 300); 
  // }

    // ngOnDestroy(): void {
    //   clearTimeout(this.debounceTimer);
    // }

    
     
          // Set new timeout 
    Search(searchQuery: string){
      console.log('User typed:', searchQuery);
      if (this.searchTimeout) {
        console.log('Clearing timeout');
        clearTimeout(this.searchTimeout);
      }
      
      this.searchTimeout = setTimeout(() => {
        this.getLeaveData.search = searchQuery
        this.pageIndex = 1;
        this.getAllLeaves();
      }, 900); 
    }
    


        
    count = signal(0);
    updates = signal(0)

    Counts = computed(() => this.updates() + 2);
    doubleCount = computed(() => this.count() * 2);
  
    increment() {
      this.count.update(c => c + 1);
    }

    decrement() {
      this.count.update(c => c - 1);
    }

  
  
  

    // findMe(value: string): void {
    //   // Clear previous timeout
    //   if (this.debounceTimeout) {
    //     clearTimeout(this.debounceTimeout);
    //   }
  
    //   // Set new timeout
    //   this.debounceTimeout = setTimeout(() => {
    //     this.performSearch(value);
    //   }, 500); // 500ms debounce time
    // }
  
    // performSearch(value: string): void {
    //   console.log('Searching for:', value);
    //   // Your search logic here
    //   console.log('User stopped typing. Searched friend:', this.searchTerm);
    //   this.getLeaveData.search = this.searchTerm.trim();
    //   this.pageIndex = 1;
    //   console.log('my searched friend:', this.searchTerm)
    //   this.getLeaveData.search = this.searchTerm
    //   console.log('sending item:',this.getLeaveData)
    //   this.getAllLeaves()
    // }
  
    // ngOnDestroy(): void {
    //   if (this.debounceTimeout) {
    //     clearTimeout(this.debounceTimeout);
    //   }
    // }
  



  
  



                  //Filter by leave type//
   fetchLeaveTypes(){
    this.leaveMgtService.getLeaveType( this.leaveTypeData).subscribe({
      next: (res) => {
        console.log('Fetched Leave Types:', res); 
        this.leaveTypeOptions = res.data.leavetypes
      },
      error: (err) => {
        console.error('Error fetching leave types:', err);
      },
      complete:()=>{
      }
    });
  }

   
    ///// Filter leave type/////
    LeaveType(leaveType:string){
      console.log('Selected Leave Type:', leaveType);
      this.getLeaveData.leaveType = leaveType
      console.log('Updated Filter Data:', this.getLeaveData);
      this.getAllLeaves(); 
    }





 fetchFilter:string = '';
  fetchLeaveType(): void{
    console.log('Leave Types Response:', this.fetchFilter);
    this.getLeaveData.leaveType = this.fetchFilter
    console.log('sending item:',this.getLeaveData)
    this.getAllLeaves()
  }
  


  // Function to Toggle ALL APPROVED PENDING DECLINED
  selectedChoice:string = 'ALL';
  toggleState:boolean = false;

  toggleSelect(trim:string){
    this.getLeaveData.leaveStatus = trim === 'ALL' ? '' :trim;
    this.getAllLeaves();
    this.selectedChoice = trim;
    console.log("toggle some",trim);
  }
  // onToggleChange(){
  //   console.log('Toggle state:', this.toggleState);
  // }


    ///Function to export table data///
exportTableToCSV() {
  const table = document.getElementById('Data');
  const rows = table?.querySelectorAll('tr');
  const csvData = Array.from(rows || []).map(row => {
    const cols = row.querySelectorAll('td, th');
    return Array.from(cols)
      .map(col => col.textContent?.trim() || "")
      .join(',');
  }).join('\n');

  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'table.csv');
}



  openFilterModal() {
    this.isFilterModalVisible = true;
  }
  
  closeFilterModal() {
    this.isFilterModalVisible = false;
  }


           //Filter by department//
  fetchDepartments() {
    console.log('display',this.departmentData)
    this.leaveMgtService.listDepartment(this.departmentData).subscribe({
      next: (res) => {
        console.log('Fetched Departments:', res); 
  
        if (res && res.data && res.data.departments) {
          this.departmentOptions = res.data.departments.map((dept: any) => ({
            label: dept.name, 
            value: dept._id   
          }));
          console.log('Processed department options:', this.departmentOptions);
        } else {
          console.warn('No department data found in API response.');
        }
      },
      error: (err) => console.error('Error fetching departments:', err)
    });
  }
  
  
  applyFilters() {
   this.pageIndex = 1;
    this.getLeaveData.department = this.filterData.department; 
    this.getLeaveData.leaveType = this.filterData.leaveType; 
    this.isFilterModalVisible = false; 
  }





//   friends!: getModel[];
//   searchFor = 'kofi';

//   findKofi(){
//     console.log('searchInput', this.searchFor)
//     for(let get of this.friends){
//       if(get.firstName == "kofi"){
//         return get
//       }
//       return null
//     }
// }

  }

  
  export class getModel {
    firstName!: string 
    password!: string; 
  }





  // this.getLeaveData.search = searchQuery;
  // let leaveType = '';

  //const leaveType = this.getLeaveData.leaveType || '';
    //this.getLeaveData.leaveType = leaveType;
    //this.getLeaveData.department = department;