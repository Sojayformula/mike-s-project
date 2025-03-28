import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-role-management',
  imports: [CommonModule],
  templateUrl: './role-management.component.html',
  styleUrl: './role-management.component.scss'
})
export class RoleManagementComponent {

  Data = [
    {Institutionname: 'Institution name', ID: '658HFVV', Role: 'Bank access', Access:'View only', Date: '10/13/24, 09:00AM', Status: 'Active'},
    {Institutionname: 'Institution name', ID: '658HFVV', Role: 'Bank access', Access:'View only', Date: '10/13/24, 09:00AM', Status: 'Active'},
    {Institutionname: 'Institution name', ID: '658HFVV', Role: 'Bank access', Access:'View only', Date: '10/13/24, 09:00AM', Status: 'Active'},
    {Institutionname: 'Institution name', ID: '658HFVV', Role: 'Bank access', Access:'View only', Date: '10/13/24, 09:00AM', Status: 'Suspended'},
    {Institutionname: 'Institution name', ID: '658HFVV', Role: 'Bank access', Access:'View only', Date: '10/13/24, 09:00AM', Status: 'Suspended'},
    {Institutionname: 'Institution name', ID: '658HFVV', Role: 'Bank access', Access:'View only', Date: '10/13/24, 09:00AM', Status: 'Suspended'}
  ];

  mappedData: any[] = [];

  constructor() {
    this.mappedData = this.Data.map(item => {
      return {
        Institutionname: item.Institutionname,
        ID: item.ID,
        Role: item.Role, 
        Access: item.Access,
        Date: item.Date,
        Status: item.Status
      }
    });
  }
}
