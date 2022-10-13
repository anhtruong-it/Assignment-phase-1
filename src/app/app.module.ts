import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './login/login.component';
import { CreatUserComponent } from './creat-user/creat-user.component';
import { SuperComponent } from './super/super.component';
import { AdminComponent } from './admin/admin.component';
import { AssistantComponent } from './assistant/assistant.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { CommunicateService } from './services/communicate.service';
@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    CreatUserComponent,
    SuperComponent,
    AdminComponent,
    AssistantComponent,
    AdminUserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [CommunicateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
