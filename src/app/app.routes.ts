import { provideRouter, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InstitutionsComponent } from './pages/institutions/institutions.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { ReportComponent } from './report/report.component';
import { ProfileComponent } from './childcomponent/profile/profile.component';
import { PasswordComponent } from './childcomponent/password/password.component';
import { RoleManagementComponent } from './childcomponent/role-management/role-management.component';
import { PublicKeyComponent } from './childcomponent/public-key/public-key.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { LayOutComponent } from './lay-out/lay-out.component';
import { AuthGuard } from './routeguardSer/auth-service.guard';
import { GuardService } from './guardcanActivateChild/guard.service';
import { EmployeeViewComponent } from './employee-view/employee-view.component';


export const routes: Routes = [

    { path:"", redirectTo: 'signIn', pathMatch: "full"},
    { path: "signIn", component: SignInComponent},
 


    {path: "", component: LayOutComponent, canActivate: [AuthGuard], canActivateChild: [GuardService],
        children:[
            { path: "", redirectTo:"dashboard", pathMatch: "full"},

            {  path: "dashboard", 
                loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
                canLoad: [AuthGuard]
              },
              
            {path: "institution", component: InstitutionsComponent
                // loadComponent: () => import('./institutions/institutions.component').then(m => m.InstitutionsComponent),
                // canLoad: [AuthGuard] 
            },

            { path: "transaction", component: TransactionsComponent, },

            { path: "report", component: ReportComponent},

            
                { path: 'EmployeeViewComponent/:id', component: EmployeeViewComponent },


        { path: "settings", component: SettingsComponent, canActivateChild: [GuardService],
        children:[
             { path: '', redirectTo: 'profile', pathMatch: 'full' },
            { path: "profile", component: ProfileComponent},
            { path: "password", component: PasswordComponent },
            { path: "rolemanagement", component: RoleManagementComponent },
            { path: "publicKey", component: PublicKeyComponent }
        ] 
    },
]
    }

];


export const appRouting = provideRouter(routes);


// loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
// canLoad: [AuthGuard],  // Use canLoad to protect the lazy-loaded module

 // , canActivate: [AuthGuard]

 // { path: "dashboard", component: DashboardComponent,},
            //  component: InstitutionsComponent,