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




@Component({
  selector: 'app-transactions',
  imports: [CommonModule, FormsModule, RouterModule, NzFormModule, NzModalModule],
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
  searchQuery: string = '';

  searchQuery$ = new Subject<string>();
  isFilterModalVisible = false;
  modalFooter = '';

  constructor(private transactionSer:TransactionService) {

    this.employeeData = new getEmployeeModel()
    this.departmentData = new getDepartmentModel()
   

    this.searchQuery$.pipe(debounceTime(300)).subscribe((searchTerm: string) => {
    this.search(searchTerm); 
  
      });
  }


  ngOnInit(): void {
    this.getEmployees()
    this.getEmployees1()
  }


  getEmployees(){
    this.employeeData.pageSize = this.pageSize
    this.employeeData.page = this.page 
    this.employeeData.search = this.searchQuery
   
    
    console.log('Employee model data', this.employeeData)
     this.transactionSer.fetchEmployees(this.employeeData).subscribe({
      next: (res) =>{
        this.Data = res.response?.employees || [];
        this.totalItems = res.totalCount || 0;
        console.log('Data length:', this.Data.length);
        console.log('APIData', res.response.employeeDeta);
      },

      error: (error) => {
        console.error('Error fetching leaves:', error);
      },
      complete:()=>{

      }
    });
  }


  search(searchTerm: string){

    this.page =1;

    if (!searchTerm || searchTerm.trim() === '') {
      this.employeeData.search = undefined; 
    } else {
      this.employeeData.search = searchTerm.trim(); 
    }
    
    this.getEmployees();
    console.log('Performing search for:', searchTerm);
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

    deptType(event: Event) {
      const selectedValue = (event.target as HTMLSelectElement).value;
      console.log('Selected Department:', selectedValue);
    
      if (selectedValue === 'All') {
        delete this.employeeData.department; 
      } else {
        this.employeeData.department = selectedValue;
      }

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


     
       // onMaritalStatusChange(status: string) {
      //   this.filterModel.maritalStatus = status;
      //   this.getEmployees();
   
    }

























// console.log('Fetching employees data:', this.employeeData);

  // search(searchTerm: string): void {
  //   // Replace with actual search logic
  //   console.log('Performing search for:', searchTerm);
  // }


   // filterByMaritalStatus(event: Event) {
      //   const selectedValue = (event.target as HTMLSelectElement).value;
      //   this.employeeDeta.maritalStatus = selectedValue;
      //   this.getEmployees();
      // }

      // onDepartmentChange(event: Event) {
      //   const selectedValue = (event.target as HTMLSelectElement).value;
      //   this.filterModel.department = selectedValue === 'All' ? '' : selectedValue;
      //   this.getEmployees();
      // }



           
// fetchMaritalStatus() {
//   this.transactionSer.fetchEmployees(this.filterTypeData).subscribe({
//     next: (res) => {
//       console.log('Fetched marital status Types:', res.response);
//       this.filterTypeOptions = res.response?.maritalStatus || [];
//     },
//     error: (err) => {
//       console.error('Error fetching marital statuses:', err);
//     }
//   });
// }
   

















// // this.mappedData = this.Data.map(item => {
// //   return {
// //     Sender: item.Sender,
// //     Amount: item.Amount,
// //     DLCode: item.DLCode, 
// //     ProviderID: item.ProviderID, 
// //     Source: item.Source, 
// //     Sourceacc: item.Sourceacc,
// //     Recipient: item.Recipient, 
// //     Destination: item.Destination, 
// //     Destacc: item.Destacc, 
// //     DateTime: item.DateTime, 
// //     status: item.status, 
// //   }
// // });

// // {Sender: 'Sowah', Amount: '$80', DLCode: '658HFUU', ProviderID:'658HFUU', Source: 'XCEL', Sourceacc: '7585649378', Recipient:'Name Surname', Destination: 'FCMB', Destacc: '7585649378', DateTime:'10/13/24, 09:00', status: 'Verified'},
// // {Sender: 'Sowah', Amount: '$80', DLCode: '658HFUU', ProviderID:'658HFUU', Source: 'Ecobank', Sourceacc: '7585649378', Recipient:'Name Surname', Destination: 'Access Bank', Destacc: '7585649378', DateTime:'10/13/24, 09:00', status: 'Verified'},
// // {Sender: 'Kojo', Amount: '$50', DLCode: '658HFUU', ProviderID:'658HFUU', Source: 'GT', Sourceacc: '7585649378', Recipient:'Name Surname', Destination: 'Polaris', Destacc: '7585649378', DateTime:'10/13/24, 09:00', status: 'Verified'},
// // {Sender: 'Kojo', Amount: '$20', DLCode: '658HFUU', ProviderID:'658HFUU', Source: 'Stanbic IBTC', Sourceacc: '7585649378', Recipient:'Name Surname', Destination: 'Sterling', Destacc: '7585649378', DateTime:'10/13/24, 09:00', status: 'Verified'},
// // {Sender: 'Jane', Amount: '$10', DLCode: '658HFUU', ProviderID:'658HFUU', Source: 'UBA', Sourceacc: '7585649378', Recipient:'Name Surname', Destination: 'UBA', Destacc: '7585649378', DateTime:'10/13/24, 09:00', status: 'Unverified'},
// // {Sender: 'Jane', Amount: '$90', DLCode: '658HFUU', ProviderID:'658HFUU', Source: 'Fidelity', Sourceacc: '7585649378', Recipient:'Name Surname', Destination: 'Ecobank', Destacc: '7585649378', DateTime:'10/13/24, 09:00', status: 'Unverified'},


 // filteredData() {
    //   if (!this.searchTerm) {
    //     return this.Data;
    //   }
    //   return this.Data.filter(Data =>
    //     Data.Sender.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    //     Data.Source.toLowerCase().includes(this.searchTerm.toLowerCase())
    //   );
    // }



    // search() {
    //   this.searchSubject.next(this.searchQuery)
    //   this.searchSubject.pipe(
    //     debounceTime(300),             // Wait 300ms after the last event
    //     distinctUntilChanged()         // Only emit if value is different
    //   ).subscribe(searchText => {
    //     this.employeeDeta.search = searchText;
    //     this.getEmployees();
    //   });
    // }
    