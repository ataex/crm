import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CandidateListComponent } from "./candidate/candidate-list/candidate-list.component";
import { CandidateCreateComponent } from "./candidate/candidate-create/candidate-create.component";
import { CandidateUpdateComponent } from "./candidate/candidate-update/candidate-update.component";
import { RegisterComponent } from "./account/register/register.component";
import { ActivateComponent } from "./account/activate/activate.component";
import { LoginComponent } from "./user/login/login.component";


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path : 'home', component : HomeComponent },
  { path : 'candidates', component : CandidateListComponent },
  { path : 'candidate/create', component : CandidateCreateComponent },
  { path : 'candidate/update/:id', component : CandidateUpdateComponent },
  { path : 'register', component : RegisterComponent },
  { path : 'activate/:token', component : ActivateComponent },
  { path : 'login', component : LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}