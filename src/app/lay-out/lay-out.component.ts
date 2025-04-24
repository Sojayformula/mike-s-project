import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../routeguardSer/auth-service.guard';

@Component({
  selector: 'app-lay-out',
  imports: [RouterModule, CommonModule],
  templateUrl: './lay-out.component.html',
  styleUrl: './lay-out.component.scss'
})
export class LayOutComponent {

  constructor(private router: Router, private authService:AuthService) {}


logout(){
this.authService.logout()
this.router.navigate(['/signIn']);
}

}

    // alternative debounce
// onInput(value:string){
//   clearTimeOut(this.debounceTimer);
//   this.debounce = setTimeOut(()=>{ 
//     API call here
//    },300)
// }

  // logout() {
  //   localStorage.removeItem('token'); 
  //   this.router.navigate(['signIn']);
  // }

// logout(){
//   localStorage.removeItem('user'); 
//   this.router.navigate(['/signIn']);
// }
