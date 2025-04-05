import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoginModel } from '../models/login-model';
import { AuthenticationServiceService } from '../services/authentication-service.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  formatProgress = () => null;  

  apiData!:LoginModel
  isLoading = false;
  loading = false;

  email: string = '';
  password: string = '';


 constructor(private router:Router,private authService:AuthenticationServiceService, private notification:NzNotificationService) {
   this.apiData = new LoginModel()
 }  
 

 ngOnInit(): void {}

 createNotification(position: 'top', type: 'success'| 'info'| 'warning'| 'error', title: string, message: string ){
   this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000});
 }

 submit(item:NgForm){
   //this.loading = true;
   this.isLoading = true;

   console.log("ama:",this.apiData)
   
   this.authService.login(this.apiData).subscribe({
     next:(response)=>{
      console.log('success',response.token)
      localStorage.setItem('token', response.token)
      
      const myToken = localStorage.getItem('token')
      console.log('my friend::', myToken)
      this.createNotification('top', "success", "Login Successful!!", "Welcome Back!");
       
      if(response.isFirstLogin == true ){
       this.router.navigate(['dashboard'])
     }else{
       this.router.navigate(["dashboard"])
     }
     this.isLoading = false;
     },
     error:(error)=>{
       this.loading = false;
       console.log('error',error)
       this.createNotification("top", "error", "Login Failed!!", "Invalid Credentials!")
       // alert('login failed!!')
       item.resetForm();
       //this.loading = false;
       this.isLoading = false;
     },complete:()=>{
      this.isLoading = false;
       console.log('completed')
     }
    });
  }

}
