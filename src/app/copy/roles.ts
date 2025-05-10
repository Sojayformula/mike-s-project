// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { UserService } from './user.service';

// @Component({
//   selector: 'app-role-table',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './role-table.component.html',
// })
// export class RoleTableComponent implements OnInit {
//   role: string | null = null;
//   loading = true;

//   constructor(private userService: UserService) {}

//   ngOnInit() {
//     this.userService.getCurrentUser().subscribe({
//       next: (user) => {
//         this.role = user?.role;
//         this.loading = false;
//       },
//       error: (err) => {
//         console.error('Failed to fetch user:', err);
//         this.loading = false;
//       }
//     });
//   }
// }




// <div *ngIf="loading">Loading...</div>

// <div *ngIf="!loading">
//   <ng-container *ngIf="role === 'Admin'">
//     <app-admin-table />
//   </ng-container>

//   <ng-container *ngIf="role === 'HR'">
//     <app-hr-table />
//   </ng-container>

//   <ng-container *ngIf="role === 'Employee'">
//     <app-employee-table />
//   </ng-container>

//   <ng-container *ngIf="!['Admin', 'HR', 'Employee'].includes(role || '')">
//     <p>Unknown role: {{ role }}</p>
//   </ng-container>
// </div>
