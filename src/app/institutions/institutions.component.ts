import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { leaveModel, leavetypeModel } from '../models/leaveModel';
import { decideLeaveModel } from '../models/decide-leave.model';
import { getLeaveModel, mediaModel, departmentModel } from '../models/get-leave.model';
import { LeaveManagementService } from '../services/leave-management.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';



@Component({
  selector: 'app-institutions',
  imports: [CommonModule, FormsModule],
  templateUrl: './institutions.component.html',
  styleUrl: './institutions.component.scss'
})
export class InstitutionsComponent {

  searchTerm: string = '';
  mappedData: any[] = [];
  
  Data = [
    {Name: 'Sowah', PhoneNo: '0801243568', Email: 'info@bankmail', Address:'...', Date: '05/12/2024', Status: 'Active', Action:'...', },
    {Name: 'Amoa', PhoneNo: '0801243568', Email: 'info@bankmail', Address:'...', Date: '05/12/2024', Status: 'Active', Action:'...', },
    {Name: 'Awo', PhoneNo: '0801243568', Email: 'info@bankmail', Address:'...', Date: '05/12/2024', Status: 'Active', Action:'...', },
    {Name: 'Awo', PhoneNo: '0801243568', Email: 'info@bankmail', Address:'...', Date: '05/12/2024', Status: 'Active', Action:'...', },
    {Name: 'Drick', PhoneNo: '0801243568', Email: 'info@bankmail', Address:'...', Date: '05/12/2024', Status: 'Active', Action:'...', },
    {Name: 'Drick', PhoneNo: '0801243568', Email: 'info@bankmail', Address:'...', Date: '05/12/2024', Status: 'Active', Action:'...', },
  ]



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
  page =  10
  currentPage = 1
  totalItems: number = 0; 
  pageSizeOptions:number[] = [2,5, 10, 20, 30, 50]



  constructor(private router:Router, private leaveMgtService:LeaveManagementService,private notification:NzNotificationService) {
    // this.mappedData = this.Data.map(item => {
    //   return {
    //     Name: item.Name,
    //     PhoneNo: item.PhoneNo,
    //     Email: item.Email, 
    //     Address: item.Address, 
    //     Date: item.Date, 
    //     Status: item.Status,
    //     Action: item.Action,  
    //   }
    // });

    this.leaveData = new leaveModel()
    this.getLeaveData = new getLeaveModel()
    this.leaveTypeData = new leavetypeModel()
    this.decideLeaveData = new decideLeaveModel()
    this.uploadFile = new mediaModel()
    this.departmentData = new departmentModel()
  }


  onSubmit(form: { valid: any; }) {
    if (form.valid) {
      this.Data.push({ ...this.newRow }); // Add the new row to the data array
      this.resetForm(); // Reset the form after submission
    }
  }

  newRow = {
    Name: '',
    PhoneNo: '',
    Email: '',
    Address: '',
    Date: '',
    Status: '',
    Action: ''
  };

  resetForm() {
    this.newRow = {
      Name: '',
      PhoneNo: '',
      Email: '',
      Address: '',
      Date: '',
      Status: '',
      Action: ''
    };
  }

  isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
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

  filteredData() {
    if (!this.searchTerm) {
      return this.Data;
    }
    return this.Data.filter(Data =>
      Data.Name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }





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
}
