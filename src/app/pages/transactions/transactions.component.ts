import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { saveAs } from 'file-saver';
import { TransactionService } from '../../services/transaction.service';
import { getDepartmentModel, getEmployeeModel } from '../../models/employee-model';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NzFormModule } from 'ng-zorro-antd/form'; 
import { NzModalModule } from 'ng-zorro-antd/modal';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';




@Component({
  selector: 'app-transactions',
  imports: [CommonModule, FormsModule, RouterModule, NzFormModule, NzModalModule, MatProgressSpinner, NzPaginationModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit, OnDestroy{
  
  Data: any[] = [];
  DepartmentData: any[] = [];
  tempDepartment: string = 'All';

  employeeData!: getEmployeeModel;
  departmentData!: getDepartmentModel;
  page = 1;
  pageSize = 10;
  totalItems: number = 0; 
  currentPage = 1
  searchQuery: string = '';
  isLoading = false

  searchQuery$ = new Subject<string>();
  isFilterModalVisible = false;
  modalFooter = '';

  constructor(private transactionSer:TransactionService) {

    this.employeeData = new getEmployeeModel()
    this.departmentData = new getDepartmentModel()

    this.searchQuery$.pipe(debounceTime(500))
  .subscribe((searchTerm: string) => {
    this.searchQuery = searchTerm;
    this.search();
  });

  }


  ngOnInit(): void {
    this.getEmployees(),
    this.getEmployees1()
  }
  

  getEmployees(){
    this.isLoading =true
    this.employeeData.pageSize = this.pageSize
    this.employeeData.page = this.page 
    this.employeeData.search = this.searchQuery
   
    
    console.log('Employee model data', this.employeeData)
     this.transactionSer.fetchEmployees(this.employeeData).subscribe({
      next: (res) =>{
        this.Data = res.response.employees || [];
        console.log('DataAPI:', res);
        console.log('Data length:', this.Data.length);
        console.log('APIData', res.response.employees);
        this.isLoading = false
      },

      error: (error) => {
        console.error('Error fetching leaves:', error);
        this.isLoading = false
      },
      complete:()=>{

      }
    });
  }

          //  Search logic //     
  search(){
    this.employeeData.search = this.searchQuery
    this.page =1; 
    this.getEmployees();
  }

  ngOnDestroy(): void {
    this.searchQuery$.complete();
  }



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

    getEmployees1() {
      console.log('Dept API data', this.DepartmentData)
      this.transactionSer.fetchDepartment(this.departmentData).subscribe({
        next: (res) => {
          console.log('dept API res', res)
          this.DepartmentData = res.data.departments || [];
          console.log('Filtered Department:', this.Data);
        },
        error: (err) => {
          console.error('Error fetching employees:', err);
        }
      });
    }


    applyFilters() {
      if (this.tempDepartment === 'All') {
        delete this.employeeData.department;
      } else {
        this.employeeData.department = this.tempDepartment;
      }
    
      this.page = 1;
      this.closeFilterModal();
      this.getEmployees();
    
      console.log('Filters applied:', this.employeeData);
    }

       
      openFilterModal() {
        this.isFilterModalVisible = true;
      }
      
      closeFilterModal() {
        this.isFilterModalVisible = false;
      }

        // Function to handle page change
        onPageChange(page: number){
          // if (page !== this.page) {
        this.page = page
        this.getEmployees();
        console.log("leave page changed",this.page)
        }
      

        onPageSizeChange(){
          this.page = 1;
          this.getEmployees(); 
        }
      
   
        // Calculate displayed
        getStartItem(): number {
           return (this.page - 1) * this.pageSize + 1;
        }
        
        getEndItem(): number {
          return Math.min(this.page * this.pageSize, this.totalItems);
        }


                // Function to Toggle ALL APPROVED PENDING DECLINED
  selectedChoice:string = 'ALL';

  toggleSelect(item:string){
    this.employeeData.employeeStatus = item === 'ALL' ? '' : item;
    this.selectedChoice = item;
    this.getEmployees();
   
    console.log("toggle some",item);
  }
  
    }











    // onPageSizeChange(event: Event): void {
        //   const selectElement = event.target as HTMLSelectElement;  
        //   this.pageSize = +selectElement.value; 
        //   this.page = 1;
        //   this.getEmployees();
        // }

        
    // deptType(event: Event) {
    //   const selectedValue = (event.target as HTMLSelectElement).value;
    //   console.log('Selected Department:', selectedValue);
    
    //   if (selectedValue === 'All') {
    //     delete this.employeeData.department; 
    //   } else {
    //     this.employeeData.department = selectedValue;
    //   }

    // }

    //toggleState:boolean = false;