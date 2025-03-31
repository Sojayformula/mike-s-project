import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LoginModel } from '../models/login-model';
import { AuthenticationServiceService } from '../services/authentication-service.service';

@Component({
  selector: 'app-sign-in',
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  formatProgress = () => null;  

  apiData!:LoginModel

  loading = false;

  email: string = '';
  password: string = '';

 constructor(private router:Router,private authService:AuthenticationServiceService, private notification:NzNotificationService) {
   this.apiData = new LoginModel()
 }  
 

 ngOnInit(): void {}

 // onSignIn(){
 //   console.log('triggered')
 //   this.router.navigate(["/app-layout/layout/dashboard"])
 // }

 createNotification(position: 'top', type: 'success'| 'info'| 'warning'| 'error', title: string, message: string ){
   this.notification.create(type, title, message, {nzPlacement: position, nzDuration: 3000});
 }

 test(){
   console.log('testing')
   this.router.navigate(["dashboard"])
 }

 submit(item:NgForm){
   this.loading = true;



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
     },
     error:(error)=>{
       this.loading = false;
       console.log('error',error)
       this.createNotification("top", "error", "Login Failed!!", "Invalid Credentials!")
       // alert('login failed!!')
     },complete:()=>{
       console.log('completed')
     }
   })
 }


}
