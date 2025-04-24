import { CommonModule } from '@angular/common';
import { Component, signal, computed  } from '@angular/core';
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

  // email = signal('');
  // password = signal('');

  // // Signals for UI state
  // isLoading = signal(false);
  // successMessage = signal('');
  // errorMessage = signal(''); 

  //   // Computed validations
  //   isValidEmail = computed(() =>
  //     ///^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email())
  //   ///^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim())
  //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


  //   );

  //   isValidPassword = computed(() => this.password().length >= 6);
  //   isFormValid = computed(() => this.isValidEmail() && this.isValidPassword());

  //   constructor(private router:Router,private authService:AuthenticationServiceService, private notification:NzNotificationService) {
  //     this.apiData = new LoginModel()
  //   }  


  //   updateEmailFromEvent(event: Event) {
  //     const input = event.target as HTMLInputElement;
  //     this.password.set(input.value);
  //   }

  //   updatePasswordFromEvent(event: Event) {
  //     const input = event.target as HTMLInputElement;
  //     this.password.set(input.value);
  //   }
    
  
  //   // updatePassword(value: string) {
  //   //   this.password.set(value);
  //   //   this.successMessage.set('');
  //   //   this.errorMessage.set('');
  //   // }

  //   submitForm() {
  //     if (!this.isFormValid()) {
  //       this.errorMessage.set('Please enter a valid email and password.');
  //       return;
  //     }

  //     this.isLoading.set(true);

  //     const payload = {
  //       email: this.email(),
  //       password: this.password(),
  //     };

  //     this.authService.login(this.apiData).subscribe({
  //       next:(response)=>{
  //       //  console.log('success',response.token)
  //       //  localStorage.setItem('token', response.token)
          
  //       //  const expiryTime = Date.now() + 60000;
  //       //  localStorage.setItem('tokenExpiry', expiryTime.toString());
  //       //  const myToken = localStorage.getItem('token')
  //       //  console.log('my friend::', myToken)
   
  //       this.successMessage.set('Login successful!');
  //       this.isLoading.set(false);
  //       this.email.set('');
  //       this.password.set('');
          
  //        if(response.isFirstLogin == true ){
  //         this.router.navigate(['dashboard'])
  //       }else{
  //         this.router.navigate(["dashboard"])
  //       }
  //       //this.isLoading = false;
  //       },
  //       error: (err) => {
  //         this.errorMessage.set('Login failed. Try again.');
  //         this.isLoading.set(false);
  //       },
  //      });

  //   } 

  //   apiData!:LoginModel

  // }



  
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
       
      const expiryTime = Date.now() + 60000;
      localStorage.setItem('tokenExpiry', expiryTime.toString());
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
