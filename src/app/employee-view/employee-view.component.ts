import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-employee-view',
  imports: [],
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.scss'
})
export class EmployeeViewComponent {

  
  employeeId: string | null = null;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.employeesDetail();
  }


    employeesDetail(){
      this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      // Call API
      console.log('Employee ID:', this.employeeId);
    }
    }


  goBack(){
    this.location.back()
  }

}




