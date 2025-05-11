import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { leaveModel, leavetypeModel } from '../../models/leaveModel';
import { decideLeaveModel } from '../../models/decide-leave.model';
import { getLeaveModel, mediaModel, departmentModel } from '../../models/get-leave.model';
import { LeaveManagementService } from '../../services/institution';
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


    //filter by search//
    searchTerm: string = ''; 
    debounceTimer: any;
    private searchTimeout: any;


  constructor(private cdr: ChangeDetectorRef,  private router:Router, private leaveMgtService:LeaveManagementService,private notification:NzNotificationService) {
    console.log('InstitutionsComponent loaded');


   this.leaveData = new leaveModel()
   this.getLeaveData = new getLeaveModel()
   this.leaveTypeData = new leavetypeModel()
   this.decideLeaveData = new decideLeaveModel()
   this.uploadFile = new mediaModel()
   this.departmentData = new departmentModel()


 
  }

  ngOnInit(): void {
    this.getAllLeaves();
    this.fetchLeaveTypes()
  }


 
  getAllLeaves(): void {

    this.getLeaveData.page = this.pageIndex;
    this.getLeaveData.pageSize = this.pageSize;
    this.getLeaveData.search = this.searchQuery
   
    
    console.log('Calling API with:', this.getLeaveData);
    this.leaveMgtService.fetchAllLeaves(this.getLeaveData).subscribe({
      next: (res) => {
        this.apiData = res.leaves || [];
        this.totalItems = res.totalCount || 0;
        console.log('Total items received:', res.totalCount); 
        console.log('API Response:', res);
        //console.log('Total pages:', this.totalPages);         

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


    // markPending(id: string){
     
    //   this.decideLeaveData = new decideLeaveModel()
    
    //   this.leaveMgtService.decideOnLeave(this.decideLeaveData).subscribe({
    //     next: (response) => {
    //       console.log('Marked pending:', response);
    //       this.getAllLeaves();
    //     },
    //     error: (error) => {
    //       console.error('Pending error:', error);
    //     }
    //   });
    // }

    // decideLeave(id: string, status: 'Pending' | 'Approved' | 'Declined', comment: string) {
    //   const decision = new decideLeaveModel();
    
    //   this.leaveMgtService.decideOnLeave(decision).subscribe({
    //     next: (response) => {
    //       console.log(`${status} decision successful:`, response);
    //       this.getAllLeaves();
    //     },
    //     error: (error) => {
    //       console.error(`${status} decision error:`, error);
    //     }
    //   });
    // }
    


    // markPending(id: string) {
    //   this.decideLeave(id, 'Pending', 'Marked as pending');
    // }
    
    // Approved(id: string) {
    //   this.decideLeave(id, 'Approved', 'Leave approved');
    // }
    
    // Declined(id: string) {
    //   this.decideLeave(id, 'Declined', 'Leave declined');
    // }
    
    

        // Function to Toggle ALL APPROVED PENDING DECLINED
  selectedChoice:string = 'ALL';
  toggleState:boolean = false;

  toggleSelect(item:string){
    this.getLeaveData.leaveStatus = item === 'ALL' ? '' :item;
    this.selectedChoice = item;
    this.getAllLeaves();
   
    console.log("toggle some",item);
  }
  

  openFilterModal() {
    this.isFilterModalVisible = true;
  }
  
  closeFilterModal() {
    this.isFilterModalVisible = false;
  }
    


               //Filter by department //
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





    

  // // Function to handle page change
  // onPageChange(page: number): void {
  //   this.currentPage = page;
  // }

  // // Calculate the range of items being displayed
  // getStartItem(): number {
  //   return (this.currentPage - 1) * this.pageSize + 1;
  // }

  // getEndItem(): number {
  //   const endItem = this.currentPage * this.pageSize;
  //   return endItem > this.totalItems ? this.totalItems : endItem;
  // }



  // get totalPages(): number {
  //   return Math.ceil(this.totalItems / this.pageSize);
  // }
  
  // getPaginationPages(): number[] {
  //   const pages: number[] = [];
  //   for (let i = 1; i <= this.totalPages; i++) {
  //     pages.push(i);
  //   }
  //   return pages;
  // }
  
  // onPreviousPage(): void {
  //   if (this.pageIndex > 1) {
  //     this.pageIndex--;
  //     this.getAllLeaves();
  //   }
  // }
  
  // onNextPage(): void {
  //   if (this.pageIndex < this.totalPages) {
  //     this.pageIndex++;
  //     this.getAllLeaves();
  //   }
  // }
  
  // onPageChange(page: number): void {
  //   this.pageIndex = page;
  //   this.getAllLeaves();
  // }
  
  // onPageSizeChange(newSize: number): void {
  //   this.pageSize = Number(newSize); // important!
  //   this.pageIndex = 1;
  //   this.getAllLeaves();
  // }

 

  


       
  // Function to handle page change
onPageChange(page: number): void {
  this.pageIndex = page
  this.getAllLeaves();
  console.log("leave page changed",this.pageIndex)
  }
  
  // Calculate the range of items being displayed
  getStartItem(): number {
  return (this.pageIndex - 1) * this.pageIndex + 1;
  }
  
  getEndItem(): number {
  return Math.min(this.pageIndex * this.pageIndex, this.totalItems);
  }
  
  onPageSizeChange(): void {
  this.pageIndex = 1;
  this.getAllLeaves();
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