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


export const routes: Routes = [

    {
        path:"", redirectTo: 'dashboard',
        pathMatch: "full"

    },
    
    {
        path: "dashboard", component: DashboardComponent
    },

    {
        path: "institution", component: InstitutionsComponent
    },

    {
        path: "transaction", component: TransactionsComponent
    },

    {
        path: "report", component: ReportComponent
    },

    { 
        path: "settings", component: SettingsComponent,
        children:[
            { 
                path: '', redirectTo: 'profile', pathMatch: 'full'
                 
            },
            {
                path: "profile", component: ProfileComponent
            },

            {
                path: "password", component: PasswordComponent
            },

            {
                path: "rolemanagement", component: RoleManagementComponent
            },

            {
                path: "publicKey", component: PublicKeyComponent
            }
        ] 
    },

];
