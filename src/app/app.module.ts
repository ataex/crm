import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RoutingModule } from './routing.module';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { CandidateListComponent } from './candidate/candidate-list/candidate-list.component';
import { CandidateCreateComponent } from './candidate/candidate-create/candidate-create.component';
import { CandidateUpdateComponent } from './candidate/candidate-update/candidate-update.component';
import { CandidateFormComponent } from './candidate/candidate-form/candidate-form.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ActivateComponent } from './authentication/activate/activate.component';
import { LoginComponent } from './authentication/login/login.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { SecurityService } from './shared/security.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CandidateListComponent,
    CandidateCreateComponent,
    CandidateUpdateComponent,
    CandidateFormComponent,
    RegisterComponent,
    ActivateComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,
    UserCreateComponent,
    UserFormComponent,
    UserListComponent,
    UserUpdateComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RoutingModule,
    MaterialModule.forRoot()
  ],
  providers: [ SecurityService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
