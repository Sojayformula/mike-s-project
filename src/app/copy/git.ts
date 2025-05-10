// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { NzTableModule } from 'ng-zorro-antd/table';
// import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
// import { RouterModule } from '@angular/router';
// import { NzFormModule } from 'ng-zorro-antd/form';
// import { FormsModule } from '@angular/forms';
// import { NgForm } from '@angular/forms';
// import { NgIf } from '@angular/common';
// import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
// import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
// import { NzButtonModule } from 'ng-zorro-antd/button';
// import { NzEmptyModule } from 'ng-zorro-antd/empty';
// import { NzMenuModule } from 'ng-zorro-antd/menu';
// import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
// import { NzIconModule } from 'ng-zorro-antd/icon';
// import { NzLayoutModule } from 'ng-zorro-antd/layout';
// import { CommonModule } from '@angular/common';
// import { NzPaginationModule } from 'ng-zorro-antd/pagination';
// import { NzSelectModule } from 'ng-zorro-antd/select';
// import { EmployeeService } from 'src/app/services/employee.service';
// import { Department, EmployeeFilterModel } from 'src/app/models/employee.model';
// import { EmployeeModel } from 'src/app/models/employee.model';
// import { filter } from 'rxjs';
// import { GetEmployeeModel } from 'src/app/models/getemployee.model';
// import { Departmentmodel } from 'src/app/models/department.model';
// import { NzNotificationService } from 'ng-zorro-antd/notification';
// import { NzAlertModule } from 'ng-zorro-antd/alert';
// import { NzSpinModule } from 'ng-zorro-antd/spin';

// @Component({
//   selector: 'app-employee',
//   imports: [
//     NzTableModule,
//     NzCheckboxModule,
//     RouterModule,
//     NzSpinModule,
//     NzFormModule,
//     NzDropDownModule,
//     NzAlertModule,
//     NzModalModule,
//     NzButtonModule,
//     NzEmptyModule,
//     NzMenuModule,
//     NzIconModule,
//     NzLayoutModule,
//     CommonModule,
//     NzToolTipModule,
//     NzPaginationModule,
//     NzSelectModule,
//     FormsModule,
//   ],
//   templateUrl: './employee.component.html',
//   styleUrl: './employee.component.scss',
// })
// export class EmployeeComponent implements OnInit {
//   employeeForm: any = {};

//   isFilterOpen = false;
//   ismodalOpen = false;
//   // isReverseArrow = false;
//   isCollapsed = false;
//   openEdit = false;
//   employeeService: any;

//   // ACTIONS MODAL
//   updateModal(): void {
//     this.openEdit = true;
//   }

//   handleClose(): void {
//     this.openEdit = false;
//   }

//   handleOpen(): void {
//     this.openEdit = false;
//   }

//   // FILTER MODAL/////////////////////////////////////
//   openFilter() {
//     this.isFilterOpen = true;
//     console.log('done');
//   }

//   closeFilter(event: Event) {
//     this.isFilterOpen = false;
//   }

//   handleOk(): void {
//     console.log('Button ok clicked!');
//     this.isFilterOpen = false;
//   }

//   handleCancel(): void {
//     console.log('Button cancel clicked!');
//     this.isFilterOpen = false;
//   }

//   allEmployees() {}

//   // ////////////////////////////////////////////
//   toggleSidebar() {
//     this.isCollapsed = !this.isCollapsed;
//     console.log('please work Amen');
//   }

//   openmodal() {
//     this.ismodalOpen = true;
//   }

//   totalItems: number = 0;
//   currentPage: number = 1;
//   pagesize: number = 10;
//   pageIndex: number = 1;
//   pageSizeOptions: number[] = [2, 5, 10, 15];

//   onPageChange(page: number): void {
//     this.pageIndex = page;
//     this.getEmployee();
//     console.log('page number changed', this.pageIndex);
//   }

//   onPageSizeChange(event: Event): void {
//     const selectedSize = (event.target as HTMLSelectElement).value;
//     this.pageSize = Number(selectedSize);
//     this.pageIndex = 1;
//     this.getEmployee();
//     console.log('Page size changed to:', this.pagesize);
//   }

//   getStartItem(): number {
//     return (this.pageIndex - 1) * this.pagesize + 1;
//   }

//   getEndItem(): number {
//     return Math.min(this.pageIndex * this.pagesize, this.totalItems);
//   }

//   employees: EmployeeModel[] = [];
//   isLoading = false;
//   Employees: EmployeeFilterModel[] = [];
//   page = 1;
//   pageSize = 10;

//   Listofdata: EmployeeModel[] = [];

//   getCriteria: GetEmployeeModel = {
//     id: '',
//   };
//   id = '';

//   filterCriteria: EmployeeFilterModel = {
//     maritalStatus: '',
//     gender: '',
//     employeeStatus: '',
//     department: '',
//     search: '',
//     page: 1,
//     pageSize: 10,
//   };

//   userRole: string = '';

//   constructor(
//     private newStaffservice: EmployeeService,
//     private employeeservice: EmployeeService,
//     private departmentservice: EmployeeService,
//     private notification: NzNotificationService,
//     private modalService: NzModalService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     // const userRole = localStorage.getItem('token')
//     this.userRole = localStorage.getItem('userRole') || '';
//     console.log('GETTTTT');
//     this.getEmployee();
//     this.fetchDepartments();
//   }
//   getEmployee() {
//     this.isLoading = true;
//     this.filterCriteria.page = this.pageIndex;
//     this.filterCriteria.pageSize = this.pageSize;
//     this.newStaffservice.getEmployees(this.filterCriteria).subscribe({
//       next: (response: any) => {
//         if (
//           response &&
//           response.response &&
//           Array.isArray(response.response.data)
//         ) {
//           this.Listofdata = [...response.response.data];
//         } else if (
//           response &&
//           response.response &&
//           Array.isArray(response.response.employees)
//         ) {
//           this.Listofdata = [...response.response.employees];
//         } else {
//           console.error('Invalid API:', response);
//           this.Listofdata = [];
//         }
//         this.totalItems = response.response.allCount
//         console.log('Listofdata:', this.Listofdata);
//         this.isLoading = false;
//       },
//       error: (error) => {
//         this.isLoading = false;
//         console.log('not added', this.Listofdata);
//       },
//     });
//   }

