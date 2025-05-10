import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import { AuthService } from './routeguardSer/auth-service.guard';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'dashboard';



 
  

































  // private intervalId: any;

  // constructor(private authService: AuthService, private router: Router) {}

  // ngOnInit(): void {
  //   this.closePage() 
  // }

  //   closePage(){
  //     this.intervalId = setInterval(() => {
  //       if (this.authService.isTokenExpired()) {
  //         this.authService.logoutAndRedirect();
  //         this.router.navigate(['/signIn']);
  //       }
  //     }, 5000);
  //   }
   
  // ngOnDestroy(): void {
  //   clearInterval(this.intervalId);
  // }
}


// "assets": [
//               "src/assets",
//               "src/favicon.ico"
//             ],
