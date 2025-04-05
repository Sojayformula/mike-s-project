import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { leaveModel, leavetypeModel } from '../models/leaveModel';
import { decideLeaveModel } from '../models/decide-leave.model';
import { getLeaveModel, mediaModel, departmentModel } from '../models/get-leave.model';
import { LeaveManagementService } from '../services/leave-management.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzFormModule } from 'ng-zorro-antd/form';



// export class GetLeaveModel {
//   leaveStatus?: string;
//   leaveType?: string;
//   department?: string;
//   search?: string;
// }

@Component({
  selector: 'app-institutions',
  imports: [CommonModule, NzDropDownModule, NzFormModule, NzIconModule, FormsModule, NzSelectModule, NzModalModule ],
  templateUrl: './institutions.component.html',
  styleUrl: './institutions.component.scss'
})
export class InstitutionsComponent implements OnInit {
  searchControl: any;

  //cdr: any;
approve(arg0: any) {
throw new Error('Method not implemented.');
}
markPending(arg0: any) {
throw new Error('Method not implemented.');
}
decline(arg0: any) {
throw new Error('Method not implemented.');
}
menu: any;
storeId(arg0: any) {
throw new Error('Method not implemented.');
}
  
 apiData: any[] = [];
 departmentList: any[] = [];
 originalData: any[] = [];
 
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
  totalItems: number = 25; 
  pageSizeOptions:number[] = [2,5, 10, 20, 30, 50]
  searchQuery: string = ''; // Holds search input value
  //search: string = ''; // Add this property for search functionality
  totalPages = Math.ceil(this.totalItems / this.pageSize);


  constructor(private cdr: ChangeDetectorRef,  private router:Router, private leaveMgtService:LeaveManagementService,private notification:NzNotificationService) {
    

    this.leaveData = new leaveModel()
    this.getLeaveData = new getLeaveModel()
    this.leaveTypeData = new leavetypeModel()
    this.decideLeaveData = new decideLeaveModel()
    this.uploadFile = new mediaModel()
    this.departmentData = new departmentModel()
  }

  user: string = 'hr';

  searchQuerySubject = new BehaviorSubject<string>('');

  ngOnInit(): void {
    this.getAllLeaves();
    this.fetchDepartments(); 
    this.fetchLeaveTypes();
  }
  // fetchDepartments() {
  //   throw new Error('Method not implemented.');
  // }
  // fetchLeaveTypes() {
  //   throw new Error('Method not implemented.');
  // }

  getAllLeaves(): void {
    const leaveStatus = this.getLeaveData.leaveStatus || '';
    const leaveType = this.getLeaveData.leaveType || '';
    const page = this.pageIndex.toString();
    const pageSize = this.pageSize.toString();
    const searchQuery = this.searchQuery.trim();
    const department = this.getLeaveData.department || '';

  
    console.log('Calling API with:', { leaveStatus, leaveType, page, pageSize, searchQuery, department });
  
    this.leaveMgtService.fetchAllLeaves(leaveStatus, leaveType, page, pageSize, searchQuery, { ...this.getLeaveData, department }).subscribe({
      next: (res) => {
        console.log('API Response:', res);
        if (res.leaves.length === 0) {
          console.warn('No results found for:', searchQuery);
        }
        this.apiData = [...res.leaves];
        this.originalData = [...res.leaves]; 
        console.log('Updated Table Data:', this.apiData);
        this.cdr.markForCheck();
        this.cdr.detectChanges();


        this.totalItems = res.totalItems;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching leaves:', error);
      }
    });
  }


  searchTerm: string = ''; // Ensure searchTerm is a string

  filteredData() {
    console.log('Search Term:', this.searchTerm);
  
    // If no search term, return the full data
    if (!this.searchTerm.trim()) {
      console.log('No search term provided. Returning full data:', this.apiData);
      this.apiData = [...this.originalData]; // Make sure to use the full data if cleared
      this.cdr.markForCheck();  // Trigger change detection
      this.cdr.detectChanges(); // Manually detect changes
      return this.apiData;
    }
  
  
    // Filter the data based on the search term
    console.log('Before Filtering:', this.apiData);
    const filteredResults = this.apiData.filter((Data) => {
      console.log('Checking Item:', Data);
      const fullName = `${Data?.appliedBy?.personalDetails?.firstName} ${Data?.appliedBy?.personalDetails?.lastName}`;
      if (typeof fullName === 'string') {
        return fullName.toLowerCase().includes(this.searchTerm.toLowerCase());
      }
  
      return false;
    });
  
    console.log('Filtered Results:', filteredResults);
    this.apiData = filteredResults; // Update with filtered data
    this.cdr.markForCheck();  // Trigger change detection
    this.cdr.detectChanges(); // Manually detect changes
  
    return filteredResults;
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
  onToggleChange(){
    console.log('Toggle state:', this.toggleState);
  }


    //Function to export table data
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



onPaginateChange(event: PageEvent) {
  this.pageIndex = event.pageIndex + 1;  // Convert to 1-based index
  this.pageSize = event.pageSize;
  this.getAllLeaves();
}

  // Method to go to the next page
  nextPage() {
    if (this.pageIndex < this.totalPages) {
      this.pageIndex++;
      this.getAllLeaves();
    }
  }

  // Method to go to the previous page
  prevPage() {
    if (this.pageIndex > 1) {
      this.pageIndex--;
      this.getAllLeaves();
    }
  }

  
  openFilterModal() {
    this.isFilterModalVisible = true;
  }
  
  closeFilterModal() {
    this.isFilterModalVisible = false;
  }
  
  applyFilters() {
    this.getLeaveData.department = this.filterData.department;
    this.getLeaveData.leaveType = this.filterData.leaveType;
    this.getAllLeaves();
    this.isFilterModalVisible = false;
  }



           //Filter by department//
  fetchDepartments() {
    this.leaveMgtService.listDepartment(this.departmentData).subscribe({
      next: (res) => {
        console.log('Fetched Departments:', res); // Debugging output
  
        if (res && res.data && res.data.departments) {
          this.departmentOptions = res.data.departments.map((dept: any) => ({
            label: dept.name, // Display the department name
            value: dept._id   // Use _id as the value
          }));
          console.log('Processed department options:', this.departmentOptions);
        } else {
          console.warn('No department data found in API response.');
        }
      },
      error: (err) => console.error('Error fetching departments:', err)
    });
  }


                //Filter by leave type//
  fetchLeaveTypes(): void {
    this.leaveMgtService.getLeaveType(this.leaveTypeData).subscribe({
      next: (res) => {
        console.log('Fetched Leave Types:', res); // Log the full response for debugging
  
        // Check if the structure of the response matches your expectations
        if (res && res.data &&  res.data.leavetypes) {
          this.leaveTypeOptions = res.data.leavetypes.map((type: any) => ({
            label: type.name,  // Display the leave type name
            value: type._id    // Use _id as the value for selection
          }));
          console.log('Processed leave type options:', this.leaveTypeOptions);
        } else {
          console.warn('No leave types found in API response.');
        }
      },
      error: (err) => {
        console.error('Error fetching leave types:', err);
      }
    });
  }
  
  
  

  applyFilter() {
    this.pageIndex = 1; // Reset to first page when filtering
    
    // Update filters in the request object
    this.getLeaveData.department = this.filterData.department; 
    this.getLeaveData.leaveType = this.filterData.leaveType; // Include leaveType filter
    
    // Call the function to get leaves with the updated filters
    this.getAllLeaves(); 
    this.isFilterModalVisible = false; // Optionally close the filter modal
  }
  

}








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




  


  // onSubmit(form: { valid: any; }) {
  //   if (form.valid) {
  //     this.Data.push({ ...this.newRow }); // Add the new row to the data array
  //     this.resetForm(); // Reset the form after submission
  //   }
  // }

  // newRow = {
  //   Name: '',
  //   PhoneNo: '',
  //   Email: '',
  //   Address: '',
  //   Date: '',
  //   Status: '',
  //   Action: ''
  // };

  // resetForm() {
  //   this.newRow = {
  //     Name: '',
  //     PhoneNo: '',
  //     Email: '',
  //     Address: '',
  //     Date: '',
  //     Status: '',
  //     Action: ''
  //   };
  // }

  // isModalOpen = false;
  // openModal() {
  //   this.isModalOpen = true;
  // }

  // closeModal() {
  //   this.isModalOpen = false;
  //   this.resetForm();
  // }

 
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

  // filteredData() {
  //   if (!this.searchTerm) {
  //     return this.Data;
  //   }
  //   return this.Data.filter(Data =>
  //     Data.Name.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }
    










  
  // NgOnInit(): void{
  //   this.filterCandidates();
  // }

  // onPrevious(){
  //   this.filterObj.PageNumber --;
  // }

  // onNext(){
  //   this.filterObj.PageNumber ++;
  // }

  // filterCandidates(){
  //   this.http.post('url', this.filterObj).subscribe((res:any)=>{
  //     this.candidates = this.resetForm.data;
  //   })
  // }



  // viewAction() {
  //   console.log('View button clicked');
  // }

  // editAction() {
  //   console.log('Edit button clicked');
  // }
