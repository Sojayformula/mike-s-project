import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { saveAs } from 'file-saver';



@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent{
   searchTerm: string = '';

   filterStatus: string = '';

  

  Data = [
    {Sender: 'Sowah', Amount: '$80', DLCode: '658HFUU', ProviderID:'658HFUU', Source: 'XCEL', Sourceacc: '7585649378', Recipient:'Name Surname', Destination: 'FCMB', Destacc: '7585649378', DateTime:'10/13/24, 09:00', status: 'Verified'},
    {Sender: 'Sowah', Amount: '$80', DLCode: '658HFUU', ProviderID:'658HFUU', Source: 'Ecobank', Sourceacc: '7585649378', Recipient:'Name Surname', Destination: 'Access Bank', Destacc: '7585649378', DateTime:'10/13/24, 09:00', status: 'Verified'},
    {Sender: 'Kojo', Amount: '$50', DLCode: '658HFUU', ProviderID:'658HFUU', Source: 'GT', Sourceacc: '7585649378', Recipient:'Name Surname', Destination: 'Polaris', Destacc: '7585649378', DateTime:'10/13/24, 09:00', status: 'Verified'},
    {Sender: 'Kojo', Amount: '$20', DLCode: '658HFUU', ProviderID:'658HFUU', Source: 'Stanbic IBTC', Sourceacc: '7585649378', Recipient:'Name Surname', Destination: 'Sterling', Destacc: '7585649378', DateTime:'10/13/24, 09:00', status: 'Verified'},
    {Sender: 'Jane', Amount: '$10', DLCode: '658HFUU', ProviderID:'658HFUU', Source: 'UBA', Sourceacc: '7585649378', Recipient:'Name Surname', Destination: 'UBA', Destacc: '7585649378', DateTime:'10/13/24, 09:00', status: 'Unverified'},
    {Sender: 'Jane', Amount: '$90', DLCode: '658HFUU', ProviderID:'658HFUU', Source: 'Fidelity', Sourceacc: '7585649378', Recipient:'Name Surname', Destination: 'Ecobank', Destacc: '7585649378', DateTime:'10/13/24, 09:00', status: 'Unverified'},
  ];

  mappedData: any[] = [];




  constructor() {
    this.mappedData = this.Data.map(item => {
      return {
        Sender: item.Sender,
        Amount: item.Amount,
        DLCode: item.DLCode, 
        ProviderID: item.ProviderID, 
        Source: item.Source, 
        Sourceacc: item.Sourceacc,
        Recipient: item.Recipient, 
        Destination: item.Destination, 
        Destacc: item.Destacc, 
        DateTime: item.DateTime, 
        status: item.status, 
      }
    });
  }


  filtedData() {
    return this.mappedData.filter(item => {
      const matchesSearch = !this.searchTerm || item.Sender.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.filterStatus || item.status === this.filterStatus;
      return matchesSearch && matchesStatus;
    });
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
      Data.Sender.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      Data.Sourceacc.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      Data.ProviderID.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}