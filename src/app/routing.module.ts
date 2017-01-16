import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CandidateListComponent } from './candidate/candidate-list/candidate-list.component';
import { CandidateCreateComponent } from './candidate/candidate-create/candidate-create.component';
import { CandidateUpdateComponent } from './candidate/candidate-update/candidate-update.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ActivateComponent } from './authentication/activate/activate.component';
import { LoginComponent } from './authentication/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path : 'home', component : HomeComponent },
    // Candidate CRUD
    { path : 'candidates', component : CandidateListComponent },
    { path : 'candidate/create', component : CandidateCreateComponent },
    { path : 'candidate/update/:id', component : CandidateUpdateComponent },
    // User CRUD
    { path : 'users', component : UserListComponent },
    { path : 'user/create', component : UserCreateComponent },
    { path : 'user/update/:id', component : UserUpdateComponent },
    // Account
    { path : 'register', component : RegisterComponent },
    { path : 'activate/:token', component : ActivateComponent },
    { path : 'login', component : LoginComponent },
    // Application
    { path : 'dashboard', component : DashboardComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}