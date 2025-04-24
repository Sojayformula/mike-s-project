import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InstitutionsComponent } from './institutions/institutions.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ReportComponent } from './report/report.component';
import { ProfileComponent } from './childcomponent/profile/profile.component';
import { PasswordComponent } from './childcomponent/password/password.component';
import { RoleManagementComponent } from './childcomponent/role-management/role-management.component';
import { PublicKeyComponent } from './childcomponent/public-key/public-key.component';
import { SettingsComponent } from './settings/settings.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LayOutComponent } from './lay-out/lay-out.component';
import { authguardGuard } from './routeguard/authguard.guard';


export const routes: Routes = [

    { path:"", redirectTo: 'signIn', pathMatch: "full"},
    { path: "signIn", component: SignInComponent},
 


    {path: "", component: LayOutComponent,
        children:[
            { path: "", redirectTo:"dashboard", pathMatch: "full"},
            { path: "dashboard", component: DashboardComponent},
            {path: "institution", component: InstitutionsComponent , canActivate: [authguardGuard]},
            { path: "transaction", component: TransactionsComponent , canActivate: [authguardGuard]},
            { path: "report", component: ReportComponent},

    { path: "settings", component: SettingsComponent,
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
