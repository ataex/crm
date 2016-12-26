import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { CandidateComponent } from './candidate/candidate.component';
import { JobComponent } from './job/job.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path : 'home', component : HomeComponent },
  { path : 'candidates', component : CandidateComponent },
  { path : 'jobs', component : JobComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule {}