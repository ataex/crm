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
import { RegisterComponent } from './account/register/register.component';
import { ActivateComponent } from './account/activate/activate.component';
import { LoginComponent } from './user/login/login.component';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';

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
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RoutingModule,
    MaterialModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