//   //  //////////////POPULATING THE VIEW FORM TO SEE EMPLOYEE DETAILS////////////////////////////
//   viewForm: any = {
//     personalDetails: {
//       firstName: '',
//       lastName: '',
//       otherName: '',
//       birthday: '',
//       age: '',
//       gender: '',
//       phoneNumber: '',
//       emergencyContact: '',
//       homeAddress: '',
//       nationality: '',
//       socialSecurityNumber: '',
//     },
//     employmentDetails: {},
//     familyDetails: {},
//     educationalDetails: [],
//     nextOfKinDetails: [],
//     role: '',
//     children: [],
//     department: '',
//     email: '',
//     personalEmail: '',
//     skypeUsername: '',
//     profileUrl:''
//   };

//   setEmployeeId(id: string) {
//     localStorage.setItem('employeeId', id);
//   }

//   getEmployeeById(employeeId: string) {
//     return this.setEmployeeId;
//   }

//   getEmployeeDetails(id: any) {
//     this.getCriteria.id = this.id;
//     console.log('viewing', this.id);
//     localStorage.setItem('employeeData', id);
//     this.employeeservice.getEmployeeById(id).subscribe({
//       next: (response: any) => {
//         this.viewForm = response.response.data;
//         console.log('employee', response.response.data);
//       },
//       error: (error) => {
//         console.log('not found');
//       },
//       complete: () => {
//         console.log('completed');
//       },
//     });
//   }

//   createNotification(
//     position: 'top',
//     type: 'success' | 'info' | 'warning' | 'error',
//     title: string,
//     message: string
//   ) {
//     this.notification.create(type, title, message, {
//       nzPlacement: position,
//       nzDuration: 3000,
//     });
//   }

//   onEmployeeCreated(newEmployee: EmployeeModel) {
//     this.getEmployee();
//     console.log('new employee added');
//   }

//   editEmployee() {
//     console.log('editing employee', this.employeeForm);
//   }

//   listOfDepartments: any = [];

//   department: Department[] = [];
//   // ////////////////TO LIST ALL DEPARTMENTS/////////////////////
//   getDepartments(departmentId: string): string {
//     const type = this.listOfDepartments.find(
//       (type: { _id: string }) => type._id === departmentId
//     );
//     return type ? type.name : 'unknown';
//   }

//   selectedDepartmentName: string = '';

//   fetchDepartments(): void {
//     const departmentModel: Departmentmodel = {
//       page: 1,
//       pageSize: 10,
//       departments: '',
//       search: '',
//     };

//     this.departmentservice.listdepartments(departmentModel).subscribe({
//       next: (response: any) => {
//         console.log('API Response:', response);

//         if (
//           response.success &&
//           response.data &&
//           Array.isArray(response.data.departments)
//         ) {
//           this.department = response.data.departments;
//         } else {
//           console.error('Unexpected API response format:', response);
//         }
//       },
//       error: (error) => {
//         console.error('Error fetching departments:', error);
//       },
//     });
//   }

//   filterDept() {
//     console.log(this.filterCriteria.department);
//     console.log(this.selectedDepartmentName);
//     if (
//       this.filterCriteria.department === 'ALL' ||
//       !this.filterCriteria.department
//     ) {
//       this.filterCriteria.department = '';
//       this.selectedDepartmentName = '';
//       console.log(
//         'Filtering by Department:',
//         this.getDepartments(this.filterCriteria.department)
//       );
//     } else {
//       // Find the selected department's name
//       const selectedDept = this.department.find(
//         (dept) => dept._id === this.filterCriteria.department
//       );
//       this.selectedDepartmentName = selectedDept ? selectedDept.name : '';
//       console.log('Selected Department:', this.selectedDepartmentName);
//     }

//     this.getEmployee();
//     this.isFilterOpen = false;
//   }

//   closeDept(event: Event) {
//     event.stopPropagation();
//     this.selectedDepartmentName = '';
//   }

//   clearSelection(): void {
//     this.selectedDepartmentName = '';
//     this.filterCriteria.department = '';
//     this.getEmployee();
//   }

//   getfilteredEmployees() {
//     this.employeeservice.getEmployees(this.filterCriteria).subscribe({
//       next: (response: any) => {
//         console.log('filtered employees', response);
//         this.Listofdata = response.response.employees;
//       },
//       error: (error) => {
//         console.log('invalid', error);
//       },
//       complete: () => {
//         console.log('completed');
//       },
//     });
//   }

//   // SEARCH INPUT
//   searchQuery: string = '';
//   filterTable() {
//     console.log('searching for:', this.searchQuery);
//     this.filterCriteria.search = this.searchQuery.trim();
//     this.getEmployee();
//     console.log('searching');
//   }

//   // FILTER EMPLOYEES
//   filterEmployees(filter: string) {
//     console.log('filtering', filter);
//     this.filterCriteria.employeeStatus = filter === 'All' ? '' : filter;
//     this.getfilteredEmployees();
//   }
// }